import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { TableProperties } from '../Interfaces/tables';

interface IRowData {
  time: string;
  eastZoneValue: string;
  centralZoneValue: string;
  westZoneValue: string;
  raliwayZoneValue: string;
  totalValue: string;
}

const rowData: IRowData[] = [
  {
    time: '18:15',
    eastZoneValue: '2887.15',
    westZoneValue: '2889.20',
    centralZoneValue: '2888.20',
    raliwayZoneValue: '2888.20',
    totalValue: '2888.20',
  },
  {
    time: '18:30',
    eastZoneValue: '2887.15',
    westZoneValue: '2889.20',
    centralZoneValue: '2888.20',
    raliwayZoneValue: '2888.20',
    totalValue: '2888.20',
  },
  {
    time: '18:45',
    eastZoneValue: '2887.15',
    westZoneValue: '2889.20',
    centralZoneValue: '2888.20',
    raliwayZoneValue: '2888.20',
    totalValue: '2888.20',
  },
  {
    time: '18:45',
    eastZoneValue: '2887.15',
    westZoneValue: '2889.20',
    centralZoneValue: '2888.20',
    raliwayZoneValue: '2888.20',
    totalValue: '2888.20',
  },
];

const MyTableHourlyAllzones = (): JSX.Element => {
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
              <Td textAlign="center">{row.eastZoneValue}</Td>
              <Td textAlign="center">{row.westZoneValue}</Td>
              <Td textAlign="center">{row.centralZoneValue}</Td>
              <Td textAlign="center">{row.raliwayZoneValue}</Td>
              <Td textAlign="center">{row.totalValue}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MyTableHourlyAllzones;
