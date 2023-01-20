import { useState } from "react";
import { generateAI } from "../pages/api/generate";
import { v4 as uuidv4 } from "uuid";
import { ulid } from "ulid";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Button,
  Box,
} from "@chakra-ui/react";
import {
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
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

function Thankyou() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData.entries());
    setIsLoading(true);
    let prompt = "Thank you email about " + formDataObj.emailInput;
    generateAI(prompt, value)
      .then((response) => {
        let tempResults = [];
        response.data.choices.forEach((choice) => {
          tempResults.push({
            id: uuidv4(),
            topic: formDataObj.emailInput,
            sort: ulid(),
            text: choice.text,
          });
        });

        setMessages(tempResults);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
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
          <FormLabel>Thank you email about .. ?</FormLabel>
          <Input type="text" name="emailInput" />
          <FormLabel mt="6" fontSize="sm">
            The number of messages
          </FormLabel>
          <NumberInput
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
          </NumberInput>
        </FormControl>
        <Center>
          <Button colorScheme="blue" type="submit">
            Generate
          </Button>
        </Center>
      </form>
      {isLoading && (
        <CircularProgress isIndeterminate color="blue.300" ml="47%" mt="10%" />
      )}
      {messages.length !== 0 && (
        <Box
          bg="blue.50"
          mt="6"
          borderWidth="1px"
          padding="5"
          borderRadius="lg"
        >
          <TableContainer whiteSpace="normal">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Generated Messages</Th>
                  <Th>Save</Th>
                </Tr>
              </Thead>
              <Tbody>
                {messages.map((message, index) => {
                  return (
                    <Tr key={message.id}>
                      <Td>
                        <Text wordBreak="break-word">{message.text}</Text>
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
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
}
export default Thankyou;
