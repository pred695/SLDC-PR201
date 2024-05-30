import Chart from 'react-apexcharts';
import { format } from 'date-fns';
import { Box, Flex } from '@chakra-ui/react';
import { color } from 'framer-motion';
import convertRemToPixels from '../utils/remToPixel.tsx';
import capitalize from '../utils/capitalize.tsx';
import { GraphInputData } from '../types/GraphInputData.tsx';

interface MainGraphProps {
  data: GraphInputData[];
  labels: string[];
}

export default function MainGraph({ data, labels }: MainGraphProps) {
  const series: any[] = data.map((d) => ({
    name: capitalize(d.zone_name),
    type: d.type,
    data: d.data,
  }));

  const options = {
    chart: {
      toolbar: {
        show: true,
        tools: {
          zoom: false,
          selection: true,
          download: false,
          reset: false,
          pan: false,
        },
      },
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      fontSize: `${convertRemToPixels(1)}px`,
      position: 'bottom',
      horizontalAlign: 'center',
      onItemClick: {
        toggleDataSeries: false,
      },
    },
    stroke: {
      width: 2,
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'datetime',
      categories: labels,
      labels: {
        show: true,
        rotate: -30,
        datetimeUTC: false,
        hideOverlappingLabels: true,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter(value: number) {
          return `${value.toFixed(2)} MW`;
        },
      },
    },
  };

  return (
    <Flex
      w="100vw"
      overflow="hidden"
      pb="4rem"
      h="100vh"
      pt="10rem"
      bgColor="sldcBlack"
      color="sldcWhite"
      justify="center"
      align="center"
    >
      <Box
        w="60vw"
        color="#000"
        border="2px solid #36b5d8"
        bgColor="#262A33"
        padding="1rem 4rem"
        borderRadius="10px"
      >
        <Chart series={series} type="area" options={options} />
      </Box>
    </Flex>
  );
}
