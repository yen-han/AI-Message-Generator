import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ulid } from "ulid";
import axios from "axios";
// import { generateAI } from "../pages/api/generate";
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  CircularProgress,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import handler from "../pages/api/file";
import command from "../pages/api/command";
function Thankyou() {
  const [messages, setMessages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  useEffect(() => {
    // console.log(apiKey);
  }, []);

  async function fetchData(messages) {
    try {
      const response = await handler(messages);
      console.log(messages);

      command();
    } catch (error) {
      console.error("Error executing function:", error.message);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData.entries());
    setIsLoading(true);
    let prompt =
      "Generate DBML format for " +
      formDataObj.emailInput +
      "don't put any extra.";

    try {
      const requestBody = {
        model: "gpt-3.5-turbo",
        // prompt: prompt,
        max_tokens: 100,
        messages: [{ role: "user", content: prompt }],
      };
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log(response);
      setMessages(response["data"]["choices"][0]["message"]["content"]);
      console.log(messages);
      fetchData(response["data"]["choices"][0]["message"]["content"]);

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      // res
      //   .status(error.response.status || 500)
      //   .json({ error: "An error occurred." });
    }
  };

  function saveMessage(save, message) {
    if (save) {
      axios.post("/api/saveMessages", message);
    } else {
      axios.post("/api/deleteMessages", message);
    }
  }

  return (
    <div className="tweets">
      <form onSubmit={handleSubmit}>
        <FormControl mb="10">
          <FormLabel>Generate DBML for</FormLabel>
          <Input type="text" name="emailInput" />
          {/* <FormLabel mt="6" fontSize="sm">
            The number of messages
          </FormLabel> */}
          {/* <NumberInput
            width="30%"
            defaultValue={1}
            min={1}
            max={5}
            onChange={(val) => setValue(parseInt(val))}
            size="sm"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput> */}
        </FormControl>
        <Center>
          <Button colorScheme="blue" type="submit">
            Generate
          </Button>
        </Center>
      </form>
      {isLoading && (
        <CircularProgress
          isIndeterminate
          color="blue.300"
          ml={["40%", "47%"]}
          mt="10%"
        />
      )}
      {messages.length !== 0 && (
        <Box
          bg="blue.50"
          mt="6"
          borderWidth="1px"
          padding="5"
          borderRadius="lg"
        >
          {/* <a href="https://dbdocs.io/yenhan.dev/AIworkshop">ERD Graph</a> */}
          <TableContainer whiteSpace="normal">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Generated DBML</Th>
                  <Th>Save</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Text wordBreak="break-word">{messages}</Text>
                  </Td>
                  <Td>
                    <Center>
                      <Checkbox
                        // isChecked={tweets[saveIndex].save}
                        alignItems="center"
                        size="lg"
                        onChange={(e) => {
                          // handleCheck(saveIndex);
                          saveMessage(e.target.checked, message);
                        }}
                      ></Checkbox>
                    </Center>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
}
export default Thankyou;
