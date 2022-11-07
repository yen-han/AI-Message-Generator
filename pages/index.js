import{useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ChakraProvider } from '@chakra-ui/react'
import Tweets from '../components/Tweets';
import { Center, VStack, Box, Flex, Text } from '@chakra-ui/react'
import Thankyou from '../components/Thankyou';

export default function Home() {
  const [which,setWhich]= useState(0);
  useEffect( () => {
    console.log(which)
  }
, [which]);
  return (
    <ChakraProvider>
      <Head>
        <title>Open-AI Exercise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} >
          <Flex>
            <VStack
            min-w='200px'
              spacing={4}
              align='start stretch' 
              justify='left'
              bg='#d4f2f5'
              h='100vh'
              width='200px'
              marginRight='3'
              paddingTop='40'
            >
              <Center h='40px' align='center' justifyContent='center'>
                <div  onClick={() => {setWhich(0)}}><Text as='b'>Tweets</Text></div>
              </Center>
              <Center h='40px' align='center' >
                <div onClick={() => {setWhich(1)}}><Text as='b'>Thank you</Text></div>
              </Center>
            </VStack>
          <Box m='5' width='70%'>
          <h1 className={styles.title} mt='20'>
          AI Generator
        </h1>
        <Center mb='9' fontSize='xl'>Built with NextJS & OPEN AI</Center>
            {which === 0? <Tweets/>: <Thankyou/>}
        </Box>
        </Flex>
      </main>
    </ChakraProvider>
  )
}
