import { Card, Col, Row } from "antd";
import CreateBasicNonCommision from "../components/CreateNonCommision";
import NonCommissionRightSide from "../components/NonCommissionRightSide";

const NonCommision = () => {
  return (
    <div>
      <Card>
        <Row gutter={[16, 16]}>
          <Col lg={17}>
            <CreateBasicNonCommision />

            {/* <BasicAirCommission /> */}
          </Col>
          <Col lg={7}>
            <NonCommissionRightSide />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NonCommision;
