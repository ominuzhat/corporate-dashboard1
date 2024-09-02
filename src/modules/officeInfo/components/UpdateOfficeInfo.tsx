import React, { useEffect } from "react";
import { Col, Form as AntForm, Input, Row, Button, Select } from "antd";
import { useUpdateOfficeInfoMutation } from "../api/OfficeInfoEndPoints";
import {
  TOfficeInfoData,
  TUpdateOfficeInfoTypes,
} from "../types/officeInfoTypes";
import { useGetWebServiceQuery } from "../../Configuration/WebService/api/WebServiceEndPoints";

interface Props {
  record: TOfficeInfoData;
}

const UpdateOfficeInfo: React.FC<Props> = ({ record }) => {
  const [update, { isLoading }] = useUpdateOfficeInfoMutation();
  const { data: webServiceData }: any = useGetWebServiceQuery({});
  const [form] = AntForm.useForm();

  const webServiceOptions =
    webServiceData?.data.map((service: any) => ({
      value: service?.id,
      label: service?.serviceId,
    })) || [];

  useEffect(() => {
    form.setFieldsValue({
      webService: record?.webService?.id,
      phone: record?.phone,
      supportEmail: record?.supportEmail,
      officialEmail: record?.officialEmail,
      supportPhone: record?.supportPhone,
      ownerName: record?.ownerName,
      brandName: record?.brandName,
      workingDayAndTime: record?.workingDayAndTime,
      closedDay: record?.closedDay,
      bin: record?.bin,
      hotline: record?.hotline,
      officeAddress: record?.officeAddress,
      secondaryOfficeAddress: record?.secondaryOfficeAddress,
      latitude: record?.latitude,
      longitude: record?.longitude,
      linkedIn: record?.linkedIn,
      instagram: record?.instagram,
      facebook: record?.facebook,
      twitter: record?.twitter,
    });
  }, [record, form]);

  const onFinish = (): void => {
    update({
      id: record.id,
      data: form.getFieldsValue(),
    });
  };

  return (
    <React.Fragment>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col lg={6}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Web Service"
              name="webService"
              rules={[
                { required: true, message: "Please select a web service" },
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
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Phone is required" }]}
            >
              <Input placeholder="Phone" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Support Email"
              name="supportEmail"
              rules={[{ required: true, message: "Support Email is required" }]}
            >
              <Input placeholder="Support Email" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Official Email"
              name="officialEmail"
              rules={[
                { required: true, message: "Official Email is required" },
              ]}
            >
              <Input placeholder="Official Email" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Support Phone"
              name="supportPhone"
              rules={[{ required: true, message: "Support Phone is required" }]}
            >
              <Input placeholder="Support Phone" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Owner Name"
              name="ownerName"
              rules={[{ required: true, message: "Owner Name is required" }]}
            >
              <Input placeholder="Owner Name" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Brand Name"
              name="brandName"
              rules={[{ required: true, message: "Brand Name is required" }]}
            >
              <Input placeholder="Brand Name" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Working Day and Time"
              name="workingDayAndTime"
              rules={[
                { required: true, message: "Working Day and Time is required" },
              ]}
            >
              <Input placeholder="Working Day and Time" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Closed Day"
              name="closedDay"
              rules={[{ required: true, message: "Closed Day is required" }]}
            >
              <Input placeholder="Closed Day" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="BIN"
              name="bin"
              rules={[{ required: true, message: "BIN is required" }]}
            >
              <Input placeholder="BIN" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Hotline"
              name="hotline"
              rules={[{ required: true, message: "Hotline is required" }]}
            >
              <Input placeholder="Hotline" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Office Address"
              name="officeAddress"
              rules={[
                { required: true, message: "Office Address is required" },
              ]}
            >
              <Input placeholder="Office Address" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Secondary Office Address"
              name="secondaryOfficeAddress"
              rules={[
                {
                  required: true,
                  message: "Secondary Office Address is required",
                },
              ]}
            >
              <Input placeholder="Secondary Office Address" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Latitude"
              name="latitude"
              rules={[{ required: true, message: "Latitude is required" }]}
            >
              <Input placeholder="Latitude" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Longitude"
              name="longitude"
              rules={[{ required: true, message: "Longitude is required" }]}
            >
              <Input placeholder="Longitude" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="LinkedIn"
              name="linkedIn"
              rules={[{ required: true, message: "LinkedIn is required" }]}
            >
              <Input placeholder="LinkedIn" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Instagram"
              name="instagram"
              rules={[{ required: true, message: "Instagram is required" }]}
            >
              <Input placeholder="Instagram" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Facebook"
              name="facebook"
              rules={[{ required: true, message: "Facebook is required" }]}
            >
              <Input placeholder="Facebook" />
            </AntForm.Item>
          </Col>
          <Col span={24} lg={12}>
            <AntForm.Item<TUpdateOfficeInfoTypes>
              label="Twitter"
              name="twitter"
              rules={[{ required: true, message: "Twitter is required" }]}
            >
              <Input placeholder="Twitter" />
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

export default UpdateOfficeInfo;
