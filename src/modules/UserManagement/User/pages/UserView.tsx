import { Descriptions, DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useSingleUserQuery } from "../api/UserEndPoints";
import { TUserDataTypes } from "../types/UserTypes";

const UserView = () => {
  const { userId } = useParams();
  const { data } = useSingleUserQuery({ id: Number(userId) });

  const {
    firstName,
    lastName,
    status,
    clientId,
    email,
    details,
    role,
  }: TUserDataTypes = data?.data || {};

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "13",
      label: <div className="custom-label font-bold">Image</div>,
      children: (
        <img src={details?.image} style={{ width: "100%", height: "100%" }} />
      ),
    },
    {
      key: "2",
      label: <div className="custom-label font-bold">First Name</div>,
      children: <div>{firstName || "N/A"}</div>,
    },
    {
      key: "2",
      label: <div className="custom-label font-bold">Last Name</div>,
      children: <div>{lastName || "N/A"}</div>,
    },
    {
      key: "3",
      label: <div className="custom-label font-bold">Email</div>,
      children: <div>{email}</div>,
    },
    {
      key: "4",
      label: <div className="custom-label font-bold">Client Id</div>,
      children: <div>{clientId}</div>,
    },
    {
      key: "4",
      label: <div className="custom-label font-bold">Phone</div>,
      children: <div>{details?.phone}</div>,
    },
    {
      key: "12",
      label: <div className="custom-label font-bold">Status</div>,
      children: <div>{status}</div>,
    },
    {
      key: "14",
      label: <div className="custom-label font-bold">Address</div>,
      children: <div>{details?.address}</div>,
    },
    {
      key: "14",
      label: <div className="custom-label font-bold">Role</div>,
      children: <div>{role?.name}</div>,
    },
    {
      key: "14",
      label: <div className="custom-label font-bold">Gender</div>,
      children: <div>{details?.gender}</div>,
    },
  ];

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Descriptions
        labelStyle={{ width: "200px" }}
        contentStyle={{ width: "400px" }}
        column={3}
        bordered
        title={`User: ${email}`}
        items={borderedItems}
      />
    </div>
  );
};

export default UserView;
