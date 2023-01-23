import { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import clientPromise from "../lib/database";

import SavedMessages from "../components/SavedMessages";
import {
  ChakraProvider,
  Center,
  Stack,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";
import styles from "../styles/SavedMessages.module.scss";

export default function Home() {
  const [which, setWhich] = useState(0);
  useEffect(() => {}, [which]);
  return (
    <ChakraProvider>
      <Head>
        <title>Message Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box display={["block", "flex"]}>
          <Stack
            direction={["row", "column"]}
            spacing={[3, 1]}
            align="start stretch"
            justify="left"
            bg="blue.50"
            h={["70px", "100vh"]}
            width={["100vw", "200px"]}
            marginRight="3"
            paddingLeft={["0", "0"]}
            paddingTop={["0", "40"]}
            borderRightColor="gray.300"
            borderWidth="1px"
          >
            <Center
              h={["100%", "50px"]}
              align="center"
              ml={["5", "0"]}
              paddingLeft={["5", "0"]}
              paddingRight={["5", "0"]}
              className={styles.menuBlock}
            >
              <Link as={NextLink} href="/">
                <Text>Generate Messages</Text>
              </Link>
            </Center>
            <Center
              h={["100%", "50px"]}
              align="center"
              paddingLeft={["5", "0"]}
              paddingRight={["5", "0"]}
              className={styles.menuBlock}
            >
              <Link as={NextLink} href="/savedMessages">
                <Text as="b" color="blue.600">
                  Saved Messages
                </Text>
              </Link>
            </Center>
          </Stack>

          <Box margin="auto" mt="7" width={["85%", "70%"]}>
            <h1 mt={["0", "20"]}>
              <Center>
                <Text fontSize={["2xl", "4xl"]} color="blue.600">
                  AI Message Generator
                </Text>
              </Center>
            </h1>
            <Center mb="9" fontSize={["md", "xl"]}>
              Built with NextJS & OPEN AI
            </Center>
            <SavedMessages />
          </Box>
        </Box>
      </main>
    </ChakraProvider>
  );
}

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
