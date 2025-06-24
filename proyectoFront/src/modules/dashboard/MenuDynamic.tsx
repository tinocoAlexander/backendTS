import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import routes from '../../MenuRoutes';

const Icons: any = {
    DashboardOutlined: <DashboardOutlined />,
    UserOutlined: <UserOutlined />,
    BarChartOutlined: <BarChartOutlined />,
};

const MenuDynamic = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = routes.map((route) => ({
        key: `/dashboard/${route.path}`,
        icon: route.icon ? Icons[route.icon] : null,
        label: route.label,
        onClick: () => navigate(`/dashboard/${route.path}`),
    }));

    return (
        <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ height: '100%', borderRight: 0 }}
        />
    );
};

export default MenuDynamic;