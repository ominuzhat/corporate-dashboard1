import { Col, Input, Row, Select, Upload, Modal } from "antd";
import React, { useState } from "react";
import { Form } from "../../../../common/CommonAnt";
import { useCreateSectionItemMutation } from "../api/SectionItemEndPoints";
import { TCreateSectionItemTypes } from "../types/SectionItemTypes";
import { PlusOutlined } from "@ant-design/icons";
import { useGetSectionQuery } from "../../Section/api/SectionEndPoints";

const CreateSectionItem = () => {
  const [create, { isLoading, isSuccess }] = useCreateSectionItemMutation();
  const { data: sectionData }: any = useGetSectionQuery({});

  const sectionOptions =
    sectionData?.data?.map((section: any) => ({
      value: section?.id,
      label: `${section?.webService?.serviceId} - ${section?.sectionName}`,
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
            <Form.Item<TCreateSectionItemTypes>
              label="Page Section"
              name="genericPageSection"
              rules={[
                { required: true, message: "Page Section" },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Page Section"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={sectionOptions}
              />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateSectionItemTypes>
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateSectionItemTypes>
              label="Subtitle"
              name="subtitle"
              rules={[{ required: false }]}
            >
              <Input placeholder="Subtitle" />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateSectionItemTypes>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea placeholder="Description" rows={4} />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateSectionItemTypes>
              label="Icon"
              name="icon"
              rules={[{ required: false }]}
            >
              <Input.TextArea placeholder="icon" rows={4} />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateSectionItemTypes>
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
              label="SectionItem Image"
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

export default CreateSectionItem;
