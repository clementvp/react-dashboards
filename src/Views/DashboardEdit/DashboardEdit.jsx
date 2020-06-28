import React, { useEffect, useState } from "react";
import styles from "./DashboardEdit.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import RenderPlugins from "../../Components/RenderPlugins/RenderPlugins";
import PluginsCatalog from "../../Components/PluginsCatalog/PluginsCatalog";
import ColorPicker from "../../Components/ColorPicker/ColorPicker";
import "../../../node_modules/react-grid-layout/css/styles.css";
import { v4 as uuidv4 } from "uuid";
import RGL, { WidthProvider } from "react-grid-layout";
import deleteUnwantedPluginKeys from "../../Utils/deleteUnwantedPluginKeys";
import {
  Layout,
  Row,
  Col,
  Input,
  Form,
  Button,
  InputNumber,
  notification,
} from "antd";
import {
  SettingOutlined,
  EditOutlined,
  SaveOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import { GET_DASHBOARD_DATA, GET_DASHBOARD_PLUGINS } from "../../Querys/querys";
import DELETE_PLUGINS, {
  INSERT_PLUGINS,
  UPDATE_DASHBOARD,
} from "../../Mutations/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";

const { Content } = Layout;

const ReactGridLayout = WidthProvider(RGL);

const DashboardEdit = () => {
  let { dashboardId } = useParams();
  const [form] = Form.useForm();
  const [pluginsModalVisible, setPluginsModalVisible] = useState(false);
  const [colorBg, setColorBg] = useState({ hex: "#f0f2f5" });
  const [plugins, setPlugins] = useState([]);
  const [layout, setLayout] = useState([]);
  const [deletePlugins] = useMutation(DELETE_PLUGINS);
  const [insertPlugins] = useMutation(INSERT_PLUGINS);
  const [updateDashboard] = useMutation(UPDATE_DASHBOARD);

  const { data: dashBoardData } = useQuery(GET_DASHBOARD_DATA, {
    variables: { uuid: dashboardId },
    fetchPolicy: "network-only",
  });

  const { data: pluginsData } = useQuery(GET_DASHBOARD_PLUGINS, {
    variables: { uuid: dashboardId },
    fetchPolicy: "network-only",
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

  const submitForm = async (values) => {
    const dashboardTitle = values.dashboardTitle;
    const description = values.dashboardDescription;
    const columns = values.columnsNumber;
    const colorBackground = colorBg.hex;
    try {
      await deletePlugins({ variables: { uuid: dashboardId } });
      if (plugins.length > 0) {
        await insertPlugins({ variables: { objects: plugins } });
      }
      await updateDashboard({
        variables: {
          uuid: dashboardId,
          title: dashboardTitle,
          description: description,
          columns: columns,
          colorBg: colorBackground,
        },
      });
      notification.info({
        message: `Save with success`,
        description: "Dashboard has been saved.",
        placement: "bottomLeft",
      });
    } catch (error) {}
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

  const addPlugin = (pluginId) => {
    const i = uuidv4();
    setLayout([...layout, { i, x: 3, y: 3, w: 3, h: 2 }]);
    setPlugins([
      ...plugins,
      {
        i,
        name: "Meteo 2",
        url: "https://meteo.com",
        dashboard_uuid: dashboardId,
      },
    ]);
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
      const newItem = deleteUnwantedPluginKeys(item);
      newPlugin = Object.assign(plugin, newItem);
      newPlugins.push(newPlugin);
    }
    setPlugins(newPlugins);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar selectedKey={"3"}></Navbar>
      <Layout className={styles.siteLayout}>
        <Content style={{ margin: "16px 50px", minHeight: "100%" }}>
          <PluginsCatalog
            pluginsCatalog={pluginsCatalog}
            pluginsModalVisible={pluginsModalVisible}
            closeModal={closePluginsCatalog}
            addPlugin={addPlugin}
          ></PluginsCatalog>
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
                  <InputNumber
                    min={12}
                    max={24}
                    className={styles.inputNumber}
                  />
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
            <Col span={20} className={styles.layoutContainer}>
              <ReactGridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={60}
                compactType={null}
                onLayoutChange={changeLayout}
              >
                {RenderPlugins(plugins, (i) => {
                  deletePlugin(i);
                })}
              </ReactGridLayout>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardEdit;
