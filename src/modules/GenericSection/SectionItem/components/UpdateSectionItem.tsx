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
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  useSingleSectionItemQuery,
  useUpdateSectionItemMutation,
} from "../api/SectionItemEndPoints";
import { useGetSectionQuery } from "../../Section/api/SectionEndPoints";

interface Props {
  record: any;
}

const UpdateSectionItem: React.FC<Props> = React.memo(({ record }) => {
  const { data: singleSectionItem } = useSingleSectionItemQuery({
    id: record?.id,
  });
  const { data: sectionData }: any = useGetSectionQuery({});
  const [update, { isLoading }] = useUpdateSectionItemMutation();
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);

  const sectionOptions =
    sectionData?.data?.map((section: any) => ({
      value: section?.id,
      label: `${section?.webService?.serviceId} - ${section?.sectionName}`,
    })) || [];

  useEffect(() => {
    if (singleSectionItem) {
      form.setFieldsValue({
        title: singleSectionItem.data.title || "",
        subtitle: singleSectionItem.data.subtitle || "",
        description: singleSectionItem.data.description || "",
        icon: singleSectionItem.data.icon || "",
        genericPageSection: singleSectionItem.data?.genericPageSection?.id,
        keyPoints: singleSectionItem.data.keyPoints || [],
        image: singleSectionItem.data.image
          ? [
              {
                uid: "-1",
                name: "Current Image",
                status: "done",
                url: singleSectionItem.data.image,
                thumbUrl: singleSectionItem.data.image,
              },
            ]
          : [],
      });
    }
  }, [singleSectionItem, form]);

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
            // If there's an existing image and no new upload, append the URL
            formData.append(key, value[0].url || value[0].thumbUrl);
          }
        }
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    update({ id: record?.id, data: formData });
  };

  return (
    <div>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col lg={6}>
            <AntForm.Item
              label="Page Section"
              name="genericPageSection"
              rules={[
                { required: true, message: "please select a Page Section" },
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
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Title" name="title">
              <Input placeholder="SectionItem Title." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Subtitle" name="subtitle">
              <Input placeholder="SectionItem Subtitle." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Description" name="description">
              <Input placeholder="Description" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={24}>
            <AntForm.Item
              label="Icon"
              name="icon"
              rules={[{ required: false }]}
            >
              <Input.TextArea placeholder="icon" rows={4} />
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

export default UpdateSectionItem;
