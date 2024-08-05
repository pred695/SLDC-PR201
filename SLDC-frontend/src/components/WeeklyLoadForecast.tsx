import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Stack, Flex, Button } from '@chakra-ui/react';
import { TableProperties } from '../Interfaces/tables';
import { useForecastDataStore } from './Store/ForecastData';

const WeeklyLoadForecast = () => {
  const [rowData, setRowData] = useState<
    { time: string; actual: number; forecast: number }[]
  >([]);
  const { demand } = useForecastDataStore();
  const [page, setPage] = useState(1);
  const rowsPerPage = 11;

  useEffect(() => {
    const fetchData = async () => {
      const data = demand.map((item) => ({
        time: new Date(item.time).toUTCString().split(' ')[4].substring(0, 5),
        actual: Number(Number(item.actual).toFixed(3)),
        forecast: Number(Number(item.forecast).toFixed(3)),
      })).reverse();

      setRowData(data.slice(0, rowsPerPage * page));
    };

    fetchData();
  }, [demand, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
    <Box
      display={{ base: 'block', md: 'block' }}
      height={{ base: 'auto', md: 'auto' }}
      width="90%"
      mx='auto'
      overflowY="auto"
      borderRadius={TableProperties.borderRadius}
      pl={['0rem', '0rem', '0rem']}
      maxHeight="40vh"
      pos={'relative'}
    >
      <Stack
      mt={'20px'}
      pt={'1.5rem'}
      px={{base:'2.5%',md:'4%'}}
      backgroundColor={TableProperties.backgroundColor}
      color={TableProperties.color}
      borderRadius={TableProperties.borderRadius}
      >
        <Flex
        justify={'space-between'}
        >
            <Text
            fontSize={{base:'1.1rem', md:'1.5rem'}} 
            fontWeight="semibold"
            pl={'3%'}
            >
            Weekly Load Forecast
            </Text>
            <Button
            bg={'sldcDarkBlue'}
            color={'sldcWhite'}
            >
                Print As
            </Button>
        </Flex>
        <Table
          variant={TableProperties.variant}
          backgroundColor={TableProperties.backgroundColor}
          color={TableProperties.color}
        >
          <Thead>
            <Tr>
              <Th textAlign="left" color={TableProperties.color}>
                Time
              </Th>
              <Th textAlign="left" color={TableProperties.color}>
                30-05-2024 
              </Th>
              <Th textAlign="left" color={TableProperties.color}>
                31-05-2024
              </Th>
              <Th textAlign="left" color={TableProperties.color}>
                1-06-2024
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {rowData.map((row, index) => (
              <Tr
                key={index}
                bg={
                  index % 2 === 0
                    ? TableProperties.backgroundColor
                    : TableProperties.stripeColor
                }
              >
                <Td textAlign="left">{row.time}</Td>
                <Td textAlign="left">{row.actual}</Td>
                <Td textAlign="left">{row.forecast}</Td>
                <Td textAlign="left">{row.forecast}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Box>
    </>
  );
};

export default WeeklyLoadForecast;
