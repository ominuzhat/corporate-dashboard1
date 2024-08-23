// useColumns.js
import { Popconfirm, Space } from "antd";
import { useDispatch } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { TKmsDataTypes } from "../types/KmsTypes";
import { useDeleteKmsItemMutation } from "../api/KmsEndPoints";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import UpdateKms from "../components/UpdateKms";
import moment from "moment";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";

const useColumns = (): ColumnsType<TKmsDataTypes> => {
  const dispatch = useDispatch();
  const [deleteCartItem] = useDeleteKmsItemMutation();
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
      key: "1",
      title: "Client Id",
      align: "center",
      dataIndex: "clientId",
      render: (clientId) => (clientId ? clientId : "N/A"),
    },
    // {
    //   key: "2",
    //   title: "Api Key",
    //   align: "center",
    //   dataIndex: "apiKey",
    //   render: (apiKey) => (apiKey ? apiKey : "N/A"),
    // },
    {
      key: "2",
      title: "Expires At",
      align: "center",
      dataIndex: "expiresAt",
      render: (expiresAt) =>
        expiresAt ? moment(expiresAt).format("YYYY-MM-DD HH:mm") : "N/A",
    },
    {
      key: "3",
      title: "Updated At",
      align: "center",
      dataIndex: "updatedAt",
      render: (updatedAt) =>
        updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm") : "N/A",
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
                  title: "Update Kms",
                  content: <UpdateKms record={record} />,
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
    // Add other column definitions here
  ];
};

export default useColumns;
