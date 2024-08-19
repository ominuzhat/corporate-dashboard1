import { Card, Col, DatePicker, Input, Row, Select } from "antd";
import { Form } from "../../../common/CommonAnt";
import { useCreateOfficeInfoMutation } from "../api/OfficeInfoEndPoints";
import { TOfficeInfoData } from "../types/officeInfoTypes";
import moment from "moment";
import { CalendarOutlined } from "@ant-design/icons";

const CreateOfficeInfo = () => {
  const [create, { isLoading, isSuccess }] = useCreateOfficeInfoMutation();

  const onFinish = (values: any): void => {
    console.log("va", values);

    // const formData: FormData = new FormData();

    // Object.entries(values).forEach(([key, value]) => {
    //   if (Array.isArray(value)) {
    //     value.forEach((file) => {
    //       if (file?.originFileObj) {
    //         formData.append(key, file.originFileObj);
    //       }
    //     });
    //   } else {
    //     formData.append(key, value as string | Blob);
    //   }
    // });

    create(values);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={16}>
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
          {/* <Col lg={24}>
            <Form.Item<TOfficeInfoData>
              label="Images"
              name="images"
              rules={[{ required: true, message: "Product Images !" }]}
            >
              <Upload
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                accept=".png,.jpeg,.doc"
                onChange={handleChange}
                beforeUpload={(file) => {
                  // Handle file upload here if needed
                  // For example, you can add validation or processing here
                  return false; // Prevent the default upload behavior
                }}
              >
                {fileList.length >= 20 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>
          </Col> */}
          {/* <Form.Item
            label="Product Images"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            rules={[{ required: true, message: "Product Images !" }]}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={20}
              listType="picture-card"
              onPreview={handlePreview}
              showUploadList={{ showRemoveIcon: true }}
            >
              <PlusOutlined />
            </Upload>
          </Form.Item>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal> */}
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
