import { Descriptions, DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useSingleRoleItemQuery } from "../api/RoleEndPoints";

const RoleView = () => {
  const { roleId } = useParams();
  const { data } = useSingleRoleItemQuery({ id: Number(roleId) });

  const { name } = data?.data || {};

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: <div className="custom-label font-bold">name</div>,
      children: <div>{name}</div>,
    },   
  ];
  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Descriptions
        bordered
        title={` Role Name :  ${name}`}
        items={borderedItems}
      />
    </div>
  );
};

export default RoleView;
