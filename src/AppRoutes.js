import React, { Suspense } from 'react';
import { Container, CircularProgress, Box } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';

// Lazy load feature components
const Dashboard = React.lazy(() => import('./features/Dashboard'));
const RoleConfiguration = React.lazy(() =>
  import('./features/RoleConfiguration')
);
const Settings = React.lazy(() => import('./features/Settings'));
const Inventory = React.lazy(() => import('./features/Inventory'));
const Sales = React.lazy(() => import('./features/Sales'));
const Purchase = React.lazy(() => import('./features/Purchase'));
const Production = React.lazy(() => import('./features/Production'));
const Design = React.lazy(() => import('./features/Design'));
const Accounting = React.lazy(() => import('./features/Accounting'));

// Loading fallback component
const LoadingFallback = () => (
  <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    minHeight='60vh'
  >
    <CircularProgress size={40} />
  </Box>
);

function AppRoutes() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/*'
            element={
              <>
                <Navbar />
                <Container maxWidth={false} sx={{ padding: 2 }}>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path='/' element={<Dashboard />} />
                      <Route path='/inventory' element={<Inventory />} />
                      <Route path='/sales' element={<Sales />} />
                      <Route path='/purchase' element={<Purchase />} />
                      <Route path='/production' element={<Production />} />
                      <Route path='/design' element={<Design />} />
                      <Route path='/accounting' element={<Accounting />} />
                      <Route
                        path='/role-configuration'
                        element={<RoleConfiguration />}
                      />
                      <Route path='/settings' element={<Settings />} />
                      <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                  </Suspense>
                </Container>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
