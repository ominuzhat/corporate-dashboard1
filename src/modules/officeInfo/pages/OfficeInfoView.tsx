import { Descriptions, DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useSingleOfficeInfoQuery } from "../api/OfficeInfoEndPoints";

const OfficeInfoView = () => {
  const { officeInfoId } = useParams();
  const { data } = useSingleOfficeInfoQuery({ id: Number(officeInfoId) });

  const {
    phone,
    officialEmail,
    supportEmail,
    supportPhone,
    ownerName,
    brandName,
    workingDayAndTime,
    closedDay,
    bin,
    hotline,
    officeAddress,
    secondaryOfficeAddress,
    latitude,
    longitude,
    linkedIn,
    facebook,
    twitter,
    instagram,
  } = data?.data || {};


  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: <div className="custom-label font-bold">Phone</div>,
      children: <div>{phone}</div>,
    },
    {
      key: "2",
      label: <div className="custom-label font-bold">Official Email</div>,
      children: <div>{officialEmail}</div>,
    },
    {
      key: "3",
      label: <div className="custom-label font-bold">Support Email</div>,
      children: <div>{supportEmail}</div>,
    },
    {
      key: "4",
      label: <div className="custom-label font-bold">Support Phone</div>,
      children: <div>{supportPhone}</div>,
    },
    {
      key: "5",
      label: <div className="custom-label font-bold">Owner Name</div>,
      children: <div>{ownerName}</div>,
    },
    {
      key: "6",
      label: <div className="custom-label font-bold">Brand Name</div>,
      children: <div>{brandName}</div>,
    },
    {
      key: "7",
      label: <div className="custom-label font-bold">Working Days and Time</div>,
      children: <div>{workingDayAndTime}</div>,
    },
    {
      key: "8",
      label: <div className="custom-label font-bold">Closed Day</div>,
      children: <div>{closedDay}</div>,
    },
    {
      key: "9",
      label: <div className="custom-label font-bold">BIN</div>,
      children: <div>{bin}</div>,
    },
    {
      key: "10",
      label: <div className="custom-label font-bold">Hotline</div>,
      children: <div>{hotline}</div>,
    },
    {
      key: "11",
      label: <div className="custom-label font-bold">Office Address</div>,
      children: <div>{officeAddress}</div>,
    },
    {
      key: "12",
      label: <div className="custom-label font-bold">Secondary Office Address</div>,
      children: <div>{secondaryOfficeAddress}</div>,
    },
    {
      key: "13",
      label: <div className="custom-label font-bold">Latitude</div>,
      children: <div>{latitude}</div>,
    },
    {
      key: "14",
      label: <div className="custom-label font-bold">Longitude</div>,
      children: <div>{longitude}</div>,
    },
    {
      key: "15",
      label: <div className="custom-label font-bold">LinkedIn</div>,
      children: <div>{linkedIn}</div>,
    },
    {
      key: "16",
      label: <div className="custom-label font-bold">Facebook</div>,
      children: <div>{facebook}</div>,
    },
    {
      key: "17",
      label: <div className="custom-label font-bold">Twitter</div>,
      children: <div>{twitter}</div>,
    },
    {
      key: "18",
      label: <div className="custom-label font-bold">Instagram</div>,
      children: <div>{instagram}</div>,
    },
  ];

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Descriptions
        bordered
        title={`Office Info: ${brandName}`}
        items={borderedItems}
      />
    </div>
  );
};

export default OfficeInfoView;
