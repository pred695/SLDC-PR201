import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import * as Plot from '@observablehq/plot';
import { Flex, Button, Input } from '@chakra-ui/react';
import useStore from '../store/store';
import GraphLegend from './GraphLegend';

const screenWidth = window.screen.width;

interface DemandData {
  time: string;
  actual: number;
  forecast: number;
}

export default function DailyReport() {
  const generateData = (selected?: string): DemandData[] => {
    const data: DemandData[] = [];
    const now = new Date();
    if(selected){
      now.setHours(Number(selected.split(':')[0]));
      now.setMinutes(Number(selected.split(':')[1]));
    }
    
    for (let i = 0; i < 24; i++) {
      let time = new Date(now.getTime() - i * 3600000).toISOString();
      if (selected) {
        time = new Date(now.getTime() + i * 3600000).toISOString();
      }
      const actual = Math.floor(Math.random() * 100) + 150;
      const forecast = actual - Math.floor(Math.random() * 10);
      data.push({ time, actual, forecast });
    }
    return data;
  };
  const compare = useStore((state) => state.compare);
  const setCompare = useStore((state) => state.toggle);
  const [demand, setDemand] = useState<DemandData[]>([]);
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
  const [plotInstance, setPlotInstance] = useState<HTMLElement | SVGSVGElement | null>(null);

  useEffect(() => {
    const data = generateData();
    setDemand(data);

    if (data.length === 0) {
      return;
    }
    let minPoint = data[0];
    let maxPoint = data[0];

    data.forEach((point) => {
      if (point.actual < minPoint.actual) {
        minPoint = point;
      }
      if (point.actual > maxPoint.actual) {
        maxPoint = point;
      }
    });

    setMinTime(minPoint.time);
    setMaxTime(maxPoint.time);
  }, []);

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
        Plot.areaY(demand, {
          x: 'time',
          y: 'actual',
          fill: 'steelblue',
          fillOpacity: 0.2,
        }),
        Plot.lineY(demand, {
          x: 'time',
          y: 'actual',
          stroke: 'steelblue',
          strokeOpacity: 0.8,
        }),
        Plot.lineY(demand, {
          x: 'time',
          y: 'forecast',
          stroke: '#000000',
        }),
        Plot.ruleX(
          demand,
          Plot.pointerX({
            x: 'time',
            stroke: 'blue',
            strokewidth: 2,
          })
        ),
        Plot.textX(
          demand,
          Plot.pointerX({
            x: 'time',
            dy: -10,
            frameAnchor: 'top',
            fontSize: 20,
            text: (d) => format(new Date(d.time), 'HH:mm'),
          })
        ),
        toggleMin
          ? Plot.ruleX(demand, {
              x: 'time',
              y: 'actual',
              filter: (d) => d.actual === actualMin.current,
              stroke: 'steelblue',
              strokeWidth: 2,
            })
          : null,
        toggleMin
          ? Plot.text(demand, {
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
          ? Plot.textX(demand, {
              x: 'time',
              dy: -5,
              fontSize: 15,
              text: (d) => format(d.time, 'HH:mm'),
              filter: (d) => d.actual === actualMin.current,
              frameAnchor: 'bottom',
            })
          : null,
        toggleMax
          ? Plot.ruleX(demand, {
              x: 'time',
              y: 'actual',
              filter: (d) => d.actual === actualMax.current,
              stroke: 'green',
              strokeWidth: 2,
            })
          : null,
        toggleMax
          ? Plot.text(demand, {
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
          ? Plot.textX(demand, {
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
    setPlotInstance(plot);
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
  }, [demand,
    toggleMin,
    toggleMax,
  ]);

  const legends = (
    <div className="flex">
      <GraphLegend
        text="Actual demand"
        value={actualLoadPointed}
        unit="MW"
        color="steelblue"
      />
      <GraphLegend
        text="Forecast"
        value={forecastPointed}
        unit="MW"
        color="black"
      />
    </div>
  );

  useEffect(() => {
    if (demand.length) {
      let sum = 0;
      let e = 0;

      demand.forEach((data) => {
        sum += data.actual || 0;
        if (data.actual != null && data.forecast != null) {
          e += Math.abs(data.actual - data.forecast);
        }
      });

      e = (e / sum) * 100;
      e = Math.round(e * 100) / 100;
      setError(e);
    }
  }, [demand]);

const handleMinClick = () => {
  setToggleMin(!toggleMin);
  if (minTime && plotInstance) {
    const minPoint = demand.find((d) => d.time === minTime);
    if (minPoint) {
      actualMin.current = minPoint.actual;
      setActualLoadPointed(minPoint.actual);
      setForecastPointed(minPoint.forecast);
    }
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    console.log(time.split('T')[1].slice(0, 5));
    const data = generateData(time.split('T')[1].slice(0, 5));
    setDemand(data);
  }

  const handleMaxClick = () => {
    setToggleMax(!toggleMax);
    if (maxTime && plotInstance) {
      const maxPoint = demand.find((d) => d.time === maxTime);
      if (maxPoint) {
        actualMax.current = maxPoint.actual;
        setActualLoadPointed(maxPoint.actual);
        setForecastPointed(maxPoint.forecast);
      }
    }
  };

  return (
    <Flex direction={'column'} mx={'375px'} mt={'150px'} mb={'50px'} w={compare?'50%':'60%'} zIndex={"0"} pos={"relative"}>
      <Flex>Daily Report</Flex>
      <Flex justify="space-between">
        {legends}
        <Flex>
          <Input onChange={handleChange} placeholder='Select Date and Time' size='md' type='datetime-local'  bg={'#333'}/>
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
