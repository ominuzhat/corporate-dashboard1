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
  useUpdateSectionMutation,
} from "../api/SectionEndPoints";
import { useGetWebServiceQuery } from "../../../Configuration/WebService/api/WebServiceEndPoints";

interface Props {
  record: any;
}

const UpdateSection: React.FC<Props> = React.memo(({ record }) => {
  const { data: singleSection } = useSingleSectionItemQuery({ id: record?.id });
  const { data: webServiceData }: any = useGetWebServiceQuery({});
  const [update, { isLoading }] = useUpdateSectionMutation();
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

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
        image:
          singleSection.data.images?.map(
            (image: { id: any; image: string }) => ({
              uid: image.id,
              url: image.image,
              thumbUrl: image.image,
              name: `Image-${image.id}`,
            })
          ) || [],
      });
      setFileList(
        singleSection.data.images?.map((image: { id: any; image: string }) => ({
          uid: image.id,
          url: image.image,
          thumbUrl: image.image,
          name: `Image-${image.id}`,
        })) || []
      );
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

  const handleRemove = (file: any) => {
    setRemovedImageIds((prev) => [...prev, file.uid]);
    message.info(`Removed ${file.name}`);
  };

  const handleUploadChange = ({ fileList }: any) => setFileList(fileList);

  const onFinish = (values: any): void => {
    const formData: any = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "keyPoints") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "addImages") {
          if (fileList.some((file) => file.originFileObj)) {
            value.forEach((file) => {
              if (file?.originFileObj) {
                formData.append(key, file.originFileObj);
              }
            });
          }
        }
      } else {
        formData.append(key, value as string | Blob);
      }
    });
    formData.append("deleteImages", JSON.stringify(removedImageIds));
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
              label="Featured"
              name="isFeatured"
              valuePropName="checked"
            >
              <Switch />
            </AntForm.Item>
          </Col>
          <Col lg={16}>
            <AntForm.Item
              label="Section Images"
              name="addImages"
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
                onRemove={handleRemove}
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
