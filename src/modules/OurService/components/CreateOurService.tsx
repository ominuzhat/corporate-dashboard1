import { Col, Input, Row, Select, Checkbox, Upload, Modal, Button } from "antd";
import React, { useState } from "react";
import { Form } from "../../../common/CommonAnt";
import { useCreateOurServiceMutation } from "../api/OurServiceEndPoints";
import {
  TCreateOurServiceTypes,
  TOurServiceFAQ,
} from "../types/OurServiceTypes";
import { useGetWebServiceQuery } from "../../Configuration/WebService/api/WebServiceEndPoints";
import { useGetCategoryQuery } from "../../Configuration/Category/api/CategoryEndPoints";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const CreateOurService = () => {
  const [create, { isLoading, isSuccess }] = useCreateOurServiceMutation();
  const { data: webServiceData }: any = useGetWebServiceQuery({});
  const { data: categoryData }: any = useGetCategoryQuery({});

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [faqs, setFaqs] = useState<TOurServiceFAQ[]>([]);

  const webServiceOptions =
    webServiceData?.data?.map((service: any) => ({
      value: service?.id,
      label: service?.serviceId,
    })) || [];

  const categoryOptions =
    categoryData?.data?.map((service: any) => ({
      value: service?.id,
      label: service?.name,
    })) || [];

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);

  const removeFaq = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  const updateFaq = (
    index: number,
    field: keyof TOurServiceFAQ,
    value: string | number
  ) => {
    const updatedFaqs = [...faqs];
    if (field === "id") {
      updatedFaqs[index][field] = value as number;
    } else {
      updatedFaqs[index][field] = value as string;
    }
    setFaqs(updatedFaqs);
  };

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "keyPoints" && typeof value === "string") {
        formData.append(key, JSON.stringify([value]));
      } else if (Array.isArray(value)) {
        if (key === "keyPoints") {
          formData.append(key, JSON.stringify(value));
        } else {
          value.forEach((file) => {
            if (file?.originFileObj) {
              formData.append(key, file.originFileObj);
            } else {
              formData.append(key, file as string);
            }
          });
        }
      } else {
        formData.append(key, value as string | Blob);
      }
    });
    formData.append("faqs", JSON.stringify(faqs));
    create(formData);
  };

  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[10, 10]}>
          <Col lg={12}>
            <Form.Item<TCreateOurServiceTypes>
              label="Web Service"
              name="webService"
              rules={[
                { required: true, message: "Please select a web service" },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Web Service"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={webServiceOptions}
              />
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item<TCreateOurServiceTypes>
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                showSearch
                placeholder="Select Category"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={categoryOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12} lg={12}>
            <Form.Item<TCreateOurServiceTypes>
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
          </Col>

          <Col span={24} lg={12}>
            <Form.Item<TCreateOurServiceTypes>
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Slug is required" }]}
            >
              <Input placeholder="Slug" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateOurServiceTypes>
              label="Subtitle"
              name="subtitle"
              rules={[{ required: true, message: "Subtitle is required" }]}
            >
              <Input placeholder="Subtitle" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateOurServiceTypes>
              label="Key Points"
              name="keyPoints"
              rules={[
                {
                  required: false,
                  message: "Please add key points",
                },
              ]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Add key points"
                tokenSeparators={[","]}
              />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateOurServiceTypes>
              label="Price"
              name="price"
              rules={[{ required: false }]}
            >
              <Input placeholder="10.50" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateOurServiceTypes>
              label="Content Title"
              name="contentTitle"
              rules={[{ required: false }]}
            >
              <Input placeholder="content title" />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateOurServiceTypes>
              label="Icon"
              name="icon"
              rules={[{ required: false }]}
            >
              <Input.TextArea placeholder="Icon" rows={4} />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateOurServiceTypes>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea placeholder="Description" rows={4} />
            </Form.Item>
          </Col>

          <Col span={24} lg={24}>
            <Form.Item<TCreateOurServiceTypes>
              label="Content"
              name="content"
              rules={[{ required: true, message: "Content is required" }]}
            >
              <Input.TextArea placeholder="Content" rows={6} />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <h3>FAQs</h3>
            {faqs.map((faq, index) => (
              <Row key={index} gutter={16} className="my-2" align="middle">
                <Col span={11}>
                  <Input
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) =>
                      updateFaq(index, "question", e.target.value)
                    }
                  />
                </Col>
                <Col span={11}>
                  <Input
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  />
                </Col>
                <Col span={2}>
                  <Button
                    type="dashed"
                    icon={<MinusCircleOutlined />}
                    onClick={() => removeFaq(index)}
                  />
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              onClick={addFaq}
              style={{ width: "100%", marginTop: "10px" }}
            >
              <PlusOutlined /> Add FAQ
            </Button>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item
              label=" Images"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
              rules={[{ required: true, message: "blog images required!" }]}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={20}
                listType="picture-card"
                onPreview={handlePreview}
                showUploadList={{ showRemoveIcon: true }}
              >
                <PlusOutlined />
              </Upload>
            </Form.Item>
          </Col>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default CreateOurService;
