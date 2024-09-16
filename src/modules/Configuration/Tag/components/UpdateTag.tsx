import { Form as AntForm, Button, Col, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useUpdateTagMutation } from "../api/TagEndPoints";
import { TCreateTag, TTagResponse } from "../types/TagTypes";

interface Props {
  record: TTagResponse;
}

const UpdateCategory: React.FC<Props> = ({ record }) => {
  const [update, { isLoading }] = useUpdateTagMutation();
  const [form] = AntForm.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: record?.name,
    });
  }, [record, form]);

  const onFinish = (values: TCreateTag): void => {
    update({
      id: record.id,
      data: values,
      successMessage: "Updated successfully!",
    });
  };

  return (
    <React.Fragment>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={24} lg={12}>
            <AntForm.Item<TCreateTag>
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

export default UpdateCategory;
