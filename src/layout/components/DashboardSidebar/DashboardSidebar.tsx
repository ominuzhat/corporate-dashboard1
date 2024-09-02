import { Layout } from "antd";
import React from "react";
import MenuData from "./MenuData";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ThemesTypes } from "../../../app/features/themeSlice";

interface DashboardSidebarProps {
  role: string | null; // Define the role prop
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
  const { themes, color1, darkColor } = useSelector<RootState, ThemesTypes>(
    (state) => state.themes
  );

  return (
    <Layout.Sider
      id="dashboard-sidebar"
      width={250}
      style={{
        background: themes === "light" ? color1 : darkColor,
      }}
    >
      <MenuData role={role} />
    </Layout.Sider>
  );
};

export default DashboardSidebar;
