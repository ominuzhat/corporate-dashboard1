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
  useSingleUserQuery,
  useUpdateUserMutation,
} from "../api/UserEndPoints";
import { TUpdateUserTypes } from "../types/UserTypes";
import { useGetRoleQuery } from "../../Role/api/RoleEndPoints";

interface Props {
  record: any;
}

const UpdateUser: React.FC<Props> = React.memo(({ record }) => {
  const { data: singleUser } = useSingleUserQuery({ id: record?.id });
  const [update, { isLoading }] = useUpdateUserMutation();
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { data: roleData }: any = useGetRoleQuery({});

  const roleOptions =
    roleData?.data?.map((role: any) => ({
      value: role?.id,
      label: role?.name,
    })) || [];

  useEffect(() => {
    if (singleUser) {
      form.setFieldsValue({
        firstName: singleUser.data.firstName || "",
        lastName: singleUser.data.lastName || "",
        phone: singleUser.data.details.phone || "",
        address: singleUser.data.details.address || "",
        gender: singleUser.data.details.gender || "",
        role: singleUser.data?.role?.name || null,
        keyPoints: singleUser.data.keyPoints || [],
        image: singleUser.data.details.image
          ? [
              {
                uid: "-1",
                name: "Current Image",
                status: "done",
                url: singleUser.data.details.image,
                thumbUrl: singleUser.data.details.image,
              },
            ]
          : [],
      });
    }
  }, [singleUser, form]);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleUploadChange = ({ fileList }: any) => {
    form.setFieldsValue({ image: fileList });
  };

  const onFinish = (values: any): void => {
    const formData: any = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "image") {
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

    update({ id: record?.id, data: formData });
  };

  return (
    <div>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12} lg={12}>
            <AntForm.Item<TUpdateUserTypes>
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "First Name is required" }]}
            >
              <Input placeholder="first name" />
            </AntForm.Item>
          </Col>
          <Col span={12} lg={12}>
            <AntForm.Item<TUpdateUserTypes>
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Last Name is required" }]}
            >
              <Input placeholder="last name" />
            </AntForm.Item>
          </Col>
          <Col lg={6}>
            <AntForm.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "please select a Role" }]}
            >
              <Select
                showSearch
                placeholder="Select Role"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={roleOptions}
              />
            </AntForm.Item>
          </Col>
          <Col lg={12}>
            <AntForm.Item<TUpdateUserTypes>
              label="Phone No"
              name="phone"
              rules={[{ required: true, message: "Phone is required" }]}
            >
              <Input addonBefore="+088" placeholder="Phone No" type="text" />
            </AntForm.Item>
          </Col>
          <Col span={6} lg={6}>
            <AntForm.Item<TUpdateUserTypes>
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please input your Date!" }]}
            >
              <Select
                showSearch
                placeholder="Gender"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={24}>
            <AntForm.Item<TUpdateUserTypes>
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input.TextArea placeholder="Description" rows={4} />
            </AntForm.Item>
          </Col>
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

export default UpdateUser;
