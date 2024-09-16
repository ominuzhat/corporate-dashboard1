import { Col, Input, Modal, Row, Upload } from "antd";
import React, { useState } from "react";
import { Form } from "../../../../common/CommonAnt";
import { TCreateProductCategoryTypes } from "../types/ProductCategoryTypes";
import { useCreateProductCategoryMutation } from "../api/ProductCategoryEndPoints";
import { PlusOutlined } from "@ant-design/icons";

const CreateProductCategory = () => {
  const [create, { isLoading, isSuccess }] = useCreateProductCategoryMutation();
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
    create(formData);
  };

  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[10, 10]}>
          <Col span={8} lg={8}>
            <Form.Item<TCreateProductCategoryTypes>
              label="name"
              name="name"
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={8} lg={8}>
            <Form.Item<TCreateProductCategoryTypes>
              label="Color"
              name="color"
              rules={[{ required: true, message: "Color is required" }]}
            >
              <Input placeholder="#ffffff" />
            </Form.Item>
          </Col>
          <Col span={8} lg={8}>
            <Form.Item<TCreateProductCategoryTypes>
              label="Subtitle"
              name="subtitle"
              rules={[{ required: true, message: "subtitle is required" }]}
            >
              <Input placeholder="subtitle" />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateProductCategoryTypes>
              label="Icon"
              name="icon"
              rules={[{ required: false }]}
            >
              <Input.TextArea placeholder="icon" rows={4} />
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

export default CreateProductCategory;
