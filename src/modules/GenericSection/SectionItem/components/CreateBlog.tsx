import { Col, Input, Row, Select, Checkbox, Upload, Modal } from "antd";
import React, { useState } from "react";
import { Form } from "../../../common/CommonAnt";
import { useCreateBlogMutation } from "../api/BlogEndPoints";
import { TCreateBlogTypes } from "../types/BlogTypes";
import { useGetWebServiceQuery } from "../../Configuration/WebService/api/WebServiceEndPoints";
import { PlusOutlined } from "@ant-design/icons";
import { useGetCategoryQuery } from "../../Configuration/Category/api/CategoryEndPoints";

const CreateBlog = () => {
  const [create, { isLoading, isSuccess }] = useCreateBlogMutation();
  const { data: webServiceData }: any = useGetWebServiceQuery({});
  const { data: categoryData }: any = useGetCategoryQuery({});

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
      if (Array.isArray(value)) {
        value.forEach((file) => {
          if (file?.originFileObj) {
            formData.append(key, file.originFileObj);
          }
        });
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
            <Form.Item<TCreateBlogTypes>
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
            <Form.Item<TCreateBlogTypes>
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
            <Form.Item<TCreateBlogTypes>
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
          </Col>

          <Col span={24} lg={12}>
            <Form.Item<TCreateBlogTypes>
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Slug is required" }]}
            >
              <Input placeholder="Slug" />
            </Form.Item>
          </Col>

          <Col span={12} lg={12}>
            <Form.Item<TCreateBlogTypes>
              label="Subtitle"
              name="subtitle"
              rules={[{ required: true, message: "Subtitle is required" }]}
            >
              <Input placeholder="Subtitle" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateBlogTypes>
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
          <Col span={4} lg={4}>
            <Form.Item<TCreateBlogTypes>
              name="isFeatured"
              valuePropName="checked"
            >
              <Checkbox>Is Featured</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24} lg={24}>
            <Form.Item<TCreateBlogTypes>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea placeholder="Description" rows={4} />
            </Form.Item>
          </Col>

          <Col span={24} lg={24}>
            <Form.Item<TCreateBlogTypes>
              label="Content"
              name="content"
              rules={[{ required: true, message: "Content is required" }]}
            >
              <Input.TextArea placeholder="Content" rows={6} />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item
              label="Blog Images"
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

export default CreateBlog;
