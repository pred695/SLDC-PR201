import { Box, Flex } from '@chakra-ui/react';
// import MainGraph from '../graphs/MainGraph';
// import { mainData, labels } from '../tempData/mainData';
import MyTableHourlyAllzones from '../components/tablesHourlyLoadAllzones';
import MyTableTotal from '../components/tablesTotalLoad';
import DailyReport from '../graphs/DailyReport';
import React from 'react';
import useStore from '../store/store';

const Homepage = (): JSX.Element => {
  const compare = useStore((state) => state.compare);
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
          <Flex>
          <Box
            mb={['', '', '-4rem']}
            mt={['', '', '-8rem']}
            ml={['', '', '-22rem']}
            mr={['', '', '-20rem']}
          >
            <DailyReport />
            {/* <MainGraph data={mainData} labels={labels} /> */}
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
          <Box px="2rem" pt="2rem" maxWidth={['100%', '100%', '100%']}>
            <MyTableHourlyAllzones />
          </Box>
        </Flex>
        <Box width={{ base: '100%', md: '40%' }} p="2rem">
          <MyTableTotal />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Homepage;
