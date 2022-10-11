import {useState} from 'react';
import { generateAI } from '../pages/api/generate';
import {
    FormControl,
    FormLabel,
    Input,
    Center,
    Button,
    Box
  } from '@chakra-ui/react';

function Tweets() {
    const [data, setData] = useState('..awaiting data');
    const handleSubmit=async (e)=> {
        e.preventDefault();
        const formData= new FormData(e.target);
        let formDataObj=Object.fromEntries(formData.entries());

        let prompt= 'Generate Tweet message about '+ formDataObj.tweetInput;
        console.log(prompt)
        generateAI(prompt).then((response)=>{
            setData(response.data.choices[0].text)
            // response.data.choices.map(
            //     (element) => {
            //         setData(oldArray => [...oldArray, element.text]);
            //     }
            // )    
        }).catch((err)=>console.log(err));
    }
  return (
    <div className="tweets">
        <form onSubmit={handleSubmit}>
            <FormControl mb="10">
            <FormLabel>Generate Tweet message about .. ?</FormLabel>
            <Input type='text' name='tweetInput' />
            </FormControl>
            <Center>
            <Button colorScheme='teal' type="submit">Generate</Button>
            </Center>
        </form>
        <h3 mt="10" as='b'>Response</h3>
        <Box mt='2' borderWidth='1px' padding='5' borderRadius='lg'>
        <p>{data}</p>
        </Box>
    </div>
    );
}
export default Tweets;
