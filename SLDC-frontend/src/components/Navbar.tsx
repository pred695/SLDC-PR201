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
} from '@chakra-ui/react';
import { useState } from 'react';
import { GoOrganization, GoTriangleDown, GoTriangleUp } from 'react-icons/go';

const Navbar: React.FC = () => {
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
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  // key={index}
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
                      {item.items.map((subItem: string) => (
                        <MenuItem
                          // key={subIndex}
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
        <Text>Account</Text>
        <Text>Login</Text>
      </HStack>
    </Flex>
  );
};

export default Navbar;
