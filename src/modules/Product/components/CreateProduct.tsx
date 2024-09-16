import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  Form as AntForm,
} from "antd";
import React, { useState } from "react";
import { Form } from "../../../common/CommonAnt";
import { useCreateProductMutation } from "../api/ProductEndPoints";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetProductCategoryQuery } from "../../Configuration/ProductCategory/api/ProductCategoryEndPoints";
import { useGetTagQuery } from "../../Configuration/Tag/api/TagEndPoints";
import { TCreateProduct } from "../type/ProductTypes";

const quilModules: any = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const CreateProduct = () => {
  const [create, { isLoading, isSuccess }] = useCreateProductMutation();
  const { data: categoryData }: any = useGetProductCategoryQuery({});
  const { data: tagData }: any = useGetTagQuery({});
  const [description, setDescription] = useState("");

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState<any>(null);

  const categoryOptions =
    categoryData?.data?.map((service: any) => ({
      value: service?.id,
      label: service?.name,
    })) || [];

  const tagOptions =
    tagData?.data?.map((service: any) => ({
      value: service?.id,
      label: service?.name,
    })) || [];

  const handleFeaturedImageChange = (info: any) => {
    setFeaturedImage(info.fileList);
  };

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

    if (featuredImage.length > 0) {
      formData.append("featuredImage", featuredImage[0].originFileObj);
    }

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "priceOptions" || key === "tags" || key === "keyPoints") {
          formData.append(key, JSON.stringify(value));
        } else {
          value.forEach((item) => {
            formData.append(
              key,
              item.originFileObj ? item.originFileObj : (item as string)
            );
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
          <Col lg={8}>
            <Form.Item<TCreateProduct>
              label="Product Category"
              name="productCategory"
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
          <Col lg={8}>
            <Form.Item<TCreateProduct>
              label="Product Tag"
              name="tags"
              rules={[{ required: true, message: "Please select a Tag" }]}
            >
              <Select
                mode="multiple"
                showSearch
                placeholder="Select Tag"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={tagOptions}
              />
            </Form.Item>
          </Col>{" "}
          <Col span={24} lg={8}>
            <Form.Item<TCreateProduct>
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Slug is required" }]}
            >
              <Input placeholder="Slug" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateProduct>
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateProduct>
              label="Subtitle"
              name="subtitle"
              rules={[{ required: true, message: "Subtitle is required" }]}
            >
              <Input placeholder="Subtitle" />
            </Form.Item>
          </Col>{" "}
          <Col span={24} lg={8}>
            <Form.Item<TCreateProduct>
              label="live_link"
              name="live_link"
              rules={[{ required: true, message: "live_link is required" }]}
            >
              <Input placeholder="live_link" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TCreateProduct>
              label="Documented"
              name="is_documented"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                showSearch
                placeholder="Select Documented"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { label: "True", value: true },
                  { label: "False", value: false },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateProduct>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <ReactQuill
                value={description}
                onChange={setDescription}
                placeholder="Enter description here..."
                theme="snow"
                style={{ height: "200px" }}
                modules={quilModules}
              />
            </Form.Item>
          </Col>
          <div className="mt-10">
            <p>
              <span className="text-red-500">*</span> Price Options
            </p>
          </div>
          <Col span={24}>
            <AntForm.List name="priceOptions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Row gutter={[10, 10]} key={field.key}>
                      <Col span={8}>
                        <AntForm.Item
                          {...field}
                          label="Title"
                          name={[field.name, "title"]}
                          rules={[
                            {
                              required: true,
                              message: "title is required",
                            },
                          ]}
                        >
                          <Input placeholder="title" />
                        </AntForm.Item>
                      </Col>
                      <Col span={8}>
                        <AntForm.Item
                          {...field}
                          label="Price"
                          name={[field.name, "price"]}
                          rules={[
                            { required: true, message: "Price is required" },
                          ]}
                        >
                          <Input placeholder="Price" />
                        </AntForm.Item>
                      </Col>
                      <Col span={8}>
                        <AntForm.Item
                          {...field}
                          label="Price Per"
                          name={[field.name, "pricePer"]}
                          rules={[
                            { required: true, message: "pricePer is required" },
                          ]}
                        >
                          <Input placeholder="/month" />
                        </AntForm.Item>
                      </Col>
                      <Col span={8}>
                        <AntForm.Item
                          {...field}
                          label="Service Link"
                          name={[field.name, "serviceLink"]}
                          rules={[
                            {
                              required: true,
                              message: "serviceLink is required",
                            },
                          ]}
                        >
                          <Input placeholder="link" />
                        </AntForm.Item>
                      </Col>
                      <Col span={8}>
                        <AntForm.Item
                          {...field}
                          label="Discount Type"
                          name={[field.name, "discountType"]}
                          rules={[
                            { required: true, message: "Discount is required" },
                          ]}
                        >
                          <Select placeholder="Select Discount Type">
                            <Select.Option value="Percent">
                              Percent
                            </Select.Option>
                            <Select.Option value="Amount">Amount</Select.Option>
                          </Select>
                        </AntForm.Item>
                      </Col>

                      <Col span={4}>
                        <AntForm.Item
                          {...field}
                          label="Discount"
                          name={[field.name, "discount"]}
                          rules={[
                            {
                              required: true,
                              message: "Discount is required",
                            },
                          ]}
                        >
                          <Input placeholder="Discount" />
                        </AntForm.Item>
                      </Col>
                      <Col span={7}>
                        <AntForm.Item
                          {...field}
                          label="Support For"
                          name={[field.name, "support_for"]}
                          rules={[
                            {
                              required: true,
                              message: "Support period is required",
                            },
                          ]}
                        >
                          <Input placeholder="Support Period" />
                        </AntForm.Item>
                      </Col>

                      <Col span={12}>
                        <AntForm.Item
                          {...field}
                          label="Key Points"
                          name={[field.name, "keyPoints"]}
                          rules={[
                            {
                              required: true,
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
                        </AntForm.Item>
                      </Col>
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        className="ml-auto mb-auto"
                      />
                    </Row>
                  ))}
                  <AntForm.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Price Option
                    </Button>
                  </AntForm.Item>
                </>
              )}
            </AntForm.List>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item
              label="Featured Image"
              name="featuredImage"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
              rules={[
                { required: true, message: "Featured image is required!" },
              ]}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture-card"
                onChange={handleFeaturedImageChange}
                showUploadList={{ showRemoveIcon: true }}
              >
                <PlusOutlined />
              </Upload>
            </Form.Item>
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

export default CreateProduct;
