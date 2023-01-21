import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
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
  Icon,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import styles from "../styles/SavedMessages.module.scss";

function SavedMessages() {
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(5);
  const [messages, setMessages] = useState(["no messages"]);
  useEffect(() => {
    axios
      .get("/api/getMessages")
      .then((response) => {
        let temp = JSON.parse(JSON.stringify(response.data));
        setMessages(temp.sort((a, b) => (a.sort > b.sort ? -1 : 1)));
      })
      .catch((err) => console.log(err));
  }, [messages]);
  const indexOfFirstRecord = currentPage * recordsPerPage;
  const indexOfLastRecord = indexOfFirstRecord + recordsPerPage;
  const currentRecords = messages.slice(indexOfFirstRecord, indexOfLastRecord);
  const pageCount = Math.ceil(messages.length / recordsPerPage);
  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  function onDelete(message) {
    axios.post("/api/deleteMessages", message);
  }

  return (
    <Box
      bg="blue.50"
      mt="6"
      borderWidth="1px"
      padding={["2", "5"]}
      borderRadius="lg"
    >
      <TableContainer whiteSpace="normal">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th className={styles.th} display={["none", "table-cell"]}>
                Topic
              </Th>
              <Th className={styles.th} display={["none", "table-cell"]}>
                Saved Messages
              </Th>
              <Th className={styles.th} display={["none", "table-cell"]}>
                Delete
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentRecords.map((message, index) => {
              return (
                <Tr key={index}>
                  <Td
                    className={styles.td}
                    display={["block", "table-cell"]}
                    data-th="Topic"
                  >
                    {message.topic}
                  </Td>
                  <Td
                    className={styles.td}
                    data-th="Saved Messages"
                    display={["block", "table-cell"]}
                  >
                    {message.text}{" "}
                  </Td>
                  <Td
                    className={styles.td}
                    data-th="Delete"
                    display={["block", "table-cell"]}
                    justifyContent={["left", "center"]}
                    alignItems={["left", "center"]}
                  >
                    <Popover align={["left", "center"]}>
                      {({ onClose }) => (
                        <>
                          <PopoverTrigger>
                            <Button variant="outline">
                              <Icon as={BiTrash} />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent w="230px" align={["left", "center"]}>
                            <PopoverArrow />
                            <PopoverHeader>
                              Are you sure to delete?
                            </PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Center>
                                <Button
                                  colorScheme="blue"
                                  mr={5}
                                  onClick={(e) => {
                                    onDelete(message);
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button colorScheme="gray" onClick={onClose}>
                                  No
                                </Button>
                              </Center>
                            </PopoverBody>
                          </PopoverContent>
                        </>
                      )}
                    </Popover>
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
