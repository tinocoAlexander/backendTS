import { Layout } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                {/* Sidebar content goes here */}
            </Sider>
            <Layout>
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {/* Header content goes here */}
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Outlet/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    {/* Footer content goes here */}
                </Footer>
            </Layout>
        </Layout>
    );
}

export default Dashboard;