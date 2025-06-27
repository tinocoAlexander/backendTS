import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useAuth } from '../../auth/AuthContext';

const Icons: any = {
    DashboardOutlined: <DashboardOutlined />,
    UserOutlined: <UserOutlined />,
    BarChartOutlined: <BarChartOutlined />,
};

const MenuDynamic = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, token } = useAuth();
    const [menuItems, setMenuItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.roles) return;
            // Convierte los roles a string separados por coma
            const rolesParam = user.roles.map((r: any) => typeof r === 'string' ? r : r._id).join(',');
            try {
                const response = await fetch(`http://localhost:3000/api/auth/menu?roles=${rolesParam}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const menuList = await response.json();
                setMenuItems(menuList);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [user, token]);

    // Renderiza el menú dinámicamente según la respuesta del backend
    const items = menuItems.map((item) => ({
        key: item.path,
        icon: item.icon && Icons[item.icon] ? Icons[item.icon] : null,
        label: item.title,
        onClick: () => navigate(item.path),
    }));

    return (
        <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[location.pathname]}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
        />
    );
};

export default MenuDynamic;