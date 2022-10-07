import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ChakraProvider } from '@chakra-ui/react'
import Tweets from '../components/Tweets';
import Thankyou from '../components/Thankyou';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
export default function Home() {

  return (
    <ChakraProvider>


    <div className={styles.container}>
      <Head>
        <title>Open-AI Exercise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <h1 className={styles.title}>
        AI Generator
      </h1>
      <p className={styles.description} >Built with NextJS & OPEN AI</p>
      <Tabs>
  <TabList>
    <Tab>Tweets</Tab>
    <Tab>Thank you email</Tab>
  </TabList>

  <TabPanels>
      <TabPanel>
        <Tweets />
      </TabPanel>
      <TabPanel>
        <Thankyou />
      </TabPanel>
    </TabPanels>
  </Tabs>  
      </main>
    </div>
    </ChakraProvider>
  )
}
