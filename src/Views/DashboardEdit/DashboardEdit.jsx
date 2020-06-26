import React, { useEffect, useState } from "react";
import styles from "./DashboardEdit.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import RenderPlugins from "../../Components/RenderPlugins/RenderPlugins";
import ColorPicker from "../../Components/ColorPicker/ColorPicker";
import "../../../node_modules/react-grid-layout/css/styles.css";
import { v4 as uuidv4 } from "uuid";
import GridLayout from "react-grid-layout";
import {
  Layout,
  Row,
  Col,
  Input,
  Form,
  Button,
  Modal,
  List,
  Card,
  InputNumber,
} from "antd";
import {
  SettingOutlined,
  EditOutlined,
  SaveOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import { GET_DASHBOARD_DATA, GET_DASHBOARD_PLUGINS } from "../../Querys/querys";
import { useQuery } from "@apollo/react-hooks";

const { Content } = Layout;

const DashboardEdit = () => {
  let { dashboardId } = useParams();
  const [form] = Form.useForm();
  const [pluginsModalVisible, setPluginsModalVisible] = useState(false);
  const [colorBg, setColorBg] = useState({ hex: "#f0f2f5" });
  const [plugins, setPlugins] = useState([]);
  const [layout, setLayout] = useState([]);

  const { data: dashBoardData } = useQuery(GET_DASHBOARD_DATA, {
    variables: { uuid: dashboardId },
  });

  const { data: pluginsData } = useQuery(GET_DASHBOARD_PLUGINS, {
    variables: { uuid: dashboardId },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (dashBoardData) {
      const currentDashboard = dashBoardData.dashboards_dashboards[0];
      setColorBg({ hex: currentDashboard.background_color });
      form.setFieldsValue({
        dashboardTitle: currentDashboard.title,
        dashboardDescription: currentDashboard.description,
        columnsNumber: currentDashboard.columns,
      });
      if (pluginsData) {
        setPlugins(pluginsData.dashboards_plugins);
        setLayout(pluginsData.dashboards_plugins);
      }
    }
  }, [dashBoardData, form, pluginsData]);

  const handleChangeColor = (value) => {
    setColorBg(value);
  };

  const submitForm = (values) => {
    console.log(plugins);
    console.log(layout);

    console.log(values);
  };

  const openPluginsCatalog = () => {
    setPluginsModalVisible(true);
  };

  const closePluginsCatalog = () => {
    setPluginsModalVisible(false);
  };

  const pluginsCatalog = [
    {
      title: "Meteo",
    },
    {
      title: "News",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
  ];

  const addPlugin = () => {
    const i = uuidv4();
    setLayout([...layout, { i, x: 3, y: 3, w: 3, h: 2 }]);
    setPlugins([...plugins, { i, name: "Meteo 2" }]);
  };

  const deletePlugin = (i) => {
    const newLayout = layout.filter((element) => {
      return element.i !== i;
    });
    const newPlugins = plugins.filter((element) => {
      return element.i !== i;
    });
    setLayout(newLayout);
    setPlugins(newPlugins);
  };

  const changeLayout = (newLayout) => {
    setLayout(newLayout);
    let newPlugins = [];
    let newPlugin = {};
    for (let item of newLayout) {
      const plugin = plugins.find((element) => {
        return element.i === item.i;
      });
      newPlugins = plugins.filter((element) => {
        return element.i !== item.i;
      });
      newPlugin = Object.assign(plugin, item);
      newPlugins.push(newPlugin);
    }
    setPlugins(newPlugins);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar selectedKey={"3"}></Navbar>
      <Layout className={styles.siteLayout}>
        <Content style={{ margin: "16px 50px", minHeight: "100%" }}>
          <Modal
            title="Plugins Catalog"
            visible={pluginsModalVisible}
            onCancel={closePluginsCatalog}
            footer={null}
            width={"80%"}
          >
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={pluginsCatalog}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 4,
              }}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={item.title}
                    extra={
                      <span
                        className={styles.addPluginButton}
                        onClick={addPlugin}
                      >
                        <PlusOutlined />
                        Add
                      </span>
                    }
                  >
                    Plugin Description
                  </Card>
                </List.Item>
              )}
            />
          </Modal>
          <Row style={{ minHeight: "90vh" }} gutter="50">
            <Col span={4}>
              <Form layout="vertical" onFinish={submitForm} form={form}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter a dashboard title !",
                    },
                  ]}
                  name="dashboardTitle"
                  label="Dashboard Title:"
                >
                  <Input
                    placeholder="Dashboard Title"
                    suffix={<EditOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter a dashboard description !",
                    },
                  ]}
                  name="dashboardDescription"
                  label="Dashboard Description:"
                >
                  <TextArea autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter a dashboard description !",
                    },
                  ]}
                  label="Number of columns:"
                  name="columnsNumber"
                >
                  <InputNumber min={12} max={24} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Dashboard Background Color:">
                  <ColorPicker
                    onChangeColor={handleChangeColor}
                    colorBg={colorBg}
                  ></ColorPicker>
                </Form.Item>
                <Button
                  icon={<SettingOutlined />}
                  block
                  className={styles.button}
                  onClick={openPluginsCatalog}
                >
                  Plugins catalog
                </Button>
                <Button
                  icon={<EyeOutlined />}
                  block
                  className={styles.button}
                  style={{ background: "#bec8c8" }}
                >
                  View
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  block
                  className={styles.button}
                >
                  Save
                </Button>
              </Form>
            </Col>
            <Col
              span={20}
              className={styles.layoutContainer}
              style={{
                paddingLeft: "0px",
                paddingRight: "0px",
              }}
            >
              <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={30}
                width={1200}
                compactType={null}
                onLayoutChange={changeLayout}
              >
                {RenderPlugins(plugins, (i) => {
                  deletePlugin(i);
                })}
              </GridLayout>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardEdit;
