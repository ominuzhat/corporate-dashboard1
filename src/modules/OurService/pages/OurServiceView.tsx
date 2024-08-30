import {
  Carousel,
  Collapse,
  Descriptions,
  DescriptionsProps,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useSingleOurServiceItemQuery } from "../api/OurServiceEndPoints";
import { TOurServiceDataTypes } from "../types/OurServiceTypes";
const { Title } = Typography;
const { Panel } = Collapse;

const OurServiceView = () => {
  const { ourServiceId } = useParams();
  const { data } = useSingleOurServiceItemQuery({ id: Number(ourServiceId) });

  const {
    webService,
    title,
    subtitle,
    slug,
    images,
    category,
    description,
    content,
    keyPoints,
    faqs,
    contentTitle,
    icon,
    price,
  }: TOurServiceDataTypes = data?.data || {};

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "2",
      label: <div className="custom-label font-bold">Web Service ID</div>,
      children: <div>{webService?.serviceId || "N/A"}</div>,
    },
    {
      key: "9",
      label: <div className="custom-label font-bold">Category</div>,
      children: <div>{category?.name || "N/A"}</div>,
    },
    {
      key: "3",
      label: <div className="custom-label font-bold">Title</div>,
      children: <div>{title}</div>,
    },
    {
      key: "33",
      label: <div className="custom-label font-bold">Content Title</div>,
      children: <div>{contentTitle}</div>,
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
      key: "44",
      label: <div className="custom-label font-bold">Price</div>,
      children: <div>{price}</div>,
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
      span: 2,
    },
    {
      key: "13",
      label: <div className="custom-label font-bold">Content</div>,
      children: <div>{content}</div>,
    },
    {
      key: "45",
      label: <div className="custom-label font-bold">Icon</div>,
      children: <div>{icon}</div>,
    },
    // {
    //   key: "45",
    //   label: <div className="custom-label font-bold">Faqs</div>,
    //   children: (
    //     <div>
    //       {faqs?.map((faq, index) => (
    //         <Row key={index} gutter={16} className="my-2" align="middle">
    //           <Col span={11}>
    //           {faq.question}
    //           </Col>
    //           <Col span={11}>
    //           {faq.answer}
    //           </Col>
    //         </Row>
    //       ))}
    //     </div>
    //   ),
    // },
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
        title={`OurService Title: ${title}`}
        items={borderedItems}
      />
      <div className="faqs-section my-4">
        <Title level={4}>FAQs</Title>
        {faqs && faqs.length > 0 ? (
          <Collapse accordion>
            {faqs.map((faq, index) => (
              <Panel header={faq.question} key={index}>
                <p>{faq.answer}</p>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <p>No FAQs available.</p>
        )}
      </div>
    </div>
  );
};

export default OurServiceView;
