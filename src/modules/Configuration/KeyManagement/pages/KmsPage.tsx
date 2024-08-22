import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../../app/store";
import { PlusOutlined } from "@ant-design/icons";
import useColumns from "../utils/KmsUtils";
import { useGetKmsQuery } from "../api/KmsEndPoints";
import CreateKms from "../components/CreateKms";
import { Table } from "../../../../common/CommonAnt";

const KmsPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state?.filter,
    keyword: search,
  }));
  const { data: kmsData, isLoading } = useGetKmsQuery(filter);
console.log(kmsData )

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
                    title: "Add Kms",
                    content: <CreateKms />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Kms
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your Kms Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={kmsData?.total || 0}
        dataSource={kmsData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default KmsPage;
