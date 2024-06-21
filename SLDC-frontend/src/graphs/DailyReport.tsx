import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import * as Plot from '@observablehq/plot';
import { Flex, Button, Input } from '@chakra-ui/react';
import useCompareStore from '../components/Store/CompareStore';
import GraphLegend from './GraphLegend';
import { DemandData } from '../types/demandData';
import { useForecastDataStore } from '../components/Store/ForecastData';

const screenWidth = window.screen.width;

export default function DailyReport() {
  const compare = useCompareStore((state) => state.compare);
  const setCompare = useCompareStore((state) => state.toggle);
  const { demand } = useForecastDataStore();
  const [filteredDemand, setFilteredDemand] = useState(demand);
  const [toggleMin, setToggleMin] = useState(false);
  const [toggleMax, setToggleMax] = useState(false);
  const actualMin = useRef<number | undefined>(undefined);
  const actualMax = useRef<number>(0);
  const [minTime, setMinTime] = useState<string | null>(null);
  const [maxTime, setMaxTime] = useState<string | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [actualLoadPointed, setActualLoadPointed] = useState<number>(0);
  const [forecastPointed, setForecastPointed] = useState<number>(0);
  const [error, setError] = useState<number | undefined>();

  const filterLast24HoursData = (data: DemandData[], startingDate?:string, endingDate?:string) => {
    const endDate = startingDate || new Date("2023-06-01T00:00:00.000Z").toISOString();
    const startDate = endingDate || new Date(new Date("2023-06-01T00:00:00.000Z").getTime() - 24 * 60 * 60 * 1000).toISOString();
    return data.filter((item) => item.time >= startDate && item.time <= endDate);
  };

  const fetchData = async () => {
      const filteredData = filterLast24HoursData(demand);
      setFilteredDemand(filteredData);
  
      if (filteredData.length === 0) {
        return;
      }
  };

  useEffect(() => {
    fetchData();
  }, [demand]);

  useEffect(() => {
    if (!graphRef.current) {
      return;
    }
    const plot = Plot.plot({
      height: 500,
      width: Math.max(500, screenWidth - 100),
      marginLeft: 50,
      marginTop: 25,
      x: {
        type: 'time',
      },
      marks: [
        Plot.axisY({ label: 'Load (MW)' }),
        Plot.gridY({ strokeDasharray: '3', strokeOpacity: 0.5 }),
        Plot.areaY(filteredDemand, {
          x: 'time',
          y: 'actual',
          fill: 'steelblue',
          fillOpacity: 0.2,
        }),
        Plot.lineY(filteredDemand, {
          x: 'time',
          y: 'actual',
          stroke: 'steelblue',
          strokeOpacity: 0.8,
        }),
        Plot.lineY(filteredDemand, {
          x: 'time',
          y: 'forecast',
          stroke: 'green',
        }),
        Plot.ruleX(
          filteredDemand,
          Plot.pointerX({
            x: 'time',
            stroke: 'blue',
            strokewidth: 2,
          })
        ),
        Plot.textX(
          filteredDemand,
          Plot.pointerX({
            x: 'time',
            dy: -10,
            frameAnchor: 'top',
            fontSize: 20,
            text: (d) => format(new Date(d.time), 'HH:mm'),
          })
        ),
        toggleMin
          ? Plot.ruleX(filteredDemand, {
              x: 'time',
              y: 'actual',
              filter: (d) => d.actual === actualMin.current,
              stroke: 'steelblue',
              strokeWidth: 2,
            })
          : null,
        toggleMin
          ? Plot.text(filteredDemand, {
              x: 'time',
              y: 'actual',
              filter: (d) => d.actual === actualMin.current,
              text: (d) => d.actual,
              fontSize: 15,
              lineAnchor: 'bottom',
              dy: -15,
            })
          : null,
        toggleMin
          ? Plot.textX(filteredDemand, {
              x: 'time',
              dy: -5,
              fontSize: 15,
              text: (d) => format(d.time, 'HH:mm'),
              filter: (d) => d.actual === actualMin.current,
              frameAnchor: 'bottom',
            })
          : null,
        toggleMax
          ? Plot.ruleX(filteredDemand, {
              x: 'time',
              y: 'actual',
              filter: (d) => d.actual === actualMax.current,
              stroke: 'green',
              strokeWidth: 2,
            })
          : null,
        toggleMax
          ? Plot.text(filteredDemand, {
              x: 'time',
              y: 'actual',
              filter: (d) => d.actual === actualMax.current,
              text: (d) => d.actual,
              fontSize: 15,
              lineAnchor: 'bottom',
              dy: -10,
            })
          : null,
        toggleMax
          ? Plot.textX(filteredDemand, {
              x: 'time',
              dy: -5,
              fontSize: 15,
              text: (d) => format(d.time, 'HH:mm'),
              filter: (d) => d.actual === actualMax.current,
              frameAnchor: 'bottom',
            })
          : null,
      ],
    });
    graphRef.current.append(plot);

    plot.addEventListener('input', () => {
      if (plot.value) {
        setActualLoadPointed(plot.value.actual);
        setForecastPointed(plot.value.forecast);
      }
    });

    return () => {
      plot.remove();
      if (graphRef.current) {
        graphRef.current.innerHTML = '';
      }
    };
  }, [
    filteredDemand,
    toggleMin,
    toggleMax,
  ]);

  const legends = (
    <div className="flex">
      <GraphLegend
        text="Actual demand"
        value = {Number(actualLoadPointed.toFixed(3))}
        unit="MW"
        color="steelblue"
      />
      <GraphLegend
        text="Forecast"
        value={Number(forecastPointed.toFixed(3))}
        unit="MW"
        color="black"
      />
    </div>
  );

  useEffect(() => {
    if (filteredDemand.length) {
      let minPoint = filteredDemand[0];
      let maxPoint = filteredDemand[0];

      filteredDemand.forEach((point: DemandData) => {
        if (point.actual < minPoint.actual) {
          minPoint = point;
        }
        if (point.actual > maxPoint.actual) {
          maxPoint = point;
        }
      });

      setMinTime(minPoint.time);
      setMaxTime(maxPoint.time);

      let sum = 0;
      let e = 0;

      filteredDemand.forEach((data) => {
        sum += data.actual || 0;
        if (data.actual != null && data.forecast != null) {
          e += Math.abs(data.actual - data.forecast);
        }
      });

      e = (e / sum) * 100;
      e = Math.round(e * 100) / 100;
      setError(e);
    }
  }, [filteredDemand]);

  const handleMinClick = () => {
    setToggleMin(!toggleMin);
    if (minTime) {
      const minPoint = demand.find((d) => d.time === minTime);
      if (minPoint) {
        actualMin.current = minPoint.actual;
        setActualLoadPointed(minPoint.actual);
        setForecastPointed(minPoint.forecast);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const datetime = e.target.value;
    const endTime = new Date(datetime).toISOString();
    const startTime = new Date(new Date(datetime).getTime() + 24 * 60 * 60 * 1000).toISOString();
    const filteredData = filterLast24HoursData(demand, startTime, endTime);
    setFilteredDemand(filteredData);
  }

  const handleMaxClick = () => {
    setToggleMax(!toggleMax);
    if (maxTime) {
      const maxPoint = demand.find((d) => d.time === maxTime);
      if (maxPoint) {
        actualMax.current = maxPoint.actual;
        setActualLoadPointed(maxPoint.actual);
        setForecastPointed(maxPoint.forecast);
      }
    }
  };

  return (
    <Flex direction={'column'} mx={'375px'} mt={'150px'} mb={'50px'} w={compare ? '50%' : '60%'} zIndex={"0"} pos={"relative"}>
      <Flex>Daily Report</Flex>
      <Flex justify="space-between">
        {legends}
        <Flex>
          <Input onChange={handleChange} placeholder='Select Date and Time' size='md' type='datetime-local' bg={'#333'} />
        </Flex>
        <Flex gap={'10px'}>
          <Button onClick={handleMinClick}>Min</Button>
          <Button onClick={handleMaxClick}>Max</Button>
          <Button onClick={setCompare}>Compare</Button>
        </Flex>
      </Flex>
      <Flex ref={graphRef as LegacyRef<HTMLDivElement>} />

      <Flex>Error rate: {error || '-'}%</Flex>
    </Flex>
  );
}