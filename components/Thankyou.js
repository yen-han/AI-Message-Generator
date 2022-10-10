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

function Thankyou() {
    const [data, setData] = useState('..awaiting data');
    const handleSubmit=async (e)=> {
        e.preventDefault();
        const formData= new FormData(e.target);
        let formDataObj=Object.fromEntries(formData.entries());

        let prompt= 'Thank you email about '+ formDataObj.emailInput;
        console.log(prompt)
        generateAI(prompt).then((response)=>{
            setData(response.data.choices[0].text)}
            ).catch((err)=>console.log(err));
    }
  return (
    <div className="tweets">
        <form onSubmit={handleSubmit}>
            <FormControl mb="10">
            <FormLabel>Thank you email about .. ?</FormLabel>
            <Input type='text' name='emailInput' />
            </FormControl>
            <Center>
            <Button colorScheme='blue' type="submit">Generate</Button>
            </Center>
        </form>
        <Box mt="10" borderWidth='1px' padding='5' borderRadius='lg'>
        <h3 as='b'>Response</h3>
        <p>{data}</p>
        </Box>
    </div>
    );
}
export default Thankyou;
