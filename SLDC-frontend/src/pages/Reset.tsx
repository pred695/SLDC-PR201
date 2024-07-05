import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordResponse } from '../utils/api';

const ResetPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const email = emailRef.current?.value as string;
      console.log(email);
      const response: AxiosResponse<ForgotPasswordResponse> = await axios.post(
        'http://localhost:3000/forgotPassword',
        { email }
      );
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Check your email for reset instructions',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        navigate('/login');
      } else if (response.status === 404) {
        toast({
          title: 'Error',
          description: 'User not found',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
      console.log(response);
    } catch (err: any) {
      const errorDescription = err.response.data.message;
      toast({
        title: 'Error',
        description: errorDescription,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100vw" h="100vh" pt="10rem" bgColor="sldcBlack" color="sldcWhite">
      <Center>
        <Text fontSize="3rem" fontWeight="bold" mb="1.5rem">
          Reset Password
        </Text>
      </Center>
      <Center>
        <Box
          bgColor="sldcDarkBlue"
          px="3.5rem"
          py="3rem"
          borderRadius="25"
          bgGradient="linear(to-b, #324C89, #8A99DD)"
        >
          <Box w="25rem">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel fontWeight="bold" fontSize="larger">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email.."
                  mb="1rem"
                  border="none"
                  bgColor="sldcGray"
                  ref={emailRef}
                />
              </FormControl>
              <Center>
                <Button
                  type="submit"
                  size="lg"
                  mt="2rem"
                  bgColor="sldcDarkBlue"
                  color="sldcWhite"
                  _hover={{
                    backgroundColor: 'sldcGray',
                  }}
                >
                  Reset Password
                </Button>
              </Center>
            </form>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default ResetPassword;
