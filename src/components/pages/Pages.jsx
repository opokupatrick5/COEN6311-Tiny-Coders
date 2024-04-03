import React, { useEffect, useState } from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Login from "../Login/Login"; 
import singup from "../signup/Signup"
import DashboardLayout from "../dashboard/DashboardLayout";
import PackageList from "../dashboard/Packages"
import FlightList from "../dashboard/FlightList"
import HotelList from "../dashboard/HotelList"
import BookingList from "../dashboard/BookingList"
import CustomerList from "../dashboard/CustomerList"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Pages = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isDashboardRoute, setIsDashboardRoute] = useState(false)
  const location = useLocation();

  useEffect(() => {
    // Get userInfo from localStorage
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfoData = JSON.parse(userInfoString);
      const isDashboard = location.pathname.includes('/dashboard');
      setIsDashboardRoute(isDashboard)
      setUserInfo(userInfoData);
    }
  }, [isDashboardRoute]);

  const isLoggedIn = userInfo !== null;
  

  function getItem(label, key, icon, route, children) {
    return {
      key,
      icon,
      route,
      children,
      label,
    };
  }
  
  const items = [
    getItem('Packages', '1', <PieChartOutlined />, 'packages'),
    getItem('Flights', '2', <DesktopOutlined />, 'flights'),
    getItem('Hotels', '3', <FileOutlined />, 'hotels'),
    getItem('Bookings', '4', <FileOutlined />, 'bookings'),
    getItem('Customers', '5', <UserOutlined />, 'customers'),
  ];

  return (
    <>
      <Router>
        {(!isLoggedIn || !isDashboardRoute) && <Header />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/login' component={Login} /> 
          <Route exact path='/signup' component={singup} />
          <Route path="/dashboard">
            <DashboardLayout items={items}>
              <Switch>
                <Route exact path="/dashboard/packages" component={PackageList} />
                <Route exact path="/dashboard/flights" component={FlightList} />
                <Route exact path="/dashboard/hotels" component={HotelList} />
                <Route exact path="/dashboard/bookings" component={BookingList} />
                <Route exact path="/dashboard/customers" component={CustomerList} />
              </Switch>
            </DashboardLayout>
          </Route>
        </Switch>
        {(!isLoggedIn || !isDashboardRoute) && <Footer />}
      </Router>
    </>
  );
}

export default Pages;