import React, { useEffect } from "react";
import { Col, Form as AntForm, Input, Row, Button, Select } from "antd";
import { useUpdateKmsMutation } from "../api/KmsEndPoints";
import {
  TKmsDataTypes,
  TUpdateKmsTypes,
} from "../types/KmsTypes";
import { useGetWebServiceQuery } from "../../WebService/api/WebServiceEndPoints";

interface Props {
  record: TKmsDataTypes;
}

const UpdateKms: React.FC<Props> = ({ record }) => {
  const [update, { isLoading }] = useUpdateKmsMutation();
  const { data: webServiceData }: any = useGetWebServiceQuery({});
  const [form] = AntForm.useForm();

  const webServiceOptions =
    webServiceData?.data.map((service: any) => ({
      value: service.id,
      label: service.serviceId,
    })) || [];

  useEffect(() => {
    form.setFieldsValue({ clientId: record?.clientId });
  }, [record, form]);

  const onFinish = (values: TKmsDataTypes): void => {
    update({ id: record.id, data: values });
  };

  return (
    <React.Fragment>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
        <Col lg={6}>
            <AntForm.Item<TUpdateKmsTypes>
              label="Web Service"
              name="expirationDays"
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
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateKmsTypes>
              label="Name"
              name="clientId"
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

export default UpdateKms;
