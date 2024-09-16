import { Col, Input, Row } from "antd";
import React from "react";
import { Form } from "../../../../common/CommonAnt";
import { useCreateTagMutation } from "../api/TagEndPoints";
import { TCreateTag } from "../types/TagTypes";

const CreateTag = () => {
  const [create, { isLoading, isSuccess }] = useCreateTagMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[10, 10]}>
          <Col span={24} lg={24}>
            <Form.Item<TCreateTag>
              label="name"
              name="name"
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default CreateTag;
