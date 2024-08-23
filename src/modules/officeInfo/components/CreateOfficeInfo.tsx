import { Card, Col, Input, Row, Select } from "antd";
import { Form } from "../../../common/CommonAnt";
import { useCreateOfficeInfoMutation } from "../api/OfficeInfoEndPoints";
import { TOfficeInfoData } from "../types/officeInfoTypes";
import { useGetWebServiceQuery } from "../../Configuration/WebService/api/WebServiceEndPoints";
import { TCreateCategoryTypes } from "../../Configuration/Category/types/CategoryTypes";

const CreateOfficeInfo = () => {
  const [create, { isLoading, isSuccess }] = useCreateOfficeInfoMutation();
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
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={16}>
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
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Owner Name"
              name="ownerName"
              rules={[
                { required: true, message: "Please select a Owner Name!" },
              ]}
            >
              <Input placeholder="Owner Name." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Brand Name"
              name="brandName"
              rules={[{ required: true, message: "brand Name!" }]}
            >
              <Input placeholder="brand Name." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="support Phone"
              name="supportPhone"
              rules={[{ required: true, message: "support Phone!" }]}
            >
              <Input addonBefore="+88" placeholder="support Phone." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="phone"
              name="phone"
              rules={[{ required: true, message: "phone!" }]}
            >
              <Input addonBefore="+88" placeholder="phone." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Hotline"
              name="hotline"
              rules={[{ required: true, message: "Hotline!" }]}
            >
              <Input addonBefore="+88" placeholder="Hotline." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Official Email"
              name="officialEmail"
              rules={[{ required: true, message: "official Email!" }]}
            >
              <Input placeholder="official Email." type="email" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Support Email"
              name="supportEmail"
              rules={[{ required: true, message: "Support Email!" }]}
            >
              <Input placeholder="Support Email." type="email" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Bin"
              name="bin"
              rules={[{ required: true, message: "Bin!" }]}
            >
              <Input placeholder="Bin." type="number" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Office Address"
              name="officeAddress"
              rules={[{ required: true, message: "Office Address!" }]}
            >
              <Input placeholder="Office Address." type="text" />
            </Form.Item>
          </Col>{" "}
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Secondary Office Address"
              name="secondaryOfficeAddress"
            >
              <Input placeholder="Scondary Office Address." type="text" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Latitude"
              name="latitude"
              rules={[{ required: true, message: "latitude !" }]}
            >
              <Input placeholder="latitude" type="number" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TOfficeInfoData>
              label="Longitude"
              name="longitude"
              rules={[{ required: true, message: "Longitude !" }]}
            >
              <Input placeholder="Longitude" type="number" />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item<TOfficeInfoData>
              label="Closed Day"
              name="closedDay"
              rules={[{ required: true, message: "Closed Day !" }]}
            >
              <Input placeholder="Sunday: Closed" />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item<TOfficeInfoData>
              label="Working Days and Time"
              name="workingDayAndTime"
              rules={[{ required: true, message: "Working Days and Time " }]}
            >
              <Input placeholder="Mon to Sat: 8am-9pm" />
            </Form.Item>
          </Col>
        </Row>
        <Card>
          <Row gutter={[16, 8]}>
            <Col lg={6}>
              <Form.Item<TOfficeInfoData> label="Facebook URL" name="facebook">
                <Input
                  addonBefore="https://"
                  placeholder="Facebook"
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<TOfficeInfoData> label="Twitter URL" name="twitter">
                <Input
                  addonBefore="https://"
                  placeholder="Twitter"
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<TOfficeInfoData>
                label="Instagram URL"
                name="instagram"
              >
                <Input
                  addonBefore="https://"
                  placeholder="Instagram"
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<TOfficeInfoData> label="linkedIn URL" name="linkedIn">
                <Input
                  addonBefore="https://"
                  placeholder="linkedIn"
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CreateOfficeInfo;
