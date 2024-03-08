import React, { useState, useEffect } from 'react';
import SidebarThree from './components/Sidebar';
import Loader from './components/Loader';
import Chart from './components/Chart';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

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
    <div className="flex">
      <SidebarThree handleChartTypeChange={handleChartTypeChange} />
      <div className="flex-1">
        <div className="dropdown-container">
          <FormControl fullWidth>
            <InputLabel id="region-select-label">Select Region</InputLabel>
            <Select
              labelId="region-select-label"
              id="region-select"
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
        <div className="filter-container">
          <Button variant="contained" onClick={() => handleFilterChange('1yr')}>1 Year</Button>
          <Button variant="contained" onClick={() => handleFilterChange('6yr')}>6 Years</Button>
          <Button variant="contained" onClick={() => handleFilterChange('all')}>All Times</Button>
          <FormControl>
            <TextField
              label="Custom Year"
              type="number"
              value={customYear || ''}
              onChange={handleCustomYearChange}
            />
            <Button variant="contained" onClick={() => handleFilterChange('custom')}>Apply</Button>
          </FormControl>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {data.length === 0 ? (
              <div className=' w-full h-full flex justify-center items-center flex-col'>
                <h1 className="mt-3 text-6xl font-semibold text-gray-800 md:text-3xl">
                404 error
                </h1>
                <p className="mt-4 text-gray-500">
                  Sorry, the data you are looking for doesn&#x27;t exist.
                </p>
              </div>
            ) : (
              <Chart data={data} chartType={chartType} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
