import React from 'react';
import { Container } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './features/Dashboard';
import RoleConfiguration from './features/RoleConfiguration';
import Settings from './features/Settings';
import Inventory from './features/Inventory';
import Sales from './features/Sales';
import Purchase from './features/Purchase';
import Production from './features/Production';
import Design from './features/Design';
import Accounting from './features/Accounting';

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
