import { Route, Routes } from 'react-router-dom';
import { Box, Center, VStack } from '@chakra-ui/react';
import AreaChart from 'react-apexcharts';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import OutlineGraph from './graphs/OutlineGraph';
import MyTableHourly from './components/tablesHourlyLoad';
import MyTableTotal from './components/tablesTotalLoad';
import MainGraph from './graphs/MainGraph';
import { outlineData } from './tempData/outlineData';
import { mainData, labels } from './tempData/mainData';
import MyTableHourlyAllzones from './components/tablesHourlyLoadAllzones';
import Homepage from './pages/Homepage';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/mainGraph"
          element={<MainGraph data={mainData} labels={labels} />}
        />
        <Route
          path="/outlineGraph"
          element={
            <OutlineGraph
              data={outlineData}
              color="#36b5d8"
              gradientColor="#36b5d8"
            />
          }
        />
      </Routes>
    </>
  );
};
export default App;
