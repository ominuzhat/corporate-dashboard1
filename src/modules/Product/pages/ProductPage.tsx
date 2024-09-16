import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../app/features/modalSlice";
import { SearchComponent } from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../app/store";
import { PlusOutlined } from "@ant-design/icons";
import CreateProduct from "../components/CreateProduct";
import { Table } from "../../../common/CommonAnt";
import { useGetProductQuery } from "../api/ProductEndPoints";
import useColumns from "../utils/ProductUtils";

const ProductPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));
  const { data: ourServiceData, isLoading } = useGetProductQuery(filter);
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
                    title: "Add Product",
                    content: <CreateProduct />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Product
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your Product Name"
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

export default ProductPage;
