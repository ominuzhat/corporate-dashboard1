import { Layout } from "antd";
import React, { useState } from "react";
import "../styles/DashboardLayout.css";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import SidebarDrawer from "../components/DashboardSidebar/SidebarDrawer";

const { Content } = Layout;

interface DashboardLayoutProps {
  role: string | null; // Define the role prop
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }: any) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Layout className="dashboard-main-layout">
        <DashboardSidebar role={role} />{" "}
        <Layout id="contain-layout">
          <DashboardHeader setOpen={setOpen} />
          <Content>
            <div className="dashboard-content" style={{ padding: "10px 20px" }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <SidebarDrawer open={open} setOpen={setOpen} role={role} />
    </React.Fragment>
  );
};

export default DashboardLayout;
