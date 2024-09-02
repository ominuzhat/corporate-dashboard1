import {
  Col,
  Input,
  Modal,
  Row,
  Select,
  Form as AntForm,
  Button,
  Upload,
  Switch,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  useSingleBlogItemQuery,
  useUpdateBlogMutation,
} from "../api/BlogEndPoints";
import { useGetCategoryQuery } from "../../Configuration/Category/api/CategoryEndPoints";

interface Props {
  record: any;
}

const UpdateBlog: React.FC<Props> = React.memo(({ record }) => {
  const [form] = AntForm.useForm();
  const { data: singleBlog } = useSingleBlogItemQuery({ id: record?.id });
  const { data: categoryData } = useGetCategoryQuery({});
  const [update, { isLoading }] = useUpdateBlogMutation();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);

  useEffect(() => {
    if (singleBlog) {
      form.setFieldsValue({
        title: singleBlog.data.title || "",
        subtitle: singleBlog.data.subtitle || "",
        slug: singleBlog.data.slug || "",
        category: singleBlog.data.category?.id || "",
        content: singleBlog.data.content || "",
        description: singleBlog.data.description || "",
        isFeatured: singleBlog.data.isFeatured || false,
        keyPoints: singleBlog.data.keyPoints || [],
        addImages:
          singleBlog.data.images?.map((image: { id: any; image: string }) => ({
            uid: image.id,
            url: image.image,
            thumbUrl: image.image,
            name: `Image-${image.id}`,
          })) || [],
      });
    }
  }, [singleBlog, form]);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleRemove = (file: any) => {
    setRemovedImageIds((prev) => [...prev, file.uid]);
    message.info(`Removed ${file.name}`);
  };

  const onFinish = (values: any): void => {
    const formData: any = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "keyPoints") {
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
            <AntForm.Item label="Category Name" name="category">
              <Select placeholder="Select a category">
                {categoryData?.data?.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Title" name="title">
              <Input placeholder="Blog Title." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Subtitle" name="subtitle">
              <Input placeholder="Blog Subtitle." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Slug" name="slug">
              <Input placeholder="Blog Slug." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Description" name="description">
              <Input placeholder="Description" />
            </AntForm.Item>
          </Col>
          <Col lg={16}>
            <AntForm.Item label="Content" name="content">
              <TextArea rows={4} placeholder="Blog content." />
            </AntForm.Item>
          </Col>
          <Col lg={16}>
            <AntForm.Item label="Key Points" name="keyPoints">
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Add key points"
                tokenSeparators={[","]}
              />
            </AntForm.Item>
          </Col>
          <Col lg={16}>
            <AntForm.Item
              label="Featured"
              name="isFeatured"
              valuePropName="checked"
            >
              <Switch />
            </AntForm.Item>
          </Col>
          <Col lg={16}>
            <AntForm.Item
              label="Blog Images"
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

export default UpdateBlog;
