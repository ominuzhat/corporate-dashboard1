import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Button, Card, Col, Row } from "antd";
import { SearchComponent } from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../app/store";
import { Table } from "../../../common/CommonAnt";
import { useEffect, useState } from "react";
import { useGetOfficeInfoQuery } from "../api/OfficeInfoEndPoints";
import useOfficeInfoColumns from "../utils/OfficeInfoUtils";
import { showModal } from "../../../app/features/modalSlice";
import { PlusOutlined } from "@ant-design/icons";
import CreateOfficeInfo from "../components/CreateOfficeInfo";

const OfficeInfoPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: oficeInfoData, isLoading } = useGetOfficeInfoQuery(filter);

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between">
          <Col lg={4}>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Add Office Info",
                    content: <CreateOfficeInfo />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Office Info
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Office Info"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={oficeInfoData?.total || 0}
        dataSource={oficeInfoData?.data || []}
        columns={useOfficeInfoColumns()}
      />
    </div>
  );
};

export default OfficeInfoPage;
