import { LegacyRef, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import GraphLegend from './GraphLegend';
import * as Plot from '@observablehq/plot';
import { Flex } from '@chakra-ui/react';

const screenWidth = window.screen.width;

export default function DailyReport() {
  const generateData = () => {
    const data = [];
    const now = new Date();
    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() + i * 3600000).toISOString();
      const actual = Math.floor(Math.random() * 100) + 150;
      const forecast = actual - Math.floor(Math.random() * 10);
      data.push({ time, actual, forecast });
    }
    return data;
  };
  const [demand, setDemand] = useState<{ time: string; actual: number; forecast: number; }[]>([]);

  const graphRef = useRef<HTMLDivElement>(null);
  const [actualLoadPointed, setActualLoadPointed] = useState<number>(0);
  const [forecastPointed, setForecastPointed] = useState<number>(0);
  const [error, setError] = useState<number | undefined>();

  useEffect(() => {
    setDemand(() => generateData());
    if (!demand.length) {
      return;
    }
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
            stroke: 'green',
            strokewidth: '20px',
          })
        ),
        Plot.textX(
          demand,
          Plot.pointerX({
            x: 'time',
            dy: -5,
            frameAnchor: 'bottom',
            fontSize: 15,
            text: (d) => format(new Date(d.time), 'HH:mm'),
          })
        ),
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
  }, [demand]);

  const legends = (
    <div className={'flex'}>
      <GraphLegend
        text={'Actual demand'}
        value={actualLoadPointed}
        unit={'MW'}
        color={'steelblue'}
      />
      <GraphLegend
        text={'Forecast'}
        value={forecastPointed}
        unit={'MW'}
        color={'black'}
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

  return (
    <Flex direction={'column'} mx={'375px'} mt={'150px'} mb={'50px'} w={'60%'}>
      <Flex>Daily Report</Flex>
      <Flex>{legends}</Flex>
      <Flex ref={graphRef as LegacyRef<HTMLDivElement>} />
      <Flex>
        Error rate: {error ? error : '-'}%
      </Flex>
    </Flex>
  );
}
