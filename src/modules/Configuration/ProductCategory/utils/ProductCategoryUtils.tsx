// useColumns.js
import { Popconfirm, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import { useDeleteProductCategoryItemMutation } from "../api/ProductCategoryEndPoints";
import UpdateProductCategory from "../components/UpdateProductCategory";
import { TProductCategoryDataTypes } from "../types/ProductCategoryTypes";

const useColumns = (): ColumnsType<TProductCategoryDataTypes> => {
  const dispatch = useDispatch();
  const [deleteCartItem] = useDeleteProductCategoryItemMutation();
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
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <EditButton
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update ProductCategory",
                  content: <UpdateProductCategory record={record} />,
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
