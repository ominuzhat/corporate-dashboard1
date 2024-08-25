// useColumns.js
import { Popconfirm, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import { useDeleteUserMutation } from "../api/UserEndPoints";
import UpdateUser from "../components/UpdateUser";
import { TUserDataTypes } from "../types/UserTypes";

const useColumns = (): ColumnsType<TUserDataTypes> => {
  const dispatch = useDispatch();
  const [deleteCartItem] = useDeleteUserMutation();
  const handleDelete = async (id: any) => {
    try {
      await deleteCartItem({ id }).unwrap();
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };
  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "2",
      title: "Email",
      align: "center",
      dataIndex: "email",
      render: (email) => (email ? email : "N/A"),
    },
    {
      key: "2",
      title: "Phone",
      align: "center",
      dataIndex: "details",
      render: (details) => (details?.phone ? details?.phone : "N/A"),
    },
    {
      key: "34",
      title: "Role",
      align: "center",
      dataIndex: "role",
      render: (role) => (role?.name ? role?.name : "N/A"),
    },
    {
      key: "33",
      title: "Client Id",
      align: "center",
      dataIndex: "clientId",
      render: (clientId) => (clientId ? clientId : "N/A"),
    },
    {
      key: "3",
      title: "Status",
      align: "center",
      dataIndex: "status",
      render: (status) => (status ? 'Active' : "Inactive"),
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <EditButton
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update User",
                  content: <UpdateUser record={record} />,
                })
              )
            }
          />
          <ViewButton to={`${record.id}`} />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteButton>Delete</DeleteButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};

export default useColumns;
