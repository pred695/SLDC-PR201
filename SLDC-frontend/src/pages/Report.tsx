import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import useCompareStore from '../components/Store/CompareStore';
import { useForecastDataStore } from '../components/Store/ForecastData';
import MyTableHourlyAllzones from '../components/tablesHourlyLoadAllzones';
import MyTableTotal from '../components/tablesTotalLoad';
import DailyReport from '../graphs/DailyReport';

const Report = () => {
  const compare = useCompareStore((state) => state.compare);
  const { demand, getForecastData } = useForecastDataStore();
  const pdfRef = useRef(null);

  useEffect(() => {
    getForecastData();
  }, [getForecastData]);

  const downloadPDF = () => {
    const input = pdfRef.current;
    setExpandTable(true);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: 'a4',
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('report.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        setExpandTable(false);
      });
    setExpandTable(false);
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      demand.map((item) => ({
        Timestamp: new Date(item.time).toUTCString(),
        'East Side': item.actual,
        'West Side': '',
        'Central Side': '',
        Railways: '',
        Total: '',
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'report.xlsx');
  };

  return (
    <Flex
      direction="column"
      align="center"
      pt="6rem"
      bg="sldcBlack"
      className="pdf-section"
    >
      <Flex
        justify="space-between"
        align="center"
        w="full"
        mt="5rem"
        color="sldcWhite"
        px="2rem"
      >
        <Flex align="center" gap={10}>
          <Flex align="center" gap={3}>
            <Text fontSize="1.1rem">Period:</Text>
            <Select
              placeholder="Select Period"
              bg="sldcWhite"
              color="sldcBlack"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </Select>
          </Flex>
          <Flex align="center" gap={3}>
            <Text fontSize="1.1rem">Region:</Text>
            <Select
              placeholder="Select Region"
              bg="sldcWhite"
              color="sldcBlack"
            >
              <option value="nodl">NODL</option>
              <option value="sodl">SODL</option>
              <option value="eodl">EODL</option>
              <option value="wodl">WODL</option>
            </Select>
          </Flex>
        </Flex>
        <Flex>
          <Menu>
            <MenuButton as={Button}>Generate Report</MenuButton>
            <MenuList
              alignContent="center"
              px="3rem"
              bg="sldcGray"
              border="none"
            >
              <MenuItem
                as={Button}
                textAlign="center"
                my={2}
                bg="sldcBlack"
                _hover={{ color: 'sldcBlack' }}
                onClick={downloadPDF}
              >
                PDF
              </MenuItem>
              <MenuItem
                as={Button}
                textAlign="center"
                my={2}
                bg="sldcBlack"
                _hover={{ color: 'sldcBlack' }}
                onClick={downloadExcel}
              >
                Excel
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Stack
        color="sldcWhite"
        align="center"
        bg="sldcBlack"
        mb="5rem"
        ref={pdfRef}
      >
        {demand ? (
          <Flex>
            <Box>
              <DailyReport />
            </Box>
            {compare && (
              <Box>
                <DailyReport />
              </Box>
            )}
          </Flex>
        ) : (
          <Box>Loading...</Box>
        )}
        <Flex>
          <Box px="2rem" pt="2rem">
            <MyTableHourlyAllzones />
          </Box>
          {compare && (
            <Box width={{ base: '100%', md: '40%' }} p="2rem">
              <MyTableTotal />
            </Box>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Report;
