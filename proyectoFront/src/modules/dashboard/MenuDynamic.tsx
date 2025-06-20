import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const Icons = {
    DashboardOutlined,
    UserOutlined,
    BarChartOutlined,
};

const MenuDynamic = () => {
    const [menuItems, setMenuItems] = React.useState([]);
    const navigate = useNavigate();

    const items = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: "DashboardOutlined",
            roles: ["665a1f2b40fd3a12b3e77611"]
        },
        {
            title: "Usuarios",
            path: "/users",
            icon: "UserOutlined",
            roles: ["665a1f2b40fd3a12b3e77612"]
        },
        {
            title: "Reportes",
            path: "/reports",
            icon: "BarChartOutlined",
            roles: ["665a1f2b40fd3a12b3e77611", "665a1f2b40fd3a12b3e77612"]
        }
    ];

    useEffect(() => {
        setTimeout(() => {
            setMenuItems(items);
        }, 500);
    }, []);

    const renderMenu = () => {
        return menuItems.map((item: any) => {
            const IconComponent = Icons[item.icon as keyof typeof Icons];
            return {
                key: item.path,
                icon: IconComponent ? <IconComponent /> : null,
                label: item.title,
                onClick: () => navigate(item.path),
            };
        });
    };

    return (
        <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[window.location.pathname]}
            items={renderMenu()}
            style={{ height: '100%', borderRight: 0 }}
        />
    );
};

export default MenuDynamic;