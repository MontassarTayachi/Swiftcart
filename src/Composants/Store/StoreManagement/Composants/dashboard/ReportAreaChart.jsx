import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { API_BASE_URL } from '../../../../../config';

// chart options


// ==============================|| REPORT AREA CHART ||============================== //

const ReportAreaChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const areaChartOptions = {
    chart: {
      height: 340,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1.5
    },
    grid: {
      strokeDashArray: 4
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-05-19T00:00:00.000Z',
        '2018-06-19T00:00:00.000Z',
        '2018-07-19T01:30:00.000Z',
        '2018-08-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-10-19T04:30:00.000Z',
        '2018-11-19T05:30:00.000Z',
        '2018-12-19T06:30:00.000Z'
      ],
      labels: {
        format: 'MMM'
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        format: 'MM'
      }
    }
  };
  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [primary, secondary, line, theme]);

  const [series,setSeries] = useState([
    {
      name: 'Series 1',
      data: [58, 115, 28, 83, 63, 75, 35, 55]
    }
  ]);
  useEffect(() => {
    const fetchOverviews = async () => {
      try {
        const storeId = JSON.parse(localStorage.getItem('store'))?.id;
        const token = localStorage.getItem('token');
        if (!storeId || !token) {
          throw new Error('Store ID or token is missing.');
        }

        const response = await fetch(`${API_BASE_URL}/dashboard/Sales_Statistics?store_id=${storeId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }

        const data = await response.json();
        setSeries([{ data: data.series[0].data }]);
        // Mettre à jour les options du graphique avec les données
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: data.series[0].month,
          }
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchOverviews();
  }, []);

  return <ReactApexChart options={options} series={series} type="line" height={345} />;
};

export default ReportAreaChart;
