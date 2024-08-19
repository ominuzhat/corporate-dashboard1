import { Space } from "antd";
import { useDispatch } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import DeleteButton from "../../../common/CommonAnt/Button/DeleteButton";
import ViewButton from "../../../common/CommonAnt/Button/ViewButton";
import { useDeleteOfficeInfoMutation } from "../api/OfficeInfoEndPoints";

const useOfficeInfoColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

  const [deleteCartItem] = useDeleteOfficeInfoMutation();

  const handleDelete = async (id: any) => {
    try {
      await deleteCartItem({ id }).unwrap();
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return [
    // {
    //   key: "0",
    //   title: "SL",
    //   align: "center",
    //   render: (_text, _record, index) => index + 1,
    // },
    {
      key: "1",
      title: "Owner Name",
      dataIndex: "ownerName",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "11",
      title: "Brand Name",
      dataIndex: "brandName",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Official Email",
      dataIndex: "officialEmail",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "3",
      title: "Official Address",
      dataIndex: "officeAddress",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "4",
      title: "Phone",
      dataIndex: "phone",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "44",
      title: "Hotline",
      dataIndex: "hotline",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "3",
      title: "Working Day And Time",
      dataIndex: "workingDayAndTime",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "33",
      title: "Closed Day",
      dataIndex: "closedDay",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {/* <EditButton
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update Product",
                  content: <UpdateProduct record={record} />,
                })
              )
            }
          /> */}
          <ViewButton to={`product-view/${record.id}`} />
          <DeleteButton onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton>
        </Space>
      ),
    },
  ];
};

export default useOfficeInfoColumns;
