import { Col, Input, Row, Select, Upload, Modal } from "antd";
import React, { useState } from "react";
import { Form } from "../../../../common/CommonAnt";
import { useCreateUserMutation } from "../api/UserEndPoints";
import { TCreateUserTypes } from "../types/UserTypes";
import { PlusOutlined } from "@ant-design/icons";
import Iconify from "../../../../common/IconifyConfig/IconifyConfig";
import {
  emailValidator,
  passwordValidator,
} from "../../../../utilities/validator";
import { useGetRoleQuery } from "../../Role/api/RoleEndPoints";

const CreateUser = () => {
  const [create, { isLoading, isSuccess }] = useCreateUserMutation();
  const { data: roleData }: any = useGetRoleQuery({});

  const roleOptions =
    roleData?.data?.map((role: any) => ({
      value: role?.id,
      label: role?.name,
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
        <Col span={12} lg={12}>
            <Form.Item<TCreateUserTypes>
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "First Name is required" }]}
            >
              <Input placeholder="first name" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateUserTypes>
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Last Name is required" }]}
            >
              <Input placeholder="last name" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateUserTypes>
              label="Email"
              name="email"
              rules={[{ required: true }, { validator: emailValidator }]}
            >
              <Input placeholder="user@gmail.com" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateUserTypes>
              label="Password"
              name="password"
              rules={[{ required: true }, { validator: passwordValidator }]}
            >
              <Input.Password
                prefix={<Iconify name="ant-design:lock-outlined" />}
                placeholder="********"
              />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item<TCreateUserTypes>
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a Role" }]}
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
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<TCreateUserTypes>
              label="Phone No"
              name="phone"
              rules={[{ required: true, message: "Phone is required" }]}
            >
              <Input addonBefore="+088" placeholder="Phone No" type="text" />
            </Form.Item>
          </Col>
          <Col span={6} lg={6}>
            <Form.Item<TCreateUserTypes>
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
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateUserTypes>
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input.TextArea placeholder="Description" rows={4} />
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item
              label="User Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e.slice(-1) : e?.fileList.slice(-1)
              }
              rules={[{ required: true, message: "Please upload an image!" }]}
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

export default CreateUser;
