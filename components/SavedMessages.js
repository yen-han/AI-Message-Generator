import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";

function SavedMessages() {
  return (
    <Box bg="blue.50" mt="6" borderWidth="1px" padding="5" borderRadius="lg">
      <TableContainer whiteSpace="normal">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Saved Messages</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td></Td>
              <Td>
                <Checkbox alignItems="center" size="lg"></Checkbox>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default SavedMessages;
