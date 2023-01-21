import { useState, useEffect } from "react";
import Head from "next/head";
import { ChakraProvider, Center, Stack, Box, Text } from "@chakra-ui/react";

import Thankyou from "../components/Thankyou";
import SavedMessages from "../components/SavedMessages";
import clientPromise from "../lib/database";

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
            spacing={[5, 4]}
            align="start stretch"
            justify="left"
            bg="blue.50"
            h={["80px", "100vh"]}
            width={["100vw", "200px"]}
            marginRight="3"
            paddingLeft={["5", "0"]}
            paddingTop={["5", "40"]}
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
          </Stack>
          <Box m="7" width={["80%", "70%"]}>
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
            {which === 0 ? <Thankyou /> : <SavedMessages />}
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
