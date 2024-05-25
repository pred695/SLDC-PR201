import { Route, Routes } from 'react-router-dom';
// import { Box, Heading, Center } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import AreaChart from 'react-apexcharts';
import OutlineGraph from './graphs/OutlineGraph';
// import MyTableHourly from './components/tablesHourlyLoad';
// import MyTableTotal from './components/tablesTotalLoad';
import MainGraph from './graphs/MainGraph';
import { outlineData } from './tempData/outlineData';
import { mainData, labels } from './tempData/mainData';
// import MyTableHourlyAllzones from './components/tablesHourlyLoadAllzones';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {/* <Box>
        <Center>
          <Heading>Project Setup Done!</Heading>
          <MyTableHourly />
          <MyTableTotal />
          <MyTableHourlyAllzones />
        </Center>
      </Box> */}
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route
          path="/mainGraph"
          element={
            <MainGraph
          data={mainData}
          labels={labels}
        />
          }
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
