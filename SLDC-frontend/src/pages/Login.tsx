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
  useToast,
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AxiosResponse } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LoginData, loginUser, LoginResponse } from '../utils/api';
import useAuthStore, { AuthState } from '../components/Store/AuthStore';

const Login: React.FC = () => {
  const [show, setShow]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState<boolean>(false);
  const usernameRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const passwordRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const {
    addAuth,
    setUserName,
    setUserEmail,
    setUserId,
    setAdmin,
    setUserRegion,
  }: Pick<
    AuthState,
    | 'addAuth'
    | 'setUserName'
    | 'setUserEmail'
    | 'setUserId'
    | 'setAdmin'
    | 'setUserRegion'
  > = useAuthStore((state: AuthState) => ({
    addAuth: state.addAuth,
    setUserName: state.setUserName,
    setUserEmail: state.setUserEmail,
    setUserId: state.setUserId,
    setAdmin: state.setAdmin,
    setUserRegion: state.setUserRegion,
  }));
  // eslint-disable-next-line
  const toast = useToast();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const handleSubmit = async (): Promise<void> => {
    try {
      const loginData: LoginData = {
        username: usernameRef.current?.value as string,
        password: passwordRef.current?.value as string,
      };
      const response: AxiosResponse<LoginResponse> = await loginUser(loginData); // not Promise<AxiosResponse<LoginResponse>> since await resolves it.
      if (response.status === 200) {
        addAuth();
        setUserName(response.data.username);
        setUserEmail(response.data.email);
        setUserId(response.data.user_id);
        setAdmin(response.data.isAdmin);
        setUserRegion(response.data.region);
        toast({
          title: 'Success',
          description: 'Logged In',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        navigate('/');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Invalid Credentials',
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
          Log In
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
                Username
              </FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username.."
                mb="1rem"
                border="none"
                bgColor="sldcGray"
                ref={usernameRef}
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
                  mb="0.5rem"
                  border="none"
                  bgColor="sldcGray"
                  ref={passwordRef}
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
            <Link to="/forgotPassword">
              <Text as="u">Forgot Password?</Text>
            </Link>
            <Center>
              <Button
                size="lg"
                mt="2rem"
                bgColor="sldcDarkBlue"
                color="sldcWhite"
                _hover={{
                  backgroundColor: 'sldcGray',
                }}
                onClick={handleSubmit}
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
