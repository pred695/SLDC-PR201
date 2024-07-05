import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DailyReport from './graphs/DailyReport';
import MainGraph from './graphs/MainGraph';
import OutlineGraph from './graphs/OutlineGraph';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Report from './pages/Report';
import ResetPassword from './pages/Reset';
import Signup from './pages/Signup';
import { labels, mainData } from './tempData/mainData';
import { outlineData } from './tempData/outlineData';

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
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
  );
};
export default App;
