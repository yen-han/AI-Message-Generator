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
  Icon,
} from "@chakra-ui/react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import styles from "../styles/SavedMessages.module.scss";
import axios from "axios";
import { BiTrash } from "react-icons/bi";
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
  }, [messages]);
  const indexOfFirstRecord = currentPage * recordsPerPage;
  const indexOfLastRecord = indexOfFirstRecord + recordsPerPage;
  const currentRecords = messages.slice(indexOfFirstRecord, indexOfLastRecord);
  const pageCount = Math.ceil(messages.length / recordsPerPage);
  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  function onDelete(message) {
    // console.log(message);
    axios.post("/api/deleteMessages", message);
  }

  return (
    <Box bg="blue.50" mt="6" borderWidth="1px" padding="5" borderRadius="lg">
      <TableContainer whiteSpace="normal">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Topic</Th>
              <Th>Saved Messages</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentRecords.map((message, index) => {
              return (
                <Tr key={index}>
                  <Td>{message.topic}</Td>
                  <Td>{message.text} </Td>
                  <Td>
                    <Center>
                      <Popover>
                        {({ onClose }) => (
                          <>
                            <PopoverTrigger>
                              <Button variant="outline">
                                <Icon as={BiTrash} />
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent w="230px">
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
                    </Center>
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
