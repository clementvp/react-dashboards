import React, { useState } from "react";
import styles from "./DashboardCreation.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import ColorPicker from "../../Components/ColorPicker/ColorPicker";
import formLayout from "./FormLayout";
import {
  Layout,
  Form,
  Input,
  Slider,
  Row,
  Col,
  InputNumber,
  Button,
} from "antd";

const { TextArea } = Input;
const { Content } = Layout;

const DashboardCreation = () => {
  const [sliderValue, setSliderValue] = useState(12);
  const [colorBg, setColorBg] = useState({ hex: "#f0f2f5" });

  const handleChangeColor = (value) => {
    setColorBg(value);
  };

  const onChangeSlider = (value) => {
    setSliderValue(value);
  };

  const submitForm = (values) => {
    const title = values.title;
    const description = values.description;
    console.log(title);
    console.log(description);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar selectedKey={"2"}></Navbar>
      <Layout className={styles.siteLayout}>
        <Content className={styles.content}>
          <Form {...formLayout} layout={"vertical"} onFinish={submitForm}>
            <Form.Item
              label="Dashboard Title:"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter a dashboard title !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Dashboard Description:"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter a dashboard description !",
                },
              ]}
            >
              <TextArea autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
            </Form.Item>
            <Form.Item label="Number of columns:">
              <Row>
                <Col span={2}>
                  <InputNumber
                    min={12}
                    max={24}
                    value={sliderValue}
                    onChange={onChangeSlider}
                  />
                </Col>
                <Col span={22}>
                  <Slider
                    min={12}
                    max={24}
                    onChange={onChangeSlider}
                    value={typeof sliderValue === "number" ? sliderValue : 0}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="Dashboard Background Color:">
              <ColorPicker
                onChangeColor={handleChangeColor}
                colorBg={colorBg}
              ></ColorPicker>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Dashboard
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardCreation;
