import{useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ChakraProvider } from '@chakra-ui/react'
import Tweets from '../components/Tweets';
import { Center, VStack, Box, Flex } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import Thankyou from '../components/Thankyou';
import Link from 'next/link';

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
        <h1 className={styles.title} mt='20'>
          AI Generator
        </h1>
        <Box mb='9' fontSize='xl'>Built with NextJS & OPEN AI</Box>

        <Grid w='90%' h='50vh'
          templateColumns='repeat(5, 1fr)'
          gap='5'
          color='blackAlpha.700'
          fontWeight='bold'
        >
          <GridItem colSpan={1}  >
            <VStack
              spacing={4}
              align='start stretch' 
              bg='#d4f2f5'
              h='100%'
            >
              <Center h='40px' align='center' justifyContent='center'>
                <div onClick={() => {setWhich(0)}}>Tweets</div>
              </Center>
              <Center h='40px' align='center' >
                <div onClick={() => {setWhich(1)}}>Thank you</div>
              </Center>
            </VStack>
          </GridItem>

          <GridItem colSpan={4} >
            {which === 0? <Tweets/>: <Thankyou/>}
          </GridItem>
        </Grid>
      </main>
    </ChakraProvider>
  )
}
