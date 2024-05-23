import { Box, Heading, Center } from '@chakra-ui/react';
import MyTableHourly from './Components/tablesHourlyLoad';
import MyTableTotal from './Components/tablesTotalLoad';

const App = (): JSX.Element => {
  return (
    <Box>
      <Center>
        <Heading>Project Setup Done!</Heading>
        <MyTableHourly/>
        <MyTableTotal/>
      </Center>
    </Box>
  );
};
export default App;
