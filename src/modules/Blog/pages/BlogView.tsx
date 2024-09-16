import { Carousel, Descriptions, DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useSingleBlogItemQuery } from "../api/BlogEndPoints";
import { TBlogDataTypes } from "../types/BlogTypes";

const BlogView = () => {
  const { blogId } = useParams();
  const { data } = useSingleBlogItemQuery({ id: Number(blogId) });

  const {
    title,
    subtitle,
    slug,
    views,
    isFeatured,
    images,
    category,
    createdAt,
    updatedAt,
    description,
    content,
    keyPoints,
  }: TBlogDataTypes = data?.data || {};

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "9",
      label: <div className="custom-label font-bold">Category</div>,
      children: <div>{category?.name || "N/A"}</div>,
    },
    {
      key: "11",
      label: <div className="custom-label font-bold">Updated At</div>,
      children: (
        <div>
          {updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A"}
        </div>
      ),
    },
    {
      key: "6",
      label: <div className="custom-label font-bold">Views</div>,
      children: <div>{views || 0}</div>,
    },

    {
      key: "7",
      label: <div className="custom-label font-bold">Is Featured</div>,
      children: <div>{isFeatured ? "Yes" : "No"}</div>,
    },
    {
      key: "10",
      label: <div className="custom-label font-bold">Created At</div>,
      children: (
        <div>
          {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
        </div>
      ),
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

    {
      key: "14",
      label: <div className="custom-label font-bold">Key Points</div>,
      children: (
        <div>
          {keyPoints && keyPoints.length > 0
            ? keyPoints.map((point, index) => <div key={index}>{point}</div>)
            : "N/A"}
        </div>
      ),
    },
    {
      key: "12",
      label: <div className="custom-label font-bold">Description</div>,
      children: <div>{description}</div>,
      span: 2
    },
    {
      key: "13",
      label: <div className="custom-label font-bold">Content</div>,
      children: <div>{content}</div>,
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
        title={`Blog Title: ${title}`}
        items={borderedItems}
      />
    </div>
  );
};

export default BlogView;
