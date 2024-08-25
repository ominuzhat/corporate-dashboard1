import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../app/features/modalSlice";
import { SearchComponent } from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../app/store";
import { PlusOutlined } from "@ant-design/icons";
import useColumns from "../utils/OurServiceUtils";
import { useGetOurServiceQuery } from "../api/OurServiceEndPoints";
import CreateOurService from "../components/CreateOurService";
import { Table } from "../../../common/CommonAnt";

const OurServicePage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: ourServiceData, isLoading } = useGetOurServiceQuery(filter);

  console.log(ourServiceData)

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
                    title: "Add OurService",
                    content: <CreateOurService />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add OurService
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your OurService Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={ourServiceData?.total || 0}
        dataSource={ourServiceData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default OurServicePage;
