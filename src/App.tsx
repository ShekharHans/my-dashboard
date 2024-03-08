import React, { useState, useEffect } from 'react';
import SidebarThree from './components/Sidebar';
import Loader from './components/Loader';
import Chart from './components/Chart';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chartType, setChartType] = useState<string>('PeakDemand');

  useEffect(() => {
    // Simulate fetching data from JSON file
    const fetchData = async () => {
      try {
        const response = await fetch('/Himachal.json');
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChartTypeChange = (type: string) => {
    setChartType(type);
  };

  return (
    <div className="flex">
      <SidebarThree handleChartTypeChange={handleChartTypeChange} />
      <div className="flex-1">
        {loading ? (
          <Loader />
        ) : (
          <Chart data={data} chartType={chartType} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
