import { Col, Input, Row, Select } from "antd";
import React from "react";
import { Form } from "../../../../common/CommonAnt";
import { useGetWebServiceQuery } from "../../WebService/api/WebServiceEndPoints";
import { useCreateCategoryMutation } from "../api/CategoryEndPoints";
import { TCreateCategoryTypes } from "../types/CategoryTypes";

const CreateCategory = () => {
  const [create, { isLoading, isSuccess }] = useCreateCategoryMutation();
  const { data: webServiceData }: any = useGetWebServiceQuery({});

  const webServiceOptions = 
    webServiceData?.data?.map((service: any) => ({
      value: service?.id,
      label: service?.serviceId,
    })) || [];

  const onFinish = (values: any): void => {
    create(values);
  };
 
  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[10, 10]}>
          <Col lg={6}>
            <Form.Item<TCreateCategoryTypes>
              label="Web Service"
              name="webService"
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
            </Form.Item>
          </Col>
          <Col span={24} lg={24}>
            <Form.Item<TCreateCategoryTypes>
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

export default CreateCategory;
