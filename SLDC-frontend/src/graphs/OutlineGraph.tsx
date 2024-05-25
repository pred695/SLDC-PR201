import AreaChart from 'react-apexcharts';
import { Load } from '../types/Load.tsx';
import { Box, Flex } from '@chakra-ui/react';

interface OutlineGraphProps {
  data: Load[];
  color?: string | '';
  gradientColor?: string | '';
}

export default function OutlineGraph({
  data,
  color,
  gradientColor,
}: OutlineGraphProps) {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      labels: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: [gradientColor],
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 80],
      },
    },
    stroke: {
      colors: [color],
      curve: 'straight',
      width: 1.5,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: 'series1',
      data: data.map((d) => d.load),
    },
  ];

  return(
    <Flex w="100vw" overflow={'hidden'} pb={'4rem'} h="100vh" pt="10rem" bgColor="sldcBlack" color="sldcWhite" justify={'center'} align={'center'}>
      <Box border={'2px solid #36b5d8'} bgColor={'#262A33'} padding={'1rem 4rem'} borderRadius={'10px'}>
      <AreaChart type={'area'} series={series} options={options} width='300%'/>
      </Box>
    </Flex>
  ) 
}
