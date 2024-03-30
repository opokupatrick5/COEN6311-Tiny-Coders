import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, theme, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ items, children }) => {
  const [currentPage, setCurrentPage] = useState("")
  let history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logout = () => {
    history.push("/")
    window.location.reload()
  }

  const gotoPage = (page) => {
    setCurrentPage(page)
    history.push(`/dashboard/${page}`)
  }

  const menu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout" onClick={logout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{marginTop: "30px"}}>
          {items.map(item => (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => gotoPage(item.route)}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer, padding: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ marginRight: '20px' }}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Avatar style={{ backgroundColor: '#87d068', cursor: "pointer" }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>{currentPage}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Travel Booking ©{new Date().getFullYear()} Created by Tiny Coders</Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;