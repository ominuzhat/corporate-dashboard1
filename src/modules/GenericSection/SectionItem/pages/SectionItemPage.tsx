import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../../app/store";
import { PlusOutlined } from "@ant-design/icons";
import useColumns from "../utils/SectionItemUtils";
import { useGetSectionItemQuery } from "../api/SectionItemEndPoints";
import CreateSectionItem from "../components/CreateSectionItem";
import { Table } from "../../../../common/CommonAnt";

const SectionItemPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: sectionItemData, isLoading } = useGetSectionItemQuery(filter);
  console.log(sectionItemData)

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
                    title: "Add SectionItem",
                    content: <CreateSectionItem />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add SectionItem
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your SectionItem Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={sectionItemData?.total || 0}
        dataSource={sectionItemData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default SectionItemPage;
