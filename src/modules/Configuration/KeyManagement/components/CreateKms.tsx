import { Col, Input, Row, Select } from "antd";
import React from "react";
import { Form } from "../../../../common/CommonAnt";
import { useCreateKmsMutation } from "../api/KmsEndPoints";
import { TCreateKmsTypes } from "../types/KmsTypes";
import { useGetUsersQuery } from "../../../Users/api/usersEndpoint";

const CreateKms = () => {
  const [create, { isLoading, isSuccess }] = useCreateKmsMutation();
  const { data: userData }: any = useGetUsersQuery({});

  const userOptions =
    userData?.data.map((user: any) => ({
      value: user.clientId,
      label: `${user.email} - ${user.clientId}`,
    })) || [];

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[10, 10]}>
          <Col span={12} lg={12}>
            <Form.Item<TCreateKmsTypes>
              label="Web Service"
              name="clientId"
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
                options={userOptions}
              />
            </Form.Item>
          </Col>
          <Col span={12} lg={12}>
            <Form.Item<TCreateKmsTypes>
              label="Expiration Days"
              name="expirationDays"
              rules={[
                { required: true, message: "expiration days is required" },
              ]}
            >
              <Input placeholder="10" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default CreateKms;
