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
    const [data, setData] = useState([]);
    const handleSubmit=async (e)=> {
        e.preventDefault();
        const formData= new FormData(e.target);
        let formDataObj=Object.fromEntries(formData.entries());

        let prompt= 'Generate Tweet message about '+ formDataObj.tweetInput;
        console.log(prompt)
        generateAI(prompt).then((response)=>{

            response.data.choices.map(
                (element) => {
                    setData(oldArray => [...oldArray, element.text]);
                }
            )
}
            ).catch((err)=>console.log(err));
    }
  return (
    <div className="tweets">
        <form onSubmit={handleSubmit}>
            <FormControl mb="10">
            <FormLabel>Generate Tweet message about .. ?</FormLabel>
            <Input type='text' name='tweetInput' />
            </FormControl>
            <Center>
            <Button colorScheme='blue' type="submit">Generate</Button>
            </Center>
        </form>
        <Box mt="10" borderWidth='1px' padding='5' borderRadius='lg'>
        <h3 as='b'>Response</h3>
        {data.map((item, index) => {<p>{index}. {item}</p>}
        )}
        </Box>
    </div>
    );
}
export default Tweets;
