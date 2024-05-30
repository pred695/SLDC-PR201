import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { TableProperties } from '../Interfaces/tables';

interface IRowData {
  time: string;
  actual: string;
  forecast: string;
}

const rowData: IRowData[] = [
  { time: '18:15', actual: '2887.15', forecast: '2887.15' },
  { time: '18:30', actual: '2889.20', forecast: '2889.20' },
  { time: '18:45', actual: '2890.30', forecast: '2890.30' },
  { time: '18:30', actual: '2889.20', forecast: '2889.20' },
  { time: '18:45', actual: '2890.30', forecast: '2890.30' },
  { time: '18:30', actual: '2889.20', forecast: '2889.20' },
  { time: '18:45', actual: '2890.30', forecast: '2890.30' },
  { time: '18:15', actual: '2887.15', forecast: '2887.15' },
  { time: '18:30', actual: '2889.20', forecast: '2889.20' },
  { time: '18:45', actual: '2890.30', forecast: '2890.30' },
  { time: '18:30', actual: '2889.20', forecast: '2889.20' },
  { time: '18:45', actual: '2890.30', forecast: '2890.30' },
  { time: '18:30', actual: '2889.20', forecast: '2889.20' },
  { time: '18:45', actual: '2890.30', forecast: '2890.30' },
  { time: '18:30', actual: '2889.20', forecast: '2889.20' },
  { time: '18:45', actual: '2890.30', forecast: '2890.30' },
  { time: '18:30', actual: '2889.20', forecast: '2889.20' },
  { time: '18:45', actual: '2890.30', forecast: '2890.30' },
];

const MyTableTotal = (): JSX.Element => {
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
          {rowData.map((row: IRowData) => (
            <Tr
              key={row.time}
              bg={
                rowData.indexOf(row) % 2 === 0
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

export default MyTableTotal;
