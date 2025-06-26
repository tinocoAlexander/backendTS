import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./modules/dashboard/Dashboard";
import routes from "./MenuRoutes";
import AuthRoutes from "./auth/AuthRoutes";
import Login from "./modules/login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <AuthRoutes>
                <Dashboard />
              </AuthRoutes>
            }
          >
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;