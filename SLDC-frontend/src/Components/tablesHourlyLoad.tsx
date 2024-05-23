import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { TableProperties } from '../Interfaces/tables';

interface IRowData {
  time: string;
  value: string;
}

const rowData: IRowData[] = [
  { time: '18:15', value: '2887.15' },
  { time: '18:30', value: '2889.20' },
  { time: '18:45', value: '2890.30' },
];

const MyTableHourly = () => {
  return (
    <Box overflow="hidden" borderRadius={TableProperties.borderRadius}>
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
              West Side
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
              <Td textAlign="center">{row.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MyTableHourly;
