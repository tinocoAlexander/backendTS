import { Layout } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuDynamic from './MenuDynamic';

function Dashboard() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                <MenuDynamic />
            </Sider>
            <Layout>
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {/* Header content */}
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    {/* SOLO ESTO: */}
                    <Outlet/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    {/* Footer content */}
                </Footer>
            </Layout>
        </Layout>
    );
}

export default Dashboard;