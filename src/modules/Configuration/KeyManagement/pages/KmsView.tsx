import { Descriptions, DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useSingleKmsItemQuery } from "../api/KmsEndPoints";

const KmsView = () => {
  const { kmsId } = useParams();
  const { data } = useSingleKmsItemQuery({ id: Number(kmsId) });

  const { apiKey, clientId, expiresAt, updatedAt } = data?.data || {};

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: <div className="custom-label font-bold">Api Key</div>,
      children: <div>{apiKey}</div>,
      span: 3,
    },
    {
      key: "2",
      label: <div className="custom-label font-bold">Client Id</div>,
      children: <div>{clientId}</div>,
    },
    {
      key: "3",
      label: <div className="custom-label font-bold">Expires At</div>,
      children: <div>{expiresAt}</div>,
    },
    {
      key: "4",
      label: <div className="custom-label font-bold">Updated At</div>,
      children: <div>{updatedAt}</div>,
    },
  ];
  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Descriptions
        column={3}
        bordered
        title={`Key of Client:  ${clientId}`}
        items={borderedItems}
      />
    </div>
  );
};

export default KmsView;
