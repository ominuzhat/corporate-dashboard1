import {
  Col,
  Input,
  Modal,
  Row,
  Select,
  Form as AntForm,
  Button,
  Upload,
} from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  useSingleSectionQuery,
  useUpdateSectionMutation,
} from "../api/SectionEndPoints";
import { useGetWebServiceQuery } from "../../../Configuration/WebService/api/WebServiceEndPoints";

interface Props {
  record: any;
}

const UpdateSection: React.FC<Props> = React.memo(({ record }) => {
  const { data: singleSection } = useSingleSectionQuery({ id: record?.id });
  const { data: webServiceData }: any = useGetWebServiceQuery({});
  const [update, { isLoading }] = useUpdateSectionMutation();
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);
console.log(fileList)
  const webServiceOptions =
    webServiceData?.data.map((service: any) => ({
      value: service?.id,
      label: service?.serviceId,
    })) || [];

  useEffect(() => {
    if (singleSection) {
      form.setFieldsValue({
        title: singleSection.data.title || "",
        subtitle: singleSection.data.subtitle || "",
        sectionName: singleSection.data.sectionName || "",
        description: singleSection.data.description || "",
        icon: singleSection.data.icon || "",
        webService: singleSection.data?.webService?.id,
        keyPoints: singleSection.data.keyPoints || [],
        image: singleSection.data.image
          ? [
              {
                uid: "-1",
                name: "Current Image",
                status: "done",
                url: singleSection.data.image,
                thumbUrl: singleSection.data.image,
              },
            ]
          : [],
      });
    }
  }, [singleSection, form]);

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
    form.setFieldsValue({ image: fileList }); // Ensure form state is updated
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
              label="Web Service"
              name="webService"
              rules={[
                { required: true, message: "please select a web service" },
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
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Title" name="title">
              <Input placeholder="Section Title." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Subtitle" name="subtitle">
              <Input placeholder="Section Subtitle." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Description" name="description">
              <Input placeholder="Description" />
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
              label="Section Image"
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

export default UpdateSection;
