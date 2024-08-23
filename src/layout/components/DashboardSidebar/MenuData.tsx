import { Menu, MenuProps } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import SidebarTop from "./SidebarTop";

const MenuData: React.FC = () => {
  const { pathname } = useLocation();

  const iconStyle: React.CSSProperties | undefined = {
    marginRight: "8px",
    color: "white",
  };

  const subIconStyle: React.CSSProperties | undefined = {
    marginRight: "5px",
    color: "white",
  };

  const items: MenuProps["items"] = [
    {
      key: "/",
      label: <Link to="/">Dashboard</Link>,
      icon: <Iconify name="mage:dashboard" style={iconStyle} />,
    },
    {
      key: "/blog",
      label: <Link to="/blog">Blog</Link>,
      icon: <Iconify name="mdi:work" style={iconStyle} />,
    },
    {
      key: "/",
      label: "Generic Section",
      icon: <Iconify name="hugeicons:configuration-01" style={iconStyle} />,
      children: [
        {
          label: <Link to="/section">Section</Link>,
          icon: <Iconify name="tdesign:course" style={subIconStyle} />,
          key: "/section",
        },
        {
          label: <Link to="/section-item">Section Item</Link>,
          icon: <Iconify name="tdesign:course" style={subIconStyle} />,
          key: "/section-item",
        },
      ],
    },
    {
      key: "/officeInfo",
      label: <Link to="/officeInfo">Office Info</Link>,
      icon: <Iconify name="mdi:work" style={iconStyle} />,
    },
    {
      key: "/",
      label: "Configuration",
      icon: <Iconify name="hugeicons:configuration-01" style={iconStyle} />,
      children: [
        {
          label: <Link to="/category">Category</Link>,
          icon: <Iconify name="tdesign:course" style={subIconStyle} />,
          key: "/category",
        },
        {
          label: <Link to="/web-service">Web Service</Link>,
          icon: <Iconify name="tdesign:course" style={subIconStyle} />,
          key: "/web-service",
        },
        {
          label: <Link to="/key-management">Key Management</Link>,
          icon: <Iconify name="tdesign:course" style={subIconStyle} />,
          key: "/key-management",
        },
      ],
    },
  ];

  return (
    <div className="dashboard-sidebar-style">
      <div>
        <SidebarTop />
        <span className="featues-title">Main Menu</span>
        <div>
          <Menu
            style={{ backgroundColor: "transparent" }}
            mode="inline"
            theme="dark"
            selectedKeys={[pathname]}
            items={items}
          />
        </div>
      </div>

      <br />
      <br />

      {/* <SidebarButtom /> */}
    </div>
  );
};

export default MenuData;
