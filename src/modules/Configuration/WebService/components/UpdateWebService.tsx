import React, { useEffect } from "react";
import { Col, Form as AntForm, Input, Row, Button } from "antd";
import { useUpdateWebServiceMutation } from "../api/WebServiceEndPoints";
import {
  TWebServiceDataTypes,
  TCreateWebServiceTypes,
} from "../types/WebServiceTypes";

interface Props {
  record: TWebServiceDataTypes;
}

const UpdateWebService: React.FC<Props> = ({ record }) => {
  const [update, { isLoading }] = useUpdateWebServiceMutation();
  const [form] = AntForm.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: record?.name,
      url: record?.url,
      description: record?.description,
    });
  }, [record, form]);

  const onFinish = (values: TWebServiceDataTypes): void => {
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
          <Col span={12} lg={12}>
            <AntForm.Item<TCreateWebServiceTypes>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Name" />
            </AntForm.Item>
          </Col>
          <Col span={12} lg={12}>
            <AntForm.Item<TCreateWebServiceTypes>
              label="Url"
              name="url"
              rules={[{ required: true, message: "Url is required" }]}
            >
              <Input placeholder="url" />
            </AntForm.Item>
          </Col>
          <Col span={12} lg={12}>
            <AntForm.Item<TCreateWebServiceTypes>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input placeholder="description" />
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

export default UpdateWebService;
