import { Box, Button, Divider, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { TbPointFilled } from 'react-icons/tb';

const Sidebar: React.FC = () => {
  const [active, setActive]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('');

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

  const onClick = (value: string): void => {
    setActive(value);
  };

  return (
    <Box
      position="fixed"
      left={0}
      bgColor="sldcLightBlue"
      top="4.5rem"
      bottom={0}
      w="12rem"
      px="1.5rem"
      pt="1.5rem"
    >
      <Stack color="sldcWhite">
        {menuList.map((value: { title: string; items: string[] }) => {
          return (
            <>
              <Text fontWeight="bold" fontSize="1.3rem">
                {value.title}
              </Text>
              <Stack gap={0}>
                {value.items.map((subValue: string) => {
                  return (
                    <Button
                      color="sldcWhite"
                      background={
                        active === subValue ? 'sldcDarkBlue' : 'transparent'
                      }
                      _hover={{ bg: 'sldcDarkBlue' }}
                      justifyContent="left"
                      w="9rem"
                      leftIcon={<TbPointFilled />}
                      onClick={() => onClick(subValue)}
                    >
                      {subValue}
                    </Button>
                  );
                })}
              </Stack>
              <Divider border="1px solid sldcWhite" my="0.6rem" />
            </>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Sidebar;
