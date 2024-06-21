import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { TableProperties } from '../Interfaces/tables';
import { useState, useEffect } from 'react';
import { useForecastDataStore } from './Store/ForecastData';

interface IRowData {
  time: string;
  actual: number;
  forecast: number;
}

const MyTableHourlyAllzones = (): JSX.Element => {
  const [rowData, setRowData] = useState<IRowData[]>([]);
  const { demand } = useForecastDataStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = demand.map((item) => ({
        time: new Date(item.time).toUTCString(),
        actual: Number(Number(item.actual).toFixed(3)),
        forecast: Number(Number(item.forecast).toFixed(3)),
      }));

      setRowData(data);
    };

    fetchData();
  }, [demand]);

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