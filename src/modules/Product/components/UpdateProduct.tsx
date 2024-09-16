import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Form as AntForm,
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import Card from "antd/es/card/Card";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetProductCategoryQuery } from "../../Configuration/ProductCategory/api/ProductCategoryEndPoints";
import {
  useSingleProductItemQuery,
  useUpdateProductMutation,
} from "../api/ProductEndPoints";
import { TPriceOptionData } from "../type/ProductTypes";
import { useGetTagQuery } from "../../Configuration/Tag/api/TagEndPoints";

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

interface Props {
  record: any;
}

const UpdateProduct: React.FC<Props> = React.memo(({ record }) => {
  const { data: singleProduct } = useSingleProductItemQuery({
    id: record?.id,
  });
  const { data: productCategoryData } = useGetProductCategoryQuery({});
  const { data: tagData } = useGetTagQuery({});
  const [update, { isLoading }] = useUpdateProductMutation();
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  const [deletePriceOptions, setDeletePriceOptions] = useState<number[]>([]);
  const [featuredImage, setFeaturedImage] = useState<any>([]);

  useEffect(() => {
    if (singleProduct) {
      setDescription(singleProduct.data.description || "");
      form.setFieldsValue({
        title: singleProduct.data.title || "",
        productCategory: singleProduct.data.productCategory?.id || "",
        subtitle: singleProduct.data.subtitle || "",
        tags: singleProduct?.data?.tags?.map((tag: any) => tag.id) || [],
        slug: singleProduct.data.slug || "",
        description: singleProduct.data.description || "",
        addPriceOptions:
          singleProduct.data?.priceOptions?.map((option: TPriceOptionData) => ({
            id: option.id,
            discount: option.discount,
            discountType: option.discountType,
            price: option.price,
            support_for: option.support_for,
            title: option.title,
            pricePer: option.pricePer,
            serviceLink: option.serviceLink,
            keyPoints: option.keyPoints,
          })) || [],
        live_link: singleProduct.data.live_link || "",
        featuredImage:
          [
            {
              uid: singleProduct?.data?.featuredImage,
              url: singleProduct?.data?.featuredImage,
              thumbUrl: singleProduct?.data?.featuredImage,
              name: `Image-${singleProduct?.data?.featuredImage}`,
            },
          ] || [],
        is_documented: singleProduct.data.is_documented || false,
        addImages:
          singleProduct.data?.images?.map(
            (image: { id: any; image: string }) => ({
              uid: image.id,
              url: image.image,
              thumbUrl: image.image,
              name: `Image-${image.id}`,
            })
          ) || [],
      });
    }
  }, [singleProduct, form]);

  const tagOptions =
    tagData?.data?.map((service: any) => ({
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
  const handleFeaturedImageChange = (info: any) => {
    setFeaturedImage(info.fileList);
  };
  const handleRemove = (file: any) => {
    setRemovedImageIds((prev) => [...prev, file.uid]);
  };

  const onFinish = (values: any): void => {
    const formData: any = new FormData();

    if (featuredImage?.length > 0) {
      formData.append("featuredImage", featuredImage[0]?.originFileObj);
    }

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (
          key === "keyPoints" ||
          key === "addPriceOptions" ||
          key === "keyPoints" ||
          key === "tags"
        ) {
          formData.append(key, JSON.stringify(value));
        } else {
          value.forEach((file) => {
            if (file?.originFileObj) {
              formData.append(key, file.originFileObj);
            }
          });
        }
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    formData.append("deleteImages", JSON.stringify(removedImageIds));
    formData.append("deletePriceOptions", JSON.stringify(deletePriceOptions));

    update({
      id: record?.id,
      data: formData,
      successMessage: "Updated successfully!",
    });
  };

  return (
    <div>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col lg={8}>
            <AntForm.Item label="Category Name" name="productCategory">
              <Select placeholder="Select a productCategory">
                {productCategoryData?.data?.map((productCategory) => (
                  <Select.Option
                    key={productCategory.id}
                    value={productCategory.id}
                  >
                    {productCategory.name}
                  </Select.Option>
                ))}
              </Select>
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item
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
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Title" name="title">
              <Input placeholder="Product Title." />
            </AntForm.Item>
          </Col>{" "}
          <Col lg={8}>
            <AntForm.Item label="Subtitle" name="subtitle">
              <Input placeholder="Product Subtitle." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Slug" name="slug">
              <Input placeholder="Product Slug." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Live Link" name="live_link">
              <Input placeholder="Live Link." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Documented" name="is_documented">
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
            </AntForm.Item>
          </Col>
          <Col lg={24}>
            <AntForm.Item label="Description" name="description">
              <ReactQuill
                value={description}
                onChange={setDescription}
                placeholder="Enter description here..."
                theme="snow"
                style={{ height: "200px" }}
                modules={quilModules}
              />
            </AntForm.Item>
          </Col>
          <div className="mt-10 mb-5">Price Options</div>
          <Col span={24}>
            <AntForm.List name="addPriceOptions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Card className="my-5">
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
                              {
                                required: true,
                                message: "pricePer is required",
                              },
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
                              {
                                required: true,
                                message: "Discount is required",
                              },
                            ]}
                          >
                            <Select placeholder="Select Discount Type">
                              <Select.Option value="Percent">
                                Percent
                              </Select.Option>
                              <Select.Option value="Amount">
                                Amount
                              </Select.Option>
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
                          </AntForm.Item>
                        </Col>
                        <MinusCircleOutlined
                          onClick={() => {
                            const priceOptionId = form.getFieldValue([
                              "addPriceOptions",
                              field.name,
                              "id",
                            ]);
                            if (priceOptionId) {
                              setDeletePriceOptions((prev) => [
                                ...prev,
                                priceOptionId,
                              ]);
                            }
                            remove(field.name);
                          }}
                          className="ml-auto mb-auto"
                        />
                      </Row>
                    </Card>
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
          <div className="w-2 my-5"></div>
          <Col span={24} lg={24}>
            <AntForm.Item
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
            </AntForm.Item>
          </Col>
          <Col lg={16}>
            <AntForm.Item
              label="Product Images"
              name="addImages"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={20}
                listType="picture-card"
                onPreview={handlePreview}
                onRemove={handleRemove}
                showUploadList={{ showRemoveIcon: true }}
              >
                <PlusOutlined />
              </Upload>
            </AntForm.Item>
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
        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </AntForm.Item>
      </AntForm>
    </div>
  );
});

export default UpdateProduct;
