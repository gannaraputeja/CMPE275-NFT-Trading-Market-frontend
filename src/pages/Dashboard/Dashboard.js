/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import { Box, Container } from '@mui/material';
import React from 'react';
import NftListingsTable from './NftListingsTable';
import NftSalesTable from './NftSalesTable';
import { getDashboardMetrics } from '../../api/DashboardMetrics';

function Dashboard() {
  const [dashboardData, setDashboardData] = React.useState([]);

  const getDashboardMetricsStats = async () => {
    try {
      const res = await getDashboardMetrics();
      console.log('Data : ', res.data);
      setDashboardData(res.data);
      return res.data;
    } catch (err) {
      console.log('Failed to getDashboardMetricsStats.', err);
      return err;
    }
  };

  React.useEffect(() => {
    getDashboardMetricsStats();
  }, []);
  return (
    <Container>
      <Box sx={{ display: 'flex', gridTemplateRows: 'repeat(2, 1fr)', justifyContent: 'center' }}>
        <NftSalesTable dashboardData={dashboardData} />
        <NftListingsTable />
      </Box>
    </Container>
  );
}

export default Dashboard;
