import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { API_BASE_URL } from '../../../../../config';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: true
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: true
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yaxis: {
    title: {
      text: 'TND '
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `TND ${val} `;
      }
    }
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50
    }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesColumnChart = ({value}) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series,setSeries] = useState([
    {
      name: 'Net Profit',
      data: [180, 90, 135, 114, 120, 145]
    },
    {
      name: 'Revenue',
      data: [120, 45, 78, 150, 168, 99]
    }
  ]);

  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain, successDark, secondary,warning, primaryMain, successDark, secondary],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        show: true,
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);
  useEffect(() => {
    const fetchOverviews = async () => {
      try {
        const storeId = JSON.parse(localStorage.getItem('store'))?.id;
        const token = localStorage.getItem('token');
        if (!storeId || !token) {
          throw new Error('Store ID or token is missing.');
        }

        const response = await fetch(`${API_BASE_URL}/dashboard/Sales_by_category?store_id=${storeId}&sort_by=${value}`, {
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
        setSeries( data.formattedData );
        // Mettre à jour les options du graphique avec les données
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: data.months,
          }
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchOverviews();
  }, [value]);
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </div>
  );
};

export default SalesColumnChart;
