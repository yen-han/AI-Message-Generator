import Head from "next/head";
import NextLink from "next/link";
import Thankyou from "../components/Thankyou";
import {
  ChakraProvider,
  Center,
  Stack,
  Box,
  Text,
  Link,
} from "@chakra-ui/react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <ChakraProvider>
      <Head>
        <title>Data structure using LLM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.Home}>
        <Box display={["block", "flex"]}>
          <Stack
            direction={["row", "column"]}
            spacing={["3", "1"]}
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
                <Text as="b" color="blue.600">
                  Generate DBML
                </Text>
              </Link>
            </Center>
            <Center
              h={["100%", "50px"]}
              align="center"
              paddingLeft={["5", "0"]}
              paddingRight={["5", "0"]}
              className={styles.menuBlock}
            >
              {/* <Link as={NextLink} href="/savedMessages">
                <Text>Saved Messages</Text>
              </Link> */}
            </Center>
          </Stack>

          <Box margin="auto" mt="7" width={["85%", "70%"]}>
            <h1 mt={["0", "20"]}>
              <Center>
                <Text fontSize={["2xl", "4xl"]} color="blue.600">
                  AI Generator
                </Text>
              </Center>
            </h1>
            {/* <Center mb="9" fontSize={["md", "xl"]}>
              Built with NextJS & OPEN AI
            </Center> */}
            <Thankyou />
          </Box>
        </Box>
      </main>
    </ChakraProvider>
  );
}

// export async function getServerSideProps(context) {
//   try {
//     await clientPromise;
//     return {
//       props: { isConnected: true },
//     };
//   } catch (e) {
//     console.error(e);
//     return {
//       props: { isConnected: false },
//     };
//   }
// }
