import React from "react";
import { Col, Input, Row, Select } from "antd";
import { TCreateWebServiceTypes } from "../types/WebServiceTypes";
import { Form } from "../../../../common/CommonAnt";
import { useCreateWebServiceMutation } from "../api/WebServiceEndPoints";
import TextArea from "antd/es/input/TextArea";
import { useGetUserQuery } from "../../../UserManagement/User/api/UserEndPoints";
import { useGetProfileQuery } from "../../../Profile/api/profileEndpoint";
import { constant } from "../../../../common/constant/Constant";

const CreateWebService = () => {
  const [create, { isLoading, isSuccess }] = useCreateWebServiceMutation();
  const { data: userData }: any = useGetUserQuery({});
  const { data: profileData } = useGetProfileQuery();

  const { role } = profileData?.data || {};

  const userOptions =
    userData?.data?.map((user: any) => ({
      value: user?.id,
      label: user?.email,
    })) || [];

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[10, 10]}>
          {role?.name === constant.ROLE && (
            <Col lg={8}>
              <Form.Item<TCreateWebServiceTypes>
                label="User"
                name="user"
                rules={[{ required: true, message: "please select a user" }]}
              >
                <Select
                  showSearch
                  placeholder="Select user"
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
          )}
          <Col span={12} lg={8}>
            <Form.Item<TCreateWebServiceTypes>
              label="Name"
              name="name"
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={12} lg={8}>
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
