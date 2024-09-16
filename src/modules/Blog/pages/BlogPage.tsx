import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../app/features/modalSlice";
import { SearchComponent } from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../app/store";
import { PlusOutlined } from "@ant-design/icons";
import useColumns from "../utils/BlogUtils";
import { useGetBlogQuery } from "../api/BlogEndPoints";
import CreateBlog from "../components/CreateBlog";
import { Table } from "../../../common/CommonAnt";

const BlogPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: blogData, isLoading } = useGetBlogQuery(filter);


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
                    title: "Add Blog",
                    content: <CreateBlog />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Blog
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your Blog Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={blogData?.total || 0}
        dataSource={blogData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default BlogPage;
