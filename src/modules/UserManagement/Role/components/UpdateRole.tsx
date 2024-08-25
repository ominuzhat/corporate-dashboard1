import React, { useEffect } from "react";
import { Col, Form as AntForm, Input, Row, Button, Select } from "antd";
import { useUpdateRoleMutation } from "../api/RoleEndPoints";
import { TRoleDataTypes, TCreateRoleTypes } from "../types/RoleTypes";

interface Props {
  record: TRoleDataTypes;
}

const UpdateRole: React.FC<Props> = ({ record }) => {
  const [update, { isLoading }] = useUpdateRoleMutation();
  const [form] = AntForm.useForm();

  useEffect(() => {
    form.setFieldsValue({ name: record?.name });
  }, [record, form]);

  const onFinish = (values: TRoleDataTypes): void => {
    update({ id: record.id, data: values });
  };

  return (
    <React.Fragment>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={24} lg={12}>
            <AntForm.Item<TCreateRoleTypes>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Name" />
            </AntForm.Item>
          </Col>
        </Row>
        <Col>
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

export default UpdateRole;
