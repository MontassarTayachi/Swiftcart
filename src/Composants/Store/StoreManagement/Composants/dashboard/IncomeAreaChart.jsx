import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { API_BASE_URL } from '../../../../../config';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([
    {
      name: 'Orders Count',
      data: []
    },
    {
      name: 'Orders with Flouci',
      data: []
    },
    {
      name: 'Orders with Cash',
      data: []
    }
  ]);
  const [dataCart, setDataCart] = useState([
    {
      name: 'Orders Count',
      chart_orders_week: [],
      chart_orders_month:[],
      day_of_week: [],
      month_of_year: []
    },
    {
      name: 'Orders with Flouci',
      chart_orders_week: [],
      chart_orders_month:[],
    },
    {
      name: 'Orders with Cash',
      chart_orders_week: [],
      chart_orders_month:[],
    }
  ]); 
  useEffect(() => {
    const fetchOverviews = async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard/chart_orders?store_id=${JSON.parse(localStorage.getItem('store')).id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('token')}`,
          }
        }
    )
      const data = await response.json()
     setDataCart(data.dataCart)
     
    }
    fetchOverviews()
  }, [])

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories:
          slot === 'month'
            ? dataCart[0].month_of_year
            : dataCart[0].day_of_week,
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot,dataCart]);



  useEffect(() => {
    setSeries([
      {
        name: 'Orders Count',
        data: slot === 'month' ?  dataCart[0].chart_orders_month:dataCart[0].chart_orders_week
      },
      {
        name: 'Orders with Flouci',
        data: slot === 'month' ? dataCart[1].chart_orders_month:dataCart[1].chart_orders_week
      },
      {
        name: 'Orders with Cash',
        data: slot === 'month' ? dataCart[2].chart_orders_month:dataCart[2].chart_orders_week
      }

    ]);
  }, [slot,dataCart]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string
};

export default IncomeAreaChart;
