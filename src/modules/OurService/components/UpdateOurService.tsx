import {
  Col,
  Input,
  Modal,
  Row,
  Select,
  Form as AntForm,
  Button,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  useSingleOurServiceItemQuery,
  useUpdateOurServiceMutation,
} from "../api/OurServiceEndPoints";
import { useGetCategoryQuery } from "../../Configuration/Category/api/CategoryEndPoints";
import { TOurServiceFAQ } from "../types/OurServiceTypes";

interface Props {
  record: any;
}

const UpdateOurService: React.FC<Props> = React.memo(({ record }) => {
  const { data: singleOurService } = useSingleOurServiceItemQuery({
    id: record?.id,
  });
  const { data: categoryData } = useGetCategoryQuery({});
  const [update, { isLoading }] = useUpdateOurServiceMutation();
  const [form] = AntForm.useForm();
  const [faqs, setFaqs] = useState<TOurServiceFAQ[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);

  useEffect(() => {
    if (singleOurService) {
      form.setFieldsValue({
        title: singleOurService.data.title || "",
        contentTitle: singleOurService.data.contentTitle || "",
        icon: singleOurService.data.icon || "",
        faqs: singleOurService.data.faqs || [],
        price: singleOurService.data.price || "",
        subtitle: singleOurService.data.subtitle || "",
        slug: singleOurService.data.slug || "",
        category: singleOurService.data.category?.id || "",
        content: singleOurService.data.content || "",
        description: singleOurService.data.description || "",
        keyPoints: singleOurService.data.keyPoints || [],
        addImages:
          singleOurService.data.images?.map(
            (image: { id: any; image: string }) => ({
              uid: image.id,
              url: image.image,
              thumbUrl: image.image,
              name: `Image-${image.id}`,
            })
          ) || [],
      });
      setFaqs(singleOurService.data.faqs || []);
    }
  }, [singleOurService, form]);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleRemove = (file: any) => {
    setRemovedImageIds((prev) => [...prev, file.uid]);
  };
  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);

  const removeFaq = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  const updateFaq = (
    index: number,
    field: keyof TOurServiceFAQ,
    value: string | number
  ) => {
    const updatedFaqs = [...faqs];
    if (field === "question" || field === "answer") {
      if (typeof value === "string") {
        updatedFaqs[index][field] = value;
      }
    } else if (field === "id") {
      if (typeof value === "number") {
        updatedFaqs[index][field] = value;
      }
    }

    setFaqs(updatedFaqs);
  };

  const onFinish = (values: any): void => {
    const formData: any = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "keyPoints") {
          formData.append(key, JSON.stringify(value));
        } else {
          value.forEach((file) => {
            if (file?.originFileObj) {
              formData.append(key, file.originFileObj);
            }
          });
        }
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    const faqsToAdd = faqs.filter((faq) => !faq.id);
    const faqsToDelete = singleOurService?.data?.faqs
      .map((faq: any) => faq.id)
      .filter((id: any) => !faqs.find((faq) => faq.id === id));

    formData.append("deleteImages", JSON.stringify(removedImageIds));
    formData.append("deleteFaqs", JSON.stringify(faqsToDelete));
    formData.append("addFaqs", JSON.stringify(faqsToAdd));

    update({
      id: record?.id,
      data: formData,
      successMessage: "Updated successfully!",
    });
  };

  return (
    <div>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>FAQs</h3>
            {faqs.map((faq, index) => (
              <Row key={index} gutter={16} className="my-2" align="middle">
                <Col span={11}>
                  <Input
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) =>
                      updateFaq(index, "question", e.target.value)
                    }
                  />
                </Col>
                <Col span={11}>
                  <Input
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  />
                </Col>
                <Col span={2}>
                  <Button
                    type="dashed"
                    icon={<MinusCircleOutlined />}
                    onClick={() => removeFaq(index)}
                  />
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              onClick={addFaq}
              style={{ width: "100%", marginTop: "10px" }}
            >
              <PlusOutlined /> Add FAQ
            </Button>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Category Name" name="category">
              <Select placeholder="Select a category">
                {categoryData?.data?.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Title" name="title">
              <Input placeholder="OurService Title." />
            </AntForm.Item>
          </Col>{" "}
          <Col lg={8}>
            <AntForm.Item label="ContentTitle" name="contentTitle">
              <Input placeholder="Content Title." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Price" name="price">
              <Input placeholder="20.60" />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Subtitle" name="subtitle">
              <Input placeholder="OurService Subtitle." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Slug" name="slug">
              <Input placeholder="OurService Slug." />
            </AntForm.Item>
          </Col>
          <Col lg={24}>
            <AntForm.Item label="Description" name="description">
              <Input placeholder="Description" />
            </AntForm.Item>
          </Col>
          <Col lg={24}>
            <AntForm.Item label="Content" name="content">
              <TextArea rows={4} placeholder="OurService content." />
            </AntForm.Item>
          </Col>{" "}
          <Col lg={24}>
            <AntForm.Item label="Icon" name="icon">
              <TextArea rows={4} placeholder="icon." />
            </AntForm.Item>
          </Col>
          <Col lg={16}>
            <AntForm.Item label="Key Points" name="keyPoints">
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Add key points"
                tokenSeparators={[","]}
              />
            </AntForm.Item>
          </Col>
          <Col lg={16}>
            <AntForm.Item
              label="OurService Images"
              name="addImages"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={20}
                listType="picture-card"
                onPreview={handlePreview}
                onRemove={handleRemove}
                showUploadList={{ showRemoveIcon: true }}
              >
                <PlusOutlined />
              </Upload>
            </AntForm.Item>
          </Col>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Row>
        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </AntForm.Item>
      </AntForm>
    </div>
  );
});

export default UpdateOurService;
