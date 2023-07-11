import React, { useState } from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
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

import { Typography } from 'antd';
const { Title } = Typography;

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: " 100vh " }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'black' }}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{ backgroundColor: 'black' }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '0',
              icon: <InboxIcon />,
              label: 'Inbox',
            },
            {
              key: '1',
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>,
              label: ' Today',
            },
            {
              key: '2',
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2H0zm0 1v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3H0z" />
              </svg>,
              label: 'Upcoming',
            },
            {
              key: '3',
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack" viewBox="0 0 16 16">
                <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
                <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
              </svg>,
              label: 'Anytime',
            },
            {
              key: '4',
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>,
              label: 'Someday',
            },
            
            {
              key: '5',
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
                <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
              </svg>,
              label: 'Trash',
            }
            
          ]}
        />

      </Sider>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          borderRadius: 0,
          width: 64,
          height: "100vh",
          backgroundColor: '#252525',
          color: 'white',
        }} />

      <Layout style={{ backgroundColor: '#252525' }}>

        <Header style={{ padding: 0, background: '#252525', marginLeft: 50, marginTop: 50 }}>
          <Title style={{ color: 'white' }}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>Today</Title>
        </Header>
        
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#252525',
            color: 'white'
          }}
        >
          <div className="container"  >
            <div className="row" style={{backgroundColor: '#363636', borderRadius: "8px"}}>
              <div className="col" style={{marginTop: 10, marginBottom: 10}}>
              <p style={{marginBottom: 0, color: '#7A7A7A'}}>09:20 Evan + Hoon</p>
              <p style={{marginBottom: 0}}> <span style={{color: "#C4531A"}}>14:00</span> <span style={{color: '#C3C3C3'}}>Core Team Weekly Grooming</span></p>
              </div>
            </div>
          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: '#252525',
            color: '#7A7A7A'
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-3"><AddIcon /></div>
              <div className="col-3"><CalendarMonthIcon /></div>
              <div className="col-3"><ArrowForwardIcon /></div>
              <div className="col-3"><SearchIcon /></div>
            </div>
          </div>
        </Footer>
      
      </Layout>
    </Layout>
  );
};

export default App;