import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../../app/store";
import { PlusOutlined } from "@ant-design/icons";
import useColumns from "../utils/UserUtils";
import { useGetUserQuery } from "../api/UserEndPoints";
import CreateUser from "../components/CreateUser";
import { Table } from "../../../../common/CommonAnt";

const UserPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: sectionData, isLoading } = useGetUserQuery(filter);

  console.log(sectionData)

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
                    title: "Add User",
                    content: <CreateUser />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add User
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your User Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={sectionData?.total || 0}
        dataSource={sectionData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default UserPage;
