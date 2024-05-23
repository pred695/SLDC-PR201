import { Table, Thead, Tbody, Tr, Th, Td,Box } from "@chakra-ui/react";
import { TableProperties } from "../Interfaces/themes";
const MyTableTotal =() => {
    return (
      <Box overflow="hidden" borderRadius={TableProperties.borderRadius}>
      <Table {...TableProperties}>
        <Thead>
          <Tr>
            <Th textAlign="center" color={TableProperties.color}>Time</Th>
            <Th  textAlign="center" color={TableProperties.color}>Actual</Th>
            <Th  textAlign="center" color={TableProperties.color}>Forecast</Th>
            
          </Tr>
        </Thead>
        <Tbody>
          {[
            { time: '18:15', actual: '2887.15', forecast: '2887.15'},
            { time: '18:30', actual: '2889.20', forecast: '2889.20'},
            { time: '18:45', actual: '2890.30', forecast: '2890.30'},
            { time: '18:30', actual: '2889.20', forecast: '2889.20'},
            { time: '18:45', actual: '2890.30', forecast: '2890.30'},
            { time: '18:30', actual: '2889.20', forecast: '2889.20'},
            { time: '18:45', actual: '2890.30', forecast: '2890.30'},
          ].map((row, index) => (
            <Tr key={index} bg={index % 2 === 0 ? TableProperties.backgroundColor : TableProperties.stripeColor}>
             <Td textAlign="center">{row.time}</Td>
              <Td textAlign="center">{row.actual}</Td>
              <Td textAlign="center">{row.forecast}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Box>
    );
  }


export default MyTableTotal;