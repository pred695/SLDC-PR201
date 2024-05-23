import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';

const App = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<Login />} />
      </Routes>
    </>
  );
};
export default App;
