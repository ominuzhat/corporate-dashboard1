import { Descriptions, DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useSingleWebServiceItemQuery } from "../api/WebServiceEndPoints";

const WebServiceView = () => {
  const { webServiceId } = useParams();
  const { data } = useSingleWebServiceItemQuery({ id: Number(webServiceId) });
  console.log(data)

  const { name, serviceId, url, user } = data?.data || {};

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: <div className="custom-label font-bold">name</div>,
      children: <div>{name}</div>,
    },   
    {
      key: "2",
      label: <div className="custom-label font-bold">Service Id</div>,
      children: <div>{serviceId}</div>,
    },        
    {
      key: "3",
      label: <div className="custom-label font-bold">Url</div>,
      children: <div>{url}</div>,
    },    
    {
      key: "4",
      label: <div className="custom-label font-bold">User Email</div>,
      children: <div>{user?.email}</div>,
    },    
    {
      key: "5",
      label: <div className="custom-label font-bold">Client Id</div>,
      children: <div>{user?.clientId}</div>,
    },
  ];
  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Descriptions
        bordered
        title={` Product Name :  ${name}`}
        // extra={
        //   <div className="space-x-5">
        //     <Button type="primary">Print</Button>
        //     <Button type="primary">Edit</Button>
        //   </div>
        // }
        items={borderedItems}
      />
    </div>
  );
};

export default WebServiceView;
