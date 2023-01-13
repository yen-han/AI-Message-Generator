import { useState } from "react";
import { generateAI } from "../pages/api/generate";
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData.entries());
    setIsLoading(true);
    let prompt = "Thank you email about " + formDataObj.emailInput;
    console.log(formDataObj, value);
    generateAI(prompt, value)
      .then((response) => {
        setData(response.data.choices[0].text);
        setIsLoading(false);
        console.log(response.data.choices);
      })
      .catch((err) => console.log(err));
  };

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
      {data.length !== 0 && (
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
                  <Th>Generated Tweet</Th>
                  <Th>Save</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Text wordBreak="break-word">{data}</Text>
                  </Td>
                  <Td>
                    <Center>
                      <Checkbox
                        // isChecked={tweets[saveIndex].save}
                        alignItems="center"
                        size="lg"
                        // onChange={(e) => {
                        //   // handleCheck(saveIndex);
                        //   // saveResult(e.target.checked, record);
                        // }}
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
