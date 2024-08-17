import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Button, Card, Col, Row } from "antd";
import { SearchComponent } from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../app/store";
import { Table } from "../../../common/CommonAnt";
import { useState } from "react";
import { useGetProductQuery } from "../api/productEndPoints";
import useColumns from "../utils/ProductUtils";
import { showModal } from "../../../app/features/modalSlice";
import CreateProduct from "../components/CreateProduct";
import { PlusOutlined } from "@ant-design/icons";

const ProductPages = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: productData, isLoading } = useGetProductQuery(filter);

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
              placeholder="Enter Your Cart Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={productData?.total || 0}
        dataSource={productData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default ProductPages;
