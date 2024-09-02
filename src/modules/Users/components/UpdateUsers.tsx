import React from "react";
import { Form } from "../../../common/CommonAnt";
import { Input } from "antd";
import {
  emailValidator,
  nameValidator,
  phoneValidator,
} from "../../../utilities/validator";
import { useUpdateUserMutation } from "../api/usersEndPoint";

interface Props {
  record: any;
}

const UpdateUsers: React.FC<Props> = React.memo(({ record }) => {
  const [update, { isLoading, isSuccess }] = useUpdateUserMutation();

  const onFinish = (value: any) => {
    update({ id: record.id, data: value });
  };

  return (
    <React.Fragment>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        defaultRecord={{ ...record }}
      >
        <Form.Item<any>
          label="User Name"
          name="owner_name"
          rules={[{ validator: nameValidator }]}
        >
          <Input placeholder="Enter your user name" />
        </Form.Item>

        <Form.Item<any>
          label="Email Address"
          name="email"
          rules={[{ validator: emailValidator }]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item<any>
          label="Phone Number"
          name="phone"
          rules={[{ validator: phoneValidator }]}
        >
          <Input addonBefore="+88" placeholder="017XXXXXXXX" />
        </Form.Item>

        <Form.Item<any> label="User Address" name="address">
          <Input placeholder="Address" />
        </Form.Item>
      </Form>
    </React.Fragment>
  );
});

export default UpdateUsers;
