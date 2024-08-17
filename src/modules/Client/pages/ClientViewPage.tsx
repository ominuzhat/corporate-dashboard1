import { Card, Tabs, TabsProps } from "antd";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import ClientDetails from "../component/ClientDetails";
import ClientInvoice from "../component/ClientInvoice";
import ClientPayment from "../component/ClientPayment";
import ClientQuotation from "../component/ClientQuotation";
import ClientRefundProduct from "../component/ClientRefundProduct";
import ClientListOfUploadPassport from "../component/ClientListOfUploadPassport";

const ClientViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (key: string) => {
    navigate(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "details",
      label: "Details",
      children: <ClientDetails />,
    },
    {
      key: "invoice",
      label: <p>Invoice</p>,
      children: <ClientInvoice />,
    },
    {
      key: "payments",
      label: "Payments",
      children: <ClientPayment />,
    },
    {
      key: "quotation",
      label: "Quotation",
      children: <ClientQuotation />,
    },
    {
      key: "refund-product",
      label: "Refund Product",
      children: <ClientRefundProduct />,
    },
    {
      key: "list-of-upload-passports",
      label: "List of Upload Passports",
      children: <ClientListOfUploadPassport />,
    },
    {
      key: "Clients Ledger",
      label: "Clients Ledger",
      children: "Content of Tab Pane 4",
    },
  ];

  // Determine the active tab based on the current path
  const activeKey = location.pathname.split("/").pop() || "details";

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Tabs
          centered
          activeKey={activeKey}
          items={items}
          onChange={onChange}
          type="card"
        />
      </Card>
    </div>
  );
};

export default ClientViewPage;
