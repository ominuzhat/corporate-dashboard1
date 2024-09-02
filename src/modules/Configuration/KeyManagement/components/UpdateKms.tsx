import React, { useEffect } from "react";
import { Col, Form as AntForm, Input, Row, Button, Select } from "antd";
import { useUpdateKmsMutation } from "../api/KmsEndPoints";
import { TKmsDataTypes, TUpdateKmsTypes } from "../types/KmsTypes";
import { useGetUsersQuery } from "../../../Users/api/usersEndPoint";

interface Props {
  record: TKmsDataTypes;
}

const UpdateKms: React.FC<Props> = ({ record }) => {
  const [update, { isLoading }] = useUpdateKmsMutation();
  const { data: userData }: any = useGetUsersQuery({});

  const [form] = AntForm.useForm();

  const userOptions =
    userData?.data.map((user: any) => ({
      value: user.clientId,
      label: `${user.email} - ${user.clientId}`,
    })) || [];

  useEffect(() => {
    form.setFieldsValue({ clientId: record?.clientId });
  }, [record, form]);

  const onFinish = (values: TKmsDataTypes): void => {
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
          <Col lg={6}>
            <AntForm.Item<TUpdateKmsTypes>
              label="Client Id"
              name="clientId"
              rules={[{ required: true, message: "please select a Client Id" }]}
            >
              <Select
                showSearch
                placeholder="Select Client Id"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userOptions}
              />
            </AntForm.Item>
          </Col>
          <Col span={6} lg={6}>
            <AntForm.Item<TUpdateKmsTypes>
              label="Expiration Days"
              name="expirationDays"
              rules={[
                { required: true, message: "expiration days is required" },
              ]}
            >
              <Input placeholder="10" />
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
