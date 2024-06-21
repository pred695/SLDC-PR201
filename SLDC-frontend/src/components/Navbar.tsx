import {
  Box,
  Button,
  CreateToastFnReturn,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { GoOrganization, GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { MdMenu } from 'react-icons/md';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { LogOutResponse, logOutUser } from '../utils/api';
import useAuthStore, { AuthState } from './Store/AuthStore';

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
    | 'setUserName'
    | 'setUserEmail'
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

  const toast: CreateToastFnReturn = useToast();
  const navigate: NavigateFunction = useNavigate();
  const [isMobile]: boolean[] = useMediaQuery('(max-width: 1100px)');
  const [openIndex, setOpenIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = useState(-1);
  const [isDrawerOpen, setDrawerOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(false);

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
      zIndex={10}
    >
      <HStack gap={10}>
        <HStack spacing="1rem">
          <GoOrganization size={isMobile ? 25 : 35} />
          <Text fontSize={isMobile ? '1.2rem' : '1.7rem'} fontWeight="bold">
            SLDC LOAD FORECASTING
          </Text>
        </HStack>
        {!isMobile && (
          <HStack>
            {menuList.map((item, index) => {
              const isOpen = openIndex === index;
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
                      {item.items.map((subItem, subIndex) => (
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
            })}
          </HStack>
        )}
      </HStack>
      <HStack fontWeight="bold" gap={6}>
        {isAdmin && !isMobile && (
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
        {!isMobile && <Text>Account</Text>}
        {!isMobile && isAuth && (
          <Button
            onClick={handleLogout}
            bgColor="sldcDarkBlue"
            color="sldcWhite"
            _hover={{ backgroundColor: 'sldcGray' }}
          >
            Logout
          </Button>
        )}
        {!isMobile && !isAuth && (
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
      {isMobile && (
        <IconButton
          aria-label="Open menu"
          icon={<MdMenu size={28} />}
          bg="transparent"
          color="sldcWhite"
          onClick={() => setDrawerOpen(true)}
        />
      )}
      <Drawer
        isOpen={isDrawerOpen && isMobile}
        placement="right"
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent bg="sldcGray">
          <DrawerCloseButton color="sldcWhite" />
          <DrawerHeader color="sldcWhite">Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {menuList.map((item, index) => (
                <Box key={index} w="full">
                  <Text
                    fontSize="1.2rem"
                    fontWeight="bold"
                    color="sldcWhite"
                    mb={2}
                  >
                    {item.title}
                  </Text>
                  {item.items.map((subItem, subIndex) => (
                    <Button
                      key={subIndex}
                      w="full"
                      justifyContent="flex-start"
                      bg="transparent"
                      color="sldcWhite"
                      _hover={{ bg: 'sldcBlack' }}
                      mb={1}
                    >
                      {subItem}
                    </Button>
                  ))}
                  {index < menuList.length - 1 && (
                    <Divider borderColor="sldcWhite" my={4} />
                  )}
                </Box>
              ))}
              {isAdmin && (
                <Link to="/signup" style={{ width: '100%' }}>
                  <Button
                    onClick={() => navigate('/signup')}
                    bgColor="sldcDarkBlue"
                    color="sldcWhite"
                    _hover={{ backgroundColor: 'sldcGray' }}
                    w="full"
                  >
                    Register User
                  </Button>
                </Link>
              )}
              <Button
                onClick={handleLogout}
                bgColor="sldcDarkBlue"
                color="sldcWhite"
                _hover={{ backgroundColor: 'sldcGray' }}
                w="full"
              >
                Logout
              </Button>
              {!isAuth && (
                <Link to="/login" style={{ width: '100%' }}>
                  <Button
                    bgColor="sldcDarkBlue"
                    color="sldcWhite"
                    _hover={{ backgroundColor: 'sldcGray' }}
                    w="full"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
