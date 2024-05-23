import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface LoginData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [show, setShow]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState<boolean>(false);
  const [loginData, setLoginData]: [
    LoginData,
    React.Dispatch<React.SetStateAction<LoginData>>,
  ] = useState<LoginData>({
    username: '',
    password: '',
  });

  const { username, password }: { username: string; password: string } =
    loginData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData((prevState: LoginData) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box w="100vw" h="100vh" pt="10rem" bgColor="sldcBlack" color="sldcWhite">
      <Center>
        <Text fontSize="3rem" fontWeight="bold" mb="1.5rem">
          Sign In
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
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="larger">
                Email
              </FormLabel>
              <Input
                id="username"
                name="username"
                type="email"
                placeholder="Email Address"
                value={username}
                onChange={onChange}
                mb="1rem"
                border="none"
                bgColor="sldcGray"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="larger">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  type={show ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                  mb="0.5rem"
                  border="none"
                  bgColor="sldcGray"
                />
                <InputRightElement>
                  <Button
                    p={0}
                    background="transparent"
                    color="sldcWhite"
                    _hover={{ background: 'transparent' }}
                  >
                    {show ? (
                      <FiEyeOff size="18" onClick={() => setShow(!show)} />
                    ) : (
                      <FiEye size="18" onClick={() => setShow(!show)} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Text as="u">Forgot Password?</Text>
            <Center>
              <Button
                size="lg"
                mt="2rem"
                bgColor="sldcDarkBlue"
                color="sldcWhite"
                _hover={{
                  backgroundColor: 'sldcGray',
                }}
              >
                Log In
              </Button>
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Login;
