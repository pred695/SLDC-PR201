import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { GoOrganization, GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import useAuthStore, { AuthState } from './Store/AuthStore';
import { logOutUser, LogOutResponse } from '../utils/api';

const Navbar: React.FC = () => {
  const {
    isAuth,
    removeAuth,
    setUserName,
    setUserEmail,
    setUserId,
    isAdmin,
    setAdmin,
  }: Pick<
    AuthState,
    | 'isAuth'
    | 'removeAuth'
    | `setUserName`
    | `setUserEmail`
    | 'setUserId'
    | 'isAdmin'
    | 'setAdmin'
  > = useAuthStore((state: AuthState) => ({
    isAuth: state.isAuth,
    removeAuth: state.removeAuth,
    setUserName: state.setUserName,
    setUserEmail: state.setUserEmail,
    setUserId: state.setUserId,
    isAdmin: state.isAdmin,
    setAdmin: state.setAdmin,
  }));
  // eslint-disable-next-line
  const toast = useToast();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const menuList: { title: string; items: string[] }[] = [
    {
      title: 'Zones',
      items: ['NODL', 'SODL', 'EODL', 'WODL'],
    },
    {
      title: 'Report',
      items: ['24 Hour', 'Overall'],
    },
    {
      title: 'Forecasting',
      items: ['Day Ahead', 'Mid Term', 'Long Term'],
    },
  ];

  const [openIndex, setOpenIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = useState<number>(-1);

  const handleMouseEnter = (index: number): void => {
    setOpenIndex(index);
  };

  const handleMouseLeave = (): void => {
    setOpenIndex(-1);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      const response: AxiosResponse<LogOutResponse> = await logOutUser();
      if (response.status === 200) {
        removeAuth();
        setUserName('');
        setUserEmail('');
        setUserId('');
        setAdmin(false);
        toast({
          title: 'Logged out successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          onCloseComplete: () => {
            navigate('/login');
          },
          position: 'top',
        });
      }
    } catch (err) {
      toast({
        title: 'Error logging out',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      w="100vw"
      justify="space-between"
      align="center"
      bg="sldcDarkBlue"
      color="sldcWhite"
      px={8}
      h="4.5rem"
      position="fixed"
      top={0}
      zIndex={1}
    >
      <HStack gap={10}>
        <HStack spacing="1rem">
          <GoOrganization size={35} />
          <Text fontSize="1.7rem" fontWeight="bold">
            SLDC LOAD FORECASTING
          </Text>
        </HStack>
        <HStack>
          {menuList.map(
            (item: { title: string; items: string[] }, index: number) => {
              const isOpen: boolean = openIndex === index;
              return (
                <Box
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Menu isOpen={isOpen}>
                    <MenuButton
                      as={Button}
                      h="4.5rem"
                      rightIcon={
                        isOpen ? (
                          <GoTriangleUp size={20} />
                        ) : (
                          <GoTriangleDown size={20} />
                        )
                      }
                      px={3}
                      isActive={isOpen}
                      background="transparent"
                      color="sldcWhite"
                      borderRadius={0}
                      _hover={{ background: 'sldcGray', color: 'sldcWhite' }}
                      _active={{ background: 'sldcGray', color: 'sldcWhite' }}
                    >
                      {item.title}
                    </MenuButton>
                    <MenuList
                      bgColor="sldcGray"
                      mt="-8px"
                      border="none"
                      borderRadius={0}
                      p={2}
                    >
                      {item.items.map((subItem: string, subIndex: number) => (
                        <MenuItem
                          key={subIndex}
                          p={2}
                          bgColor="sldcGray"
                          _hover={{ bgColor: 'sldcBlack' }}
                        >
                          {subItem}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
              );
            }
          )}
        </HStack>
      </HStack>
      <HStack fontWeight="bold" gap={6}>
        {isAdmin && (
          <Link to="/signup">
            <Button
              onClick={() => navigate('/signup')}
              bgColor="sldcDarkBlue"
              color="sldcWhite"
              _hover={{ backgroundColor: 'sldcGray' }}
            >
              Register User
            </Button>
          </Link>
        )}
        <Text>Account</Text>
        {isAuth ? (
          <Button
            onClick={handleLogout}
            bgColor="sldcDarkBlue"
            color="sldcWhite"
            _hover={{ backgroundColor: 'sldcGray' }}
          >
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button
              bgColor="sldcDarkBlue"
              color="sldcWhite"
              _hover={{ backgroundColor: 'sldcGray' }}
            >
              Login
            </Button>
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
