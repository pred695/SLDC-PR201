import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import MyTableHourlyAllzones from '../components/tablesHourlyLoadAllzones';
import useCompareStore from '../components/Store/CompareStore';
import { useForecastDataStore } from '../components/Store/ForecastData';

const DayAhead = (): JSX.Element => {
  const compare = useCompareStore((state) => state.compare);
  const { demand, getForecastData } = useForecastDataStore();

  React.useEffect(() => {
    getForecastData();
  }, [getForecastData]);

  return (
    <Flex
      h="100vh"
      mt="4rem"
      bgColor="sldcBlack"
      color="sldcWhite"
      direction="column"
      position={'relative'}
      px={'1.5rem'}
      align={'center'}
    >
      <Flex
      gap={'1rem'}
      >
        <MyTableHourlyAllzones/>
      </Flex>
    </Flex>
  );
};

export default DayAhead;
