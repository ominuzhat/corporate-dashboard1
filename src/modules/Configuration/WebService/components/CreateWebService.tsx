import React from "react";
import { Col, Input, Row } from "antd";
import { TCreateWebServiceTypes } from "../types/WebServiceTypes";
import { Form } from "../../../../common/CommonAnt";
import { useCreateWebServiceMutation } from "../api/WebServiceEndPoints";
import TextArea from "antd/es/input/TextArea";

const CreateWebService = () => {
  const [create, { isLoading, isSuccess }] = useCreateWebServiceMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[10, 10]}>
          <Col span={12} lg={12}>
            <Form.Item<TCreateWebServiceTypes>
              label="Name"
              name="name"
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateWebServiceTypes>
              label="Url"
              name="url"
              rules={[{ required: true, message: "url is required" }]}
            >
              <Input placeholder="url" />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateWebServiceTypes>
              label="Description"
              name="description"
              rules={[{ required: false }]}
            >
              <TextArea placeholder="Description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default CreateWebService;
