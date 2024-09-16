import { Descriptions, DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useSingleProductCategoryItemQuery } from "../api/ProductCategoryEndPoints";

const ProductCategoryView = () => {
  const { productCategoryId } = useParams();
  const { data } = useSingleProductCategoryItemQuery({
    id: Number(productCategoryId),
  });

  const { name, color, icon, subtitle, image } = data?.data || {};

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: <div className="custom-label font-bold">name</div>,
      children: <div>{name}</div>,
    },
    {
      key: "4",
      label: <div className="custom-label font-bold">subtitle</div>,
      children: <div>{subtitle}</div>,
    },
    {
      key: "2",
      label: <div className="custom-label font-bold">color</div>,
      children: <div>{color}</div>,
    },
    {
      key: "3",
      label: <div className="custom-label font-bold">icon</div>,
      children: <div>{icon}</div>,
    },
    {
      key: "13",
      label: <div className="custom-label font-bold">Image</div>,
      children: <img src={image} style={{ width: "100%", height: "100%" }} />,
    },
  ];
  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Descriptions
        bordered
        title={` Category Name :  ${name}`}
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

export default ProductCategoryView;
