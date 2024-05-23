import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { Box, Heading, Center } from '@chakra-ui/react';
import MyTableHourly from './Components/tablesHourlyLoad';
import MyTableTotal from './Components/tablesTotalLoad';

const App = (): JSX.Element => {
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
