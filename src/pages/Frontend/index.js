import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firbase';
import { signOut } from 'firebase/auth';
import Routes from './Routes';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import PersonOffIcon from '@mui/icons-material/PersonOff';

import { Typography } from 'antd';
import { items } from './Sidebar';
import { Navigate } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import { useAuthContext } from '../../context/AuthContext';
const { Title } = Typography;

const { Header, Sider, Content, Footer } = Layout;

export default function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuthContext();

  const handleLogout = () => {

    signOut(auth)
      .then(() => {
        console.log("user is logged out")
        navigate("/auth/login")
        window.toastify("You are logged out!", "success")
        setIsAuthenticated(false)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <Layout style={{ minHeight: " 100vh " }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'black' }}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{ backgroundColor: 'black' }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
        />

      </Sider>


      <Layout style={{ backgroundColor: '#252525' }}>

        <Header style={{ padding: 0, background: '#252525', marginLeft: 50, marginTop: 50 }}>
          <Title style={{ color: 'white' }}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>To Do  <button className='btn btn-primary' style={{ backgroundColor: '#363636', color: 'white' }} onClick={handleLogout}><PersonOffIcon /></button></Title>
        </Header>
        <Button type='text' icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} style={{ fontSize: "16px", width: "64", height: "20", color: "white" }}></Button>

        <Routes />

        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: '#252525',
            color: '#7A7A7A'
          }}
        >
          <div className="container d-flex flex-row justify-content-center flex-wrap justify-content-around" >
            <a href="/form"><div className="col-3"><AddIcon /></div></a>
            <a><div className="col-3"><CalendarMonthIcon /></div></a>
            <a><div className="col-3"><ArrowForwardIcon /></div></a>
            <a><div className="col-3"><SearchIcon /></div></a>
          </div>
        </Footer>

      </Layout>
    </Layout>
  );
};

