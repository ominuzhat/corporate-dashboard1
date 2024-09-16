import { Carousel, Descriptions, DescriptionsProps, Table } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useSingleProductItemQuery } from "../api/ProductEndPoints";
import { TProductData } from "../type/ProductTypes";

const ProductView = () => {
  const { productId } = useParams();
  const { data } = useSingleProductItemQuery({ id: Number(productId) });

  const {
    title,
    subtitle,
    featuredImage,
    slug,
    images,
    productCategory,
    priceOptions = [],
  }: TProductData = data?.data || {};

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "10",
      label: <div className="custom-label font-bold">Featured Image</div>,
      children: (
        <div>
          <img
            src={featuredImage}
            alt={`featuredImage`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ),
    },
    {
      key: "9",
      label: <div className="custom-label font-bold">Category</div>,
      children: <div>{productCategory?.name || "N/A"}</div>,
    },
    {
      key: "3",
      label: <div className="custom-label font-bold">Title</div>,
      children: <div>{title}</div>,
    },
    {
      key: "5",
      label: <div className="custom-label font-bold">Slug</div>,
      children: <div>{slug}</div>,
    },
    {
      key: "4",
      label: <div className="custom-label font-bold">Subtitle</div>,
      children: <div>{subtitle}</div>,
    },
  ];

  const priceOptionsColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Support Duration",
      dataIndex: "support_for",
      key: "support_for",
    },
    {
      title: "Price Per",
      dataIndex: "pricePer",
      key: "pricePer",
      render: (pricePer: string) => `${pricePer}`,
    },
    {
      title: "Service Link",
      dataIndex: "serviceLink",
      key: "serviceLink",
      render: (serviceLink: string) => `${serviceLink}`,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => `$${totalPrice}`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: "Key Points",
      dataIndex: "keyPoints",
      key: "keyPoints",
      render: (keyPoints: string[]) => (
        <ul>
          {keyPoints?.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      ),
    },
  ];

  const contentStyle: React.CSSProperties = {
    height: "300px",
    width: "500px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    margin: "auto",
  };

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Carousel autoplay>
        {images?.map((image: any) => (
          <div key={image?.id}>
            <h3 style={contentStyle}>
              <img
                src={image?.image}
                alt={`slide-${image?.id}`}
                style={{ width: "100%", height: "100%" }}
              />
            </h3>
          </div>
        ))}
      </Carousel>
      <Descriptions
        labelStyle={{ width: "200px" }}
        contentStyle={{ width: "400px" }}
        column={3}
        bordered
        title={`Product Title: ${title}`}
        items={borderedItems}
      />
      {priceOptions.length > 0 && (
        <Table
          dataSource={priceOptions}
          columns={priceOptionsColumns}
          rowKey="id"
          pagination={false}
          title={() => <b>Price Options</b>}
        />
      )}
    </div>
  );
};

export default ProductView;
