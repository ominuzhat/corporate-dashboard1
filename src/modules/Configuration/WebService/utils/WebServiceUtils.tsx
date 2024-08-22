// useColumns.js
import { Space } from "antd";
import { useDispatch } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { TWebServiceDataTypes } from "../types/WebServiceTypes";
import { useDeleteWebServiceItemMutation } from "../api/WebServiceEndPoints";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import UpdateWebService from "../components/UpdateWebService";

const useColumns = (): ColumnsType<TWebServiceDataTypes> => {
  const dispatch = useDispatch();
  const [deleteCartItem] = useDeleteWebServiceItemMutation();
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
      title: "Name",
      align: "center",
      dataIndex: "name",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Service Id",
      align: "center",
      dataIndex: "serviceId",
      render: (service) => (service ? service : "N/A"),
    },
    {
      key: "3",
      title: "Url",
      align: "center",
      dataIndex: "url",
      render: (url) => (url ? url : "N/A"),
    },
    {
      key: "3",
      title: "Description",
      align: "center",
      dataIndex: "description",
      render: (description) => (description ? description : "N/A"),
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
                  title: "Update WebService",
                  content: <UpdateWebService record={record} />,
                })
              )
            }
          />
          <DeleteButton onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton>
        </Space>
      ),
    },
    // Add other column definitions here
  ];
};

export default useColumns;
