import { Form as AntForm, Button, Col, Input, Modal, Row, Upload } from "antd";
import React, { useEffect, useState } from "react";
import {
  useSingleProductCategoryItemQuery,
  useUpdateProductCategoryMutation,
} from "../api/ProductCategoryEndPoints";
import {
  TProductCategoryDataTypes,
  TUpdateProductCategoryTypes,
} from "../types/ProductCategoryTypes";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  record: TProductCategoryDataTypes;
}

const UpdateProductCategory: React.FC<Props> = ({ record }) => {
  const [update, { isLoading }] = useUpdateProductCategoryMutation();
  const { data: singleCategory } = useSingleProductCategoryItemQuery({
    id: record?.id,
  });
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);
  console.log(fileList);
  useEffect(() => {
    if (singleCategory) {
      form.setFieldsValue({
        name: singleCategory?.data?.name,
        icon: singleCategory?.data?.icon,
        subtitle: singleCategory?.data?.subtitle,
        color: singleCategory?.data?.color,
        image: singleCategory?.data.image
          ? [
              {
                uid: "-1",
                name: "Current Image",
                status: "done",
                url: singleCategory?.data.image,
                thumbUrl: singleCategory?.data.image,
              },
            ]
          : [],
      });
    }
  }, [singleCategory, form]);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    form.setFieldsValue({ image: fileList });
  };

  const onFinish = (values: any): void => {
    const formData: any = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "keyPoints") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "image") {
          if (value.some((file) => file.originFileObj)) {
            value.forEach((file) => {
              if (file?.originFileObj) {
                formData.append(key, file.originFileObj);
              }
            });
          } else if (value.length === 1) {
            formData.append(key, value[0].url || value[0].thumbUrl);
          }
        }
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    update({
      id: record?.id,
      data: formData,
      successMessage: "Updated successfully!",
    });
  };
  return (
    <React.Fragment>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={8} lg={8}>
            <AntForm.Item<TUpdateProductCategoryTypes>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Name" />
            </AntForm.Item>
          </Col>
          <Col span={8} lg={8}>
            <AntForm.Item<TUpdateProductCategoryTypes>
              label="Color"
              name="color"
              rules={[{ required: true, message: "color is required" }]}
            >
              <Input placeholder="color" />
            </AntForm.Item>
          </Col>
          <Col span={8} lg={8}>
            <AntForm.Item<TUpdateProductCategoryTypes>
              label="Subtitle"
              name="subtitle"
              rules={[{ required: true, message: "subtitle is required" }]}
            >
              <Input placeholder="subtitle" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={24}>
            <AntForm.Item<TUpdateProductCategoryTypes>
              label="Icon"
              name="icon"
              rules={[{ required: true, message: "icon is required" }]}
            >
              <Input placeholder="icon" />
            </AntForm.Item>
          </Col>
        </Row>
        <Col>
          <Col lg={16}>
            <AntForm.Item
              label="User Image"
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
                onChange={handleUploadChange}
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
          <AntForm.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </AntForm.Item>
        </Col>
      </AntForm>
    </React.Fragment>
  );
};

export default UpdateProductCategory;
