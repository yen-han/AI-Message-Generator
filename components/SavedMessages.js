import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";
import styles from "../styles/SavedMessages.module.scss";
import axios from "axios";
function SavedMessages() {
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(5);
  const [messages, setMessages] = useState(["no messages"]);
  useEffect(() => {
    axios
      .get("/api/getMessages")
      .then((response) => {
        setMessages(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((err) => console.log(err));
  }, []);
  const indexOfFirstRecord = currentPage * recordsPerPage;
  const indexOfLastRecord = indexOfFirstRecord + recordsPerPage;
  const currentRecords = messages.slice(indexOfFirstRecord, indexOfLastRecord);
  const pageCount = Math.ceil(messages.length / recordsPerPage);
  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };
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
            {currentRecords.map((message, index) => {
              return (
                <Tr key={index}>
                  <Td>{message.text} </Td>
                  <Td>
                    <Checkbox alignItems="center" size="lg"></Checkbox>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Center>
        <Box>
          <ReactPaginate
            className={styles.pagination}
            previousLabel={"<"}
            nextLabel={">"}
            pageRangeDisplayed={recordsPerPage}
            marginPagesDisplayed={recordsPerPage}
            pageCount={pageCount}
            onPageChange={changePage}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </Box>
      </Center>
    </Box>
  );
}
export default SavedMessages;
