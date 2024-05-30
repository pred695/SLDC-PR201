import { Box, Flex } from '@chakra-ui/react';
import MainGraph from '../graphs/MainGraph';
import { mainData, labels } from '../tempData/mainData';
import MyTableHourlyAllzones from '../components/tablesHourlyLoadAllzones';
import MyTableTotal from '../components/tablesTotalLoad';

const Homepage = (): JSX.Element => {
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
        direction={{ base: 'column', md: 'row' }}
        width="100%"
        justify="flex-start"
        align="flex-start"
        px="2rem"
      >
        <Flex direction="column" width="100%">
          <Box
            mb={['', '', '-4rem']}
            mt={['', '', '-8rem']}
            ml={['', '', '-22rem']}
            mr={['', '', '-20rem']}
          >
            <MainGraph data={mainData} labels={labels} />
          </Box>
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
