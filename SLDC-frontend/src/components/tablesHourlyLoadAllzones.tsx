import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { TableProperties } from '../Interfaces/tables';

interface IRowData {
  time: string;
  actual: number;
  forecast: number;
}

const MyTableHourlyAllzones = (): JSX.Element => {
  const [rowData, setRowData] = useState<IRowData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/forecast');
        const data = await response.json();
        const formattedData = data.map(
          (row: { timestamp: string; actual: number; forecast: number }) => ({
            time: new Date(row.timestamp).toLocaleTimeString(),
            actual: row.actual,
            forecast: row.forecast,
          })
        );
        setRowData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      display={{ base: 'block', md: 'flex' }}
      height={{ base: 'auto', md: 'auto' }}
      overflowY="auto"
      borderRadius={TableProperties.borderRadius}
      pl={['0rem', '0rem', '0rem']}
      maxHeight="20vh"
    >
      <Table
        variant={TableProperties.variant}
        backgroundColor={TableProperties.backgroundColor}
        color={TableProperties.color}
      >
        <Thead>
          <Tr>
            <Th textAlign="center" color={TableProperties.color}>
              Timestamp
            </Th>
            <Th textAlign="center" color={TableProperties.color}>
              East Side
            </Th>
            <Th textAlign="center" color={TableProperties.color}>
              West Side
            </Th>
            <Th textAlign="center" color={TableProperties.color}>
              Central Zone
            </Th>
            <Th textAlign="center" color={TableProperties.color}>
              Railways
            </Th>
            <Th textAlign="center" color={TableProperties.color}>
              Total
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {rowData.map((row, index) => (
            <Tr
              key={row.time}
              bg={
                index % 2 === 0
                  ? TableProperties.backgroundColor
                  : TableProperties.stripeColor
              }
            >
              <Td textAlign="center">{row.time}</Td>
              <Td textAlign="center">{row.actual}</Td>
              <Td textAlign="center">{}</Td>
              <Td textAlign="center">{}</Td>
              <Td textAlign="center">{}</Td>
              <Td textAlign="center">{}</Td>
              <Td textAlign="center">{}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MyTableHourlyAllzones;
