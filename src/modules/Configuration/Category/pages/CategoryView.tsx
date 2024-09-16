import { Descriptions, DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useSingleCategoryItemQuery } from "../api/CategoryEndPoints";

const CategoryView = () => {
  const { categoryId } = useParams();
  const { data } = useSingleCategoryItemQuery({ id: Number(categoryId) });

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
        title={` Product Name :  ${name}`}
        // extra={
        //   <div className="space-x-5">
        //     <Button type="primary">Print</Button>
        //     <Button type="primary">Edit</Button>
        //   </div>
        // }
        items={borderedItems}
      />
    </div>
  );
};

export default CategoryView;
