// import { useAuth } from '@/context/authContext.tsx';
import { useEffect, useRef, useState } from 'react';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import capitalize from '../utils/capitalize';
// import { Skeleton } from '@/components/ui/skeleton.tsx';
import * as Plot from '@observablehq/plot';
import { format } from 'date-fns';
import GraphLegend from './GraphLegend';
// import { Switch } from '@/components/ui/switch.tsx';
// import { useTheme } from '@/context/themeContext.tsx';
import { DateTime } from 'luxon';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table.tsx';
// import getJWTCookie from '@/utils/getJWTCookie';

const screenWidth = window.screen.width;
const baseURL = 'http://localhost:5000';
const BLOCKS = 96;

export default function Home() {
//   const auth = useAuth();
//   const themeContext = useTheme();
  const [zoneMap, setZoneMap] = useState<{ string: string }>({});
//   const [zone, setZone] = useState(auth.zone_id);
  const [loading, setLoading] = useState(true);
  const [demand, setDemand] = useState([]);
  const graphRef = useRef();
  const [actualLoadPointed, setActualLoadPointed] = useState(0);
  const [toggleMin, setToggleMin] = useState(false);
  const [toggleMax, setToggleMax] = useState(false);
  const actualMin = useRef<number>(99999999);
  const actualMax = useRef<number>(0);
  const [dayAheadPointed, setDayAheadPointed] = useState<number | undefined>(null);
  const [actualLoadHover, setActualLoadHover] = useState<boolean>(false);
  const [dayAheadHover, setDayAheadHover] = useState<boolean>(false);
  const [dayAheadDisabled, setDayAheadDisabled] = useState<boolean>(false);
//   const latestIndex = useRef<number>(auth.zone_id);

//   useEffect(() => {
//     fetch('http://localhost:5000/zone', {
//       mode: 'cors',
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setZoneMap(data);
//         setLoading(false);
//         Object.keys(data).map((key) => {
//           if (data[key].toLowerCase() === 'total') {
//             setZone(key);
//           }
//         });
//       });
//   }, []);

  useEffect(() => {
    const now = DateTime.now().setZone('Asia/Kolkata');
    const start = now.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    const end = now.set({
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    });

    const acutalLoadFetch = fetch(
      `${baseURL}/data/load?start=${start.toUTC().toISO()}&end=${end.toUTC().toISO()}&zone=${zone}`,
      {
        mode: 'cors',
        headers: {
          Authorization: getJWTCookie(document.cookie),
        },
      }
    );
    const dayAheadFetch = fetch(
      `${baseURL}/data/forecast/dayAhead?start=${start.plus({ hours: 24 }).toUTC().toISO()}&end=${end.plus({ hours: 24 }).toUTC().toISO()}&zone=${zone}`,
      {
        mode: 'cors',
        headers: {
          Authorization: getJWTCookie(document.cookie),
        },
      }
    );

    function fetchDemand() {
      Promise.all([acutalLoadFetch, dayAheadFetch])
        .then((res) => Promise.all(res.map((r) => r.json())))
        .then((data) => {
          const [actualData, dayAheadData] = data;

          const values = [];
          actualMin.current = 999999;
          actualMax.current = 0;
          latestIndex.current = -1;

          for (let i = 0; i < BLOCKS; i++) {
            values.push({
              time: DateTime.fromISO(actualData[i].time)
                .setZone('Asia/Kolkata')
                .toISO(),
              actual: actualData[i].value,
              dayAhead: dayAheadData[i].value,
            });

            actualMin.current = Math.min(
              actualMin.current,
              actualData[i].value || 999999
            );
            actualMax.current = Math.max(
              actualMax.current,
              actualData[i].value || 0
            );
            latestIndex.current = actualData[i].value ? i : latestIndex.current;
          }

          setDemand(values);
          setActualLoadPointed(
            latestIndex.current > -1
              ? values[latestIndex.current].actual
              : undefined
          );
        })
        .catch((err) => console.log(err));
    }

    fetchDemand();

    const interval = setInterval(fetchDemand, 60000);

    return () => clearInterval(interval);
  }, [zone]);

  useEffect(() => {
    if (!demand) {
      return;
    }

    const plot = Plot.plot({
      height: 500,
      width: Math.max(500, screenWidth - 100),
      marginLeft: 50,
      marginTop: 25,
      x: {
        type: 'time',
        ticks: screenWidth - 100 > 800 ? '1 hours' : '2 hours',
        tickFormat: '%H:%M',
      },
      marks: [
        Plot.axisY({ label: 'Load (MW)' }),
        Plot.gridY({ strokeDasharray: '3', strokeOpacity: 0.5 }),
        Plot.areaY(demand, {
          x: 'time',
          y: 'actual',
          fill: 'steelblue',
          fillOpacity: actualLoadHover ? 0.4 : dayAheadHover ? 0.05 : 0.2,
        }),
        Plot.lineY(demand, {
          x: 'time',
          y: 'actual',
          stroke: 'steelblue',
          strokeOpacity: actualLoadHover ? 1 : dayAheadHover ? 0.4 : 0.8,
        }),
        dayAheadDisabled
          ? null
          : Plot.lineY(demand, {
              x: 'time',
              y: 'dayAhead',
              stroke: themeContext.theme === 'dark' ? 'white' : '#000000',
              strokeOpacity: dayAheadPointed ? 1 : actualLoadHover ? 0.4 : 0.8,
            }),
        Plot.ruleX(
          demand,
          Plot.pointerX({
            x: 'time',
            stroke: 'green',
            strokeWidth: 3,
          })
        ),
        Plot.textX(
          demand,
          Plot.pointerX({
            x: 'time',
            dy: -5,
            frameAnchor: 'bottom',
            fontSize: 15,
            text: (d) => format(d.time, 'HH:mm'),
          })
        ),
        toggleMin
          ? Plot.ruleX(demand, {
              x: 'time',
              y: 'actual',
              filter: (d) => d.actual === actualMin.current,
              stroke: 'yellow',
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
              stroke: 'orange',
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

    graphRef.current.append(plot);

    plot.addEventListener('input', (e) => {
      if (plot.value) {
        setActualLoadPointed(plot.value.actual);
        setDayAheadPointed(dayAheadDisabled ? undefined : plot.value.dayAhead);
      } else {
        setActualLoadPointed(
          latestIndex.current > -1
            ? demand[latestIndex.current].actual
            : undefined
        );
        setDayAheadPointed(undefined);
      }
    });

    return () => plot.remove();
  }, [
    demand,
    toggleMin,
    toggleMax,
    zone,
    themeContext.theme,
    actualLoadHover,
    dayAheadHover,
    dayAheadDisabled,
  ]);

  const skeleton = (
    <div className="flex flex-col gap-4 mx-4">
      <Skeleton className="w-[40vw] h-[5rem]" />
      <Skeleton className="w-[90] h-[75vh]" />
    </div>
  );

  const zoneOption =
    auth.isAdmin && !loading ? (
      <Tabs
        defaultValue={String(zone)}
        onValueChange={(v) => setZone(parseInt(v))}
      >
        <TabsList>
          {Object.keys(zoneMap).map((key) => (
            <TabsTrigger value={key} key={key}>
              {capitalize(zoneMap[key])}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    ) : (
      <div className={'text-xl font-medium'}>
        {capitalize(zoneMap[auth.zone_id] + ' DEMAND' || 'loading')}
      </div>
    );

  if (loading && !zoneMap) {
    return skeleton;
  }

  return (
    <div className="flex flex-col px-2 gap-4 ml-4 mt-4">
      {zoneOption}
      <div className="flex gap-[50vw] ml-4">
        <div className="flex">
          <GraphLegend
            text={'Actual demand'}
            value={actualLoadPointed}
            unit={'MW'}
            color={'steelblue'}
            setHovered={setActualLoadHover}
          />
          <GraphLegend
            text={'Day ahead'}
            value={dayAheadPointed}
            unit={'MW'}
            color={themeContext.theme === 'dark' ? 'white' : '#000000'}
            setHovered={setDayAheadHover}
            disabled={dayAheadDisabled}
            setDisabled={setDayAheadDisabled}
          />
        </div>

        {/* min max group*/}
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <Switch
              value={toggleMin}
              onCheckedChange={() => setToggleMin(!toggleMin)}
            />
            min
          </div>
          <div className="flex items-center gap-2">
            <Switch
              value={toggleMax}
              onCheckedChange={() => setToggleMax(!toggleMax)}
            />
            max
          </div>
        </div>
        {/*  min max group end*/}
      </div>

      <div ref={graphRef} className={'width-full'} />

      <div className={'flex justify-around gap-4 mt-8 mb-4 justify-center'}>
        <div className={'border-2 rounded pt-1 px-1'}>
          <h2 className={'text-center'}>Today's Demand</h2>
          <Table containerClassName={'max-h-[40vh] w-[60vw]'}>
            <TableHeader className={'sticky'}>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Actual (MW)</TableHead>
                <TableHead>Forecast (MW)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demand.map((d) => (
                <TableRow key={d.time}>
                  <TableCell>{format(new Date(d.time), 'HH:mm')}</TableCell>
                  <TableCell>{d.actual ? d.actual : '-'}</TableCell>
                  <TableCell>{d.dayAhead ? d.dayAhead : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className={'border-2 rounded pt-1 px-1'}>
          <h2 className={'text-center'}>Hour Ahead Forecast</h2>
          <Table containerClassName={'w-[30vw]'}>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>{capitalize(zoneMap[zone] || '')}</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </div>
    </div>
  );
}