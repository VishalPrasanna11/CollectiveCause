// src/Routers.tsx
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from '../views/Home';
import ProtectedRoute from '../components/ProtectedRoute';
import MyDashBoard from '../views/MyDashboard';
import EditProfile from '../components/updateprofile';
import UpdateFundRaise from '../views/UpdateFundRaise';
import Donations from '../components/Donations';
import Donation from '../components/Donation';
import FundRasisingForm from '../views/FundRaisingForm';

const Routers: React.FC = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/mydashboard" element={<MyDashBoard />} />
          {/* <Route path="/myprofile" element={<EditProfile />} /> */}
          <Route path="/updatefundraiser/:id" element={<UpdateFundRaise />} />
          <Route path="/fundraise" element={<FundRasisingForm />} />  
        </Route>
        <Route path="/donate/:id" element={<Donation />} />
        <Route path="/donations" element={<Donations />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
   
  );
};

export default Routers;
