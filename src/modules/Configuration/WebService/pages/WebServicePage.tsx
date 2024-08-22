import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../../app/store";
import { PlusOutlined } from "@ant-design/icons";
import useColumns from "../utils/WebServiceUtils";
import { useGetWebServiceQuery } from "../api/WebServiceEndPoints";
import CreateWebService from "../components/CreateWebService";
import { Table } from "../../../../common/CommonAnt";

const WebServicePage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state?.filter,
    keyword: search,
  }));

  const { data: categoryData, isLoading } = useGetWebServiceQuery(filter);

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
                    title: "Add WebService",
                    content: <CreateWebService />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add WebService
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your WebService Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={categoryData?.total || 0}
        dataSource={categoryData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default WebServicePage;
