import React from "react";
import { Button as AntButton, ButtonProps } from "antd";
import { Link } from "react-router-dom";

interface Props extends ButtonProps {
  to: string;
}

const ViewButton: React.FC<Props> = ({ to, ...rest }) => {
  return (
    <Link to={to}>
      <AntButton
        {...rest}
        title="View"
        size="small"
        type="default"
        style={{ color: "white", background: "#7077A1" }}
      >
        View
      </AntButton>
    </Link>
  );
};

export default ViewButton;
