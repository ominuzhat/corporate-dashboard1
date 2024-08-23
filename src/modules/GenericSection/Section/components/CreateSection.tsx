import { Col, Input, Row, Select, Upload, Modal } from "antd";
import React, { useState } from "react";
import { Form } from "../../../../common/CommonAnt";
import { useCreateSectionMutation } from "../api/SectionEndPoints";
import { TCreateSectionTypes } from "../types/SectionTypes";
import { useGetWebServiceQuery } from "../../../Configuration/WebService/api/WebServiceEndPoints";
import { PlusOutlined } from "@ant-design/icons";

const CreateSection = () => {
  const [create, { isLoading, isSuccess }] = useCreateSectionMutation();
  const { data: webServiceData }: any = useGetWebServiceQuery({});

  const webServiceOptions =
    webServiceData?.data?.map((service: any) => ({
      value: service?.id,
      label: service?.serviceId,
    })) || [];

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);


  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();
  
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'keyPoints' && typeof value === 'string') {
        formData.append(key, JSON.stringify([value]));
      } else if (Array.isArray(value)) {
        if (key === 'keyPoints') {
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
    create(formData);
  };
  

  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[10, 10]}>
          <Col lg={12}>
            <Form.Item<TCreateSectionTypes>
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
          <Col span={12} lg={12}>
            <Form.Item<TCreateSectionTypes>
              label="Section Name"
              name="sectionName"
              rules={[{ required: true, message: "sectionName is required" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateSectionTypes>
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateSectionTypes>
              label="Subtitle"
              name="subtitle"
              rules={[{ required: false }]}
            >
              <Input placeholder="Subtitle" />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateSectionTypes>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea placeholder="Description" rows={4} />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateSectionTypes>
              label="Icon"
              name="icon"
              rules={[{ required: false }]}
            >
              <Input.TextArea placeholder="Description" rows={4} />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateSectionTypes>
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
          <Col span={24} lg={24}>
            <Form.Item
              label="Section Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e.slice(-1) : e?.fileList.slice(-1)
              }
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture-card"
                onPreview={handlePreview}
                showUploadList={{ showRemoveIcon: true }}
              >
                {previewImage ? null : <PlusOutlined />}
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

export default CreateSection;
