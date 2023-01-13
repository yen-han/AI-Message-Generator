import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Center, VStack, Box, Flex, Text } from "@chakra-ui/react";
import Thankyou from "../components/Thankyou";
import SavedMessages from "../components/SavedMessages";
export default function Home() {
  const [which, setWhich] = useState(0);
  useEffect(() => {
    console.log(which);
  }, [which]);
  return (
    <ChakraProvider>
      <Head>
        <title>Message Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Flex>
          <VStack
            min-w="200px"
            spacing={4}
            align="start stretch"
            justify="left"
            bg="blue.50"
            h="100vh"
            width="200px"
            marginRight="3"
            paddingTop="40"
            borderRightColor="gray.300"
            borderWidth="1px"
          >
            <Center h="40px" align="center">
              <div
                onClick={() => {
                  setWhich(0);
                }}
              >
                <Text as="b">Thank you</Text>
              </div>
            </Center>
            <Center h="40px" align="center">
              <div
                onClick={() => {
                  setWhich(1);
                }}
              >
                <Text as="b">Saved messages</Text>
              </div>
            </Center>
          </VStack>
          <Box m="7" width="70%">
            <h1 className={styles.title} mt="20">
              <Text color="blue.600">AI Message Generator</Text>
            </h1>
            <Center mb="9" fontSize="xl">
              Built with NextJS & OPEN AI
            </Center>
            {which === 0 ? <Thankyou /> : <SavedMessages />}
          </Box>
        </Flex>
      </main>
    </ChakraProvider>
  );
}
