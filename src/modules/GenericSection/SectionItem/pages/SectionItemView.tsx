import { Descriptions, DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useSingleSectionItemQuery } from "../api/SectionItemEndPoints";
import { TSectionItemDataTypes } from "../types/SectionItemTypes";

const SectionItemView = () => {
  const { sectionItemId } = useParams();
  const { data } = useSingleSectionItemQuery({ id: Number(sectionItemId) });

  const {
    genericPageSection,
    title,
    icon,
    subtitle,
    image,
    description,
    keyPoints,
  }: TSectionItemDataTypes = data?.data || {};

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "2",
      label: <div className="custom-label font-bold">sectionName</div>,
      children: <div>{genericPageSection?.sectionName || "N/A"}</div>,
    },    
    {
      key: "3",
      label: <div className="custom-label font-bold">Title</div>,
      children: <div>{title}</div>,
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
    },
    {
      key: "13",
      label: <div className="custom-label font-bold">Image</div>,
      children: <img src={image} style={{ width: "100%", height: "100%" }} />,
    },
    {
      key: "14",
      label: <div className="custom-label font-bold">Icon</div>,
      children: <div>{icon}</div>,
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
        title={`SectionItem Title: ${title}`}
        items={borderedItems}
      />
    </div>
  );
};

export default SectionItemView;
