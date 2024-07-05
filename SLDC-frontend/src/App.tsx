import React, { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import OutlineGraph from './graphs/OutlineGraph';
import MainGraph from './graphs/MainGraph';
import { outlineData } from './tempData/outlineData';
import { mainData, labels } from './tempData/mainData';
import DailyReport from './graphs/DailyReport';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import ResetPassword from './pages/Reset';

const App = (): JSX.Element => {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mainGraph"
          element={<MainGraph data={mainData} labels={labels} />}
        />
        <Route path="/dailyReport" element={<DailyReport />} />
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
        <Route path="/forgotPassword" element={<ResetPassword />} />
      </Routes>
    </>
  );
};
export default App;
