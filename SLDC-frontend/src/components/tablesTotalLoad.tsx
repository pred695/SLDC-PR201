import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from '@chakra-ui/react';
import { TableProperties } from '../Interfaces/tables';
import { useForecastDataStore } from './Store/ForecastData';

const Homepage = () => {
  const [rowData, setRowData] = useState<
    { time: string; actual: number; forecast: number }[]
  >([]);
  const { demand } = useForecastDataStore();
  const [page, setPage] = useState(1);
  const rowsPerPage = 11;

  useEffect(() => {
    const fetchData = async () => {
      const data: { time: string; actual: number; forecast: number }[] = demand.map((item) => ({
        time: new Date(item.time).toUTCString().replace(' GMT', ''),
        actual: Number(Number(item.actual).toFixed(3)),
        forecast: Number(Number(item.forecast).toFixed(3)),
      }));

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
      width="100%"
      overflowY="auto"
      borderRadius={TableProperties.borderRadius}
      pl={['0rem', '0rem', '0rem']}
      maxHeight="82vh"
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
    <div>
    {rowData.length < demand.length && (
        <Button onClick={loadMore} mt={4}>
          Load More
        </Button>
      )}
    </div>
    </>
  );
};

export default Homepage;
