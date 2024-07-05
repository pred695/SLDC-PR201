import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { TableProperties } from '../Interfaces/tables';
import { useForecastDataStore } from './Store/ForecastData';

const Homepage = () => {
  const [rowData, setRowData] = useState<
    { time: string; actual: number; forecast: number }[]
  >([]);
  const { demand } = useForecastDataStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = demand.map((item) => ({
        time: new Date(item.time).toUTCString().split(' ')[4].substring(0, 5),
        actual: Number(Number(item.actual).toFixed(3)),
        forecast: Number(Number(item.forecast).toFixed(3)),
      })).reverse();

      setRowData(data);
    };

    fetchData();
  }, [demand]);

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
              bg={
                index % 2 === 0
                  ? TableProperties.backgroundColor
                  : TableProperties.stripeColor
              }
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
