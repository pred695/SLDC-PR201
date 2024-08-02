import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AxiosResponse } from 'axios';
import { SignUpData, SignUpResponse, signUpUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [show, setShow] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const adminRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const designationRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (): Promise<void> => {
    try {
      const signUpData: SignUpData = {
        username: usernameRef.current?.value ?? '',
        first_name: firstNameRef.current?.value ?? '',
        last_name: lastNameRef.current?.value ?? '',
        email: emailRef.current?.value ?? '',
        password: passwordRef.current?.value ?? '',
        isAdmin: adminRef.current?.checked ?? false,
        phone_number: phoneRef.current?.value ?? '',
        designation: designationRef.current?.value ?? '',
        region: regionRef.current?.value ?? '',
      };
      console.log(signUpData);

      const response: AxiosResponse<SignUpResponse> =
        await signUpUser(signUpData);
      if (response.status === 201) {
        toast({
          title: 'User Registered',
          description: 'User has been registered successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        navigate('/signup');
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response.data,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box
      w="100%"
      h="100%"
      pt="10rem"
      pb="10rem"
      bgColor="sldcBlack"
      color="sldcWhite"
    >
      <Center>
        <Text fontSize="3rem" fontWeight="bold" mb="1.5rem">
          Register a user
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
                First Name
              </FormLabel>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name.."
                mb="1rem"
                border="none"
                bgColor="sldcGray"
                ref={firstNameRef}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="larger">
                Last Name
              </FormLabel>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="LastName.."
                mb="1rem"
                border="none"
                bgColor="sldcGray"
                ref={lastNameRef}
              />
            </FormControl>
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
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="larger">
                Region
              </FormLabel>
              <Input
                id="region"
                name="region"
                type="text"
                placeholder="Region.."
                mb="1rem"
                border="none"
                bgColor="sldcGray"
                ref={regionRef}
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
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FiEyeOff size="18" /> : <FiEye size="18" />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="larger">
                Phone Number
              </FormLabel>
              <InputGroup>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  mb="0.5rem"
                  border="none"
                  bgColor="sldcGray"
                  ref={phoneRef}
                />
                <InputRightElement>
                  <Button
                    p={0}
                    background="transparent"
                    color="sldcWhite"
                    _hover={{ background: 'transparent' }}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FiEyeOff size="18" /> : <FiEye size="18" />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="larger">
                Designation
              </FormLabel>
              <InputGroup>
                <Input
                  id="designation"
                  name="designation"
                  type="text"
                  placeholder="Designation"
                  mb="0.5rem"
                  border="none"
                  bgColor="sldcGray"
                  ref={designationRef}
                />
                <InputRightElement>
                  <Button
                    p={0}
                    background="transparent"
                    color="sldcWhite"
                    _hover={{ background: 'transparent' }}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FiEyeOff size="18" /> : <FiEye size="18" />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <Checkbox size="lg" colorScheme="blue" ref={adminRef}>
                Admin
              </Checkbox>
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
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Signup;
