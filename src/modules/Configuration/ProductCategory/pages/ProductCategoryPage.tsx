import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import { RootState } from "../../../../app/store";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { Table } from "../../../../common/CommonAnt";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useGetProductCategoryQuery } from "../api/ProductCategoryEndPoints";
import CreateProductCategory from "../components/CreateProductCategory";
import useColumns from "../utils/ProductCategoryUtils";

const ProductCategoryPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: categoryData, isLoading } = useGetProductCategoryQuery(filter);

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
                    title: "Add ProductCategory",
                    content: <CreateProductCategory />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add ProductCategory
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your ProductCategory Name"
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

export default ProductCategoryPage;
