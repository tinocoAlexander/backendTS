import UserForm from "./modules/user/userForm";
import Orders from "./modules/orders/Orders";
import Products from "./modules/products/Products";

export interface AppRoute {
  path: string;
  element: JSX.Element;
  label?: string;
  icon?: string;
  roleIds?: string[];
  hidden?: boolean;
}

const routes: AppRoute[] = [
  {
    path: 'users',
    element: <UserForm />,
    label: 'Users',
    icon: 'UserOutlined',
  },
  {
    path: 'orders',
    element: <Orders />,
    label: 'Orders',
    icon: 'BarChartOutlined',
  },
  {
    path: 'products',
    element: <Products />,
    label: 'Products',
    icon: 'DashboardOutlined',
  },
];

export default routes;