import  { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { TableProperties } from '../Interfaces/tables';

const Homepage = () => {
  const [rowData, setRowData] = useState<{ time: string; actual: number; forecast: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/forecast');
        const data = await response.json();
        const formattedData = data.map((row: { timestamp: string; actual: number; predicted: number }) => ({
          time: new Date(row.timestamp).toLocaleTimeString(),
          actual: row.actual,
          forecast: row.predicted,
        }));
        setRowData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      display={{ base: 'block', md: 'block' }}
      width="100%"
      overflowY="auto"
      borderRadius={TableProperties.borderRadius}
      maxHeight="100vh"
    >
      <Table
        variant={TableProperties.variant}
        backgroundColor={TableProperties.backgroundColor}
        color={TableProperties.color}
      >
        <Thead>
          <Tr>
            <Th textAlign="center" color={TableProperties.color}>
              Time
            </Th>
            <Th textAlign="center" color={TableProperties.color}>
              Actual
            </Th>
            <Th textAlign="center" color={TableProperties.color}>
              Forecast
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {rowData.map((row, index) => (
            <Tr
              key={index}
              bg={index % 2 === 0 ? TableProperties.backgroundColor : TableProperties.stripeColor}
            >
              <Td textAlign="center">{row.time}</Td>
              <Td textAlign="center">{row.actual}</Td>
              <Td textAlign="center">{row.forecast}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Homepage;
