import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Chart from './components/Chart';
import { Button,  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import StatisticalData from './components/StatisticalData';
import YearlyChart from './components/YearlyChart';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';



const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chartType, setChartType] = useState<string>('PeakDemand');
  const [selectedRegion, setSelectedRegion] = useState<string>('Himachal');
  const [filterType, setFilterType] = useState<string>('all');
  const [customYear, setCustomYear] = useState<number | null>(null);

  useEffect(() => {
    fetchData(selectedRegion);
  }, [selectedRegion, filterType, customYear]);

  const fetchData = async (region: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/${region}.json`);
      const jsonData = await response.json();
      let filteredData = jsonData;
      if (filterType === '1yr') {
        filteredData = filterByLastNYears(jsonData, 1);
      } else if (filterType === '6yr') {
        filteredData = filterByLastNYears(jsonData, 6);
      } else if (filterType === 'custom' && customYear) {
        filteredData = filterByCustomYear(jsonData, customYear);
      }
      setData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const filterByLastNYears = (data: any[], n: number) => {
    const currentYear = new Date().getFullYear();
    const filteredData = data.filter(item => {
      const itemYear = new Date(item.Date).getFullYear();
      if (n === 1) {
        return itemYear === currentYear - 1;
      } else if (n === 6) {
        return itemYear >= currentYear - n && itemYear < currentYear;
      }
      return true; // Return all data if not filtering by 1 or 6 years
    });
    return filteredData;
  };

  const filterByCustomYear = (data: any[], year: number) => {
    const filteredData = data.filter(item => new Date(item.Date).getFullYear() === year);
    return filteredData;
  };

  const handleChartTypeChange = (type: string) => {
    setChartType(type);
  };

  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    const region = event.target.value;
    setSelectedRegion(region);
  };

  const handleFilterChange = (type: string) => {
    setFilterType(type);
  };

  useEffect(() => {
    if (filterType !== 'custom') {
      setCustomYear(null); // Reset customYear state if type is not 'custom'
    }
  }, [filterType]);

  const handleCustomYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value);
    setCustomYear(isNaN(year) ? null : year);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar handleChartTypeChange={handleChartTypeChange} />
        <div className="flex-1">
          <div className='flex w-full justify-around border md:px-4 items-center space-x-2 py-5 bg-gray-100 p-10 rounded-md'>
            <div className="dropdown-container w-40 h-12 items-center">
              <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <MenuItem value="Himachal">Himachal</MenuItem>
                  <MenuItem value="Karnataka">Karnataka</MenuItem>
                  <MenuItem value="Maharastra">Maharastra</MenuItem>
                  <MenuItem value="WestBengal">West Bengal</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="filter-container flex gap-4 h-12 ">
              {/* <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                  onClick={() => handleFilterChange('1yr')}
                >
                  1 Year
                </Button>
                <Button
                  onClick={() => handleFilterChange('6yr')}
                >
                  6 Years
                </Button>
                <Button
                  onClick={() => handleFilterChange('all')}
                >
                  All Times
                </Button>
              </ButtonGroup> */}
              <div className='flex items-center gap-4'>
                <TextField
                  label="Custom Year"
                  type="number"
                  value={customYear || ''}
                  onChange={handleCustomYearChange}
                  className='rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                />
                <Button variant='outlined' onClick={() => handleFilterChange('custom')}>Apply</Button>
              </div>

            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <>
              {data.length === 0 ? (
                <div className=' w-full h-full flex justify-center items-center flex-col'>
                  <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
                    404
                  </h1>
                  <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
                    Sorry, the data you are looking for doesn&#x27;t exist.
                  </p>
                </div>
              ) : (
                <div className='p-8'>
                  <StatisticalData data={data} />
                  <div className="flex w-full gap-4 items-center justify-around mt-8">
                    <div className='w-[700px]'>
                    <Chart data={data} chartType={chartType} />
                    </div>
                    <YearlyChart data={data} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
