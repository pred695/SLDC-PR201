import { Box, Flex } from '@chakra-ui/react';
import MyTableHourlyAllzones from '../components/tablesHourlyLoadAllzones';
import MyTableTotal from '../components/tablesTotalLoad';
import DailyReport from '../graphs/DailyReport';
import React from 'react';
import useCompareStore from '../components/Store/CompareStore';
import { useForecastDataStore } from '../components/Store/ForecastData';

const Homepage = (): JSX.Element => {
  const compare = useCompareStore((state) => state.compare);
  const { demand, getForecastData } = useForecastDataStore();

  React.useEffect(() => {
    getForecastData();
  }, [getForecastData]);
  
  return (
    <Flex
      w="100vw"
      h="100vh"
      pt="4rem"
      bgColor="sldcBlack"
      color="sldcWhite"
      direction="column"
      overflowY="auto"
    >
      <Flex
        direction={{ base: 'column', md: compare?'column':'row' }}
        width="100%"
        justify="flex-start"
        align="flex-start"
        px="2rem"
      >
        <Flex direction={"column"} width="100%">
          {
            demand ?
            <Flex>
            <Box
              mb={['', '', '-4rem']}
              mt={['', '', '-8rem']}
              ml={['', '', '-22rem']}
              mr={['', '', '-20rem']}
            >
              <DailyReport />
            </Box>
            {
              compare && (
                <Box
                  mb={['', '', '-4rem']}
                  mt={['', '', '-8rem']}
                  ml={['', '', '-22rem']}
                  mr={['', '', '-20rem']}
                >
                  <DailyReport />
                </Box>
              )
            }
            </Flex>
            : <Box>Loading...</Box>
          }
          <Flex>
          <Box px="2rem" pt="2rem" maxWidth={['100%', '100%', '100%']}>
            <MyTableHourlyAllzones />
          </Box>
          {compare && <Box width={{ base: '100%', md: '40%' }} p="2rem">
            <MyTableTotal />
          </Box>}
          </Flex>
        </Flex>
        {!compare && <Box width={{ base: '100%', md: '40%' }} p="2rem">
          <MyTableTotal />
        </Box>}
      </Flex>
    </Flex>
  );
};

export default Homepage;
