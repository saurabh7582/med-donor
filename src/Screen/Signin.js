import React,{useState} from 'react'

import { 
    Stack,
    Box,
    VStack, 
    Image, 
    Text, 
    Button, 
    Heading, 
    Input,
    HStack,  
    Link
  } from '@chakra-ui/react'

import Head from '../Component/Head'
import axios from 'axios'
import styles from "./styles.module.css";

function SignIn() {

    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <>
    <Head />
    <VStack  h="100vh"  p="50">
      <Box boxShadow='dark-lg' w="full" pb={["20","0","0"]} rounded='md'  >
        <Stack direction={["column","row","row"]}  w="full">
          <VStack w={["full","50%","50%"]} h={["90vh","80vh","80vh"]} pt={["5%","5%","5%"]} spacing="5vh" >
              <Heading pt="10vh">Login Account</Heading>
              <form className={styles.form_container} onSubmit={handleSubmit}>
              <Input
				type="email"
				placeholder="Email"
				name="email"
				onChange={handleChange}
				value={data.email}
				required
				className={styles.input}
			   />
				<Input
					type="password"
					placeholder="Password"
					name="password"
					onChange={handleChange}
					value={data.password}
					required
					className={styles.input}
				/>
                {error && <div className={styles.error_msg}>{error}</div>}
                <Button mt={[10,5,5]} rounded='lg'  bg="#20BC7E" type="submit">
                  Sing In
                </Button>
				    	</form>
              <HStack display={['flex','none','none']}>
                <Text>Want to create account?</Text>
                <Text color="#20BC7E" > SignUp</Text>
              </HStack>
            </VStack>
            <VStack w={["full","50%","50%"]} h="80vh" display={["none","flex","flex"]} bg="#FFB87A" spacing="10vh" >
                <Image src="https://res.cloudinary.com/ssdeveloper/image/upload/v1665256771/Med%20Donner/Logo_ujcyxi.svg" pt="10vh" ></Image>
                <Text fontWeight="semibold" fontSize="50"> Welcome back</Text>
                <Link href='/signup' w="20%" >
                    <Button rounded='md'  bg="#20BC7E"  > SignUp</Button>
                </Link>
            </VStack>
        </Stack>
      </Box>
    </VStack>

    </>
  )
}

export default SignIn