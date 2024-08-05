import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Stack } from '@chakra-ui/react';
import { TableProperties } from '../Interfaces/tables';
import { useForecastDataStore } from './Store/ForecastData';

const generateRandomData = () => {
  const months = ["January 2023", "February 2023", "March 2023", "April 2023", "May 2023", "June 2023", "July 2023", "August 2023", "September 2023", "October 2023", "November 2023", "December 2023"];
  return months.map(month => ({
    month,
    energy: (Math.random() * 10000).toFixed(1),
    peakLoad: (Math.random() * 10000).toFixed(1),
    baseLoad: (Math.random() * 10000).toFixed(1)
  }));
};

const LGBRReport = () => {
  const [rowData, setRowData] = useState<
    { month: string; energy: string; peakLoad: string; baseLoad: string }[]
  >([]);
  const { demand } = useForecastDataStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = generateRandomData();
      setRowData(data);
    };

    fetchData();
  }, [demand, page]);

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
    >
      <Stack
      my={'20px'}
      pt={'1.5rem'}
      px={{base:'2.5%',md:'4%'}}
      backgroundColor={TableProperties.backgroundColor}
      color={TableProperties.color}
      borderRadius={TableProperties.borderRadius}
      >
        <Text
        fontSize={{base:'1.1rem', md:'1.5rem'}} 
        fontWeight="semibold"
        pl={'3%'}
        >
          LGBR Report
        </Text>
        <Table
          variant={TableProperties.variant}
          backgroundColor={TableProperties.backgroundColor}
          color={TableProperties.color}
        >
          <Thead>
            <Tr>
              <Th textAlign="left" color={TableProperties.color}>
                Month
              </Th>
              <Th textAlign="left" color={TableProperties.color}>
                Energy Requirement (MU) 
              </Th>
              <Th textAlign="left" color={TableProperties.color}>
                Peak Load (MW)
              </Th>
              <Th textAlign="left" color={TableProperties.color}>
                Base Load (MW)
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
                <Td textAlign="left">{row.month}</Td>
                <Td textAlign="left">{row.energy}</Td>
                <Td textAlign="left">{row.peakLoad}</Td>
                <Td textAlign="left">{row.baseLoad}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Box>
    </>
  );
};

export default LGBRReport;
