import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import { RootState } from "../../../../app/store";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { Table } from "../../../../common/CommonAnt";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useGetTagQuery } from "../api/TagEndPoints";
import CreateTag from "../components/CreateTag";
import useColumns from "../utils/CategoryUtils";

const TagPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: tagData, isLoading } = useGetTagQuery(filter);

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
                    title: "Add Tag",
                    content: <CreateTag />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Tag
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your Tag Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={tagData?.total || 0}
        dataSource={tagData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default TagPage;
