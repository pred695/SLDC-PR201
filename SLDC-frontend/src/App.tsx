import { Route, Routes } from 'react-router-dom';
import { Box, Heading, Center } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import MyTableHourly from './components/tablesHourlyLoad';
import MyTableTotal from './components/tablesTotalLoad';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Box>
        <Center>
          <Heading>Project Setup Done!</Heading>
          <MyTableHourly />
          <MyTableTotal />
        </Center>
      </Box>
      <Routes>
        <Route path="/signin" element={<Login />} />
      </Routes>
    </>
  );
};
export default App;
