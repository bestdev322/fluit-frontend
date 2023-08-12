
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './assets/css/default.scss'
import Login from "./pages/Login";
import CwaPage from "./pages/CwaPage";
import EwpPage from "./pages/EwpPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";



import reportWebVitals from './reportWebVitals';
import AuthWrapper from './utils/AuthWrapper';

const router = createBrowserRouter(
  createRoutesFromElements(
    
    
      <Route path="/">
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="cwa" element={<CwaPage />} />
        <Route path="ewp" element={<EwpPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="cwas/:project_id" element={<CwaPage />} />

        


      </Route>
    
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
