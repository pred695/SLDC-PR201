import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import MyTableHourlyAllzones from '../components/tablesHourlyLoadAllzones';
import MyTableTotal from '../components/tablesTotalLoad';
import DailyReport from '../graphs/DailyReport';
import useCompareStore from '../components/Store/CompareStore';
import { useForecastDataStore } from '../components/Store/ForecastData';
import LGBRReport from '../components/LGBRReport'
import WeeklyLoadForecast from '../components/WeeklyLoadForecast';
import MonthlyLoadForecast from '../components/MonthlyLoadForecast';

const MTLF = (): JSX.Element => {
  const compare = useCompareStore((state) => state.compare);
  const { demand, getForecastData } = useForecastDataStore();

  React.useEffect(() => {
    getForecastData();
  }, [getForecastData]);

  return (
    <Flex
      w="100vw"
      h="100vh"
      mt="4rem"
      bgColor="sldcBlack"
      color="sldcWhite"
      direction="column"
      position={'relative'}
      px={'1.5rem'}
    >
      <Flex
      gap={'1rem'}
      direction={{base:'column',lg:'row'}}
      >
        <LGBRReport />
        <WeeklyLoadForecast/>
      </Flex>
      <Flex>
        <MonthlyLoadForecast/>
      </Flex>
    </Flex>
  );
};

export default MTLF;
