import { Col, Modal, Row } from "antd";
import { useState } from "react";
import { Typography } from 'antd';
import Currency from "../Currency";
import TextArea from "antd/es/input/TextArea";

const { Title, Text } = Typography;
function Entrega() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Modal
        title="Medição"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={889}
        style={{ top: 20 }}

      >
        <Title level={4}>KN-N1344-290-M-EM-0001</Title>
        <Title level={5}>Montar equipamentos mecânicos - CH-1290KN-01 </Title>
        <Row justify={"space-between"}>
          <Col>
            <Text>Instalação na base de equipamentos</Text>
          </Col>

          <Col>
            <Currency price={80750.65} />
          </Col>

        </Row>

        <Row className="mt-2">
          <Col span={24}>
          <TextArea
            placeholder="Comentário"
            className="w-100"
            style={{ height: 50, width: '100%' }}

          />
          </Col>
        </Row>


      </Modal>
    </>

  );
}

export default Entrega;
