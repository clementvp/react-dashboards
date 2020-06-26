import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import gridStyle from "./GridStyle";
import GET_DASHBOARDS from "../../Querys/querys";
import { Layout, Button, Row, Col, Input, List, Card } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

const { Content } = Layout;
const { Search } = Input;

const Home = () => {
  const history = useHistory();
  const [dashboardsList, setDashboardsList] = useState([]);
  const { data } = useQuery(GET_DASHBOARDS, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      setDashboardsList(data.dashboards_dashboards);
    }
  }, [data]);

  const goToEdit = (uuid) => {
    history.push(`/edit/${uuid}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar selectedKey={"1"}></Navbar>
      <Layout className={styles.siteLayout}>
        <Content className={styles.content}>
          <Search
            className={styles.searchBar}
            style={{ width: "49.5%" }}
            placeholder="Search a Dashboard by name"
            enterButton="Search"
            size="large"
            onSearch={(value) => console.log(value)}
          />
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={dashboardsList}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.title}>
                  <Card.Grid hoverable={false} style={gridStyle}>
                    {item.description}
                  </Card.Grid>
                  <Card.Grid hoverable={false} style={gridStyle}>
                    <Row>
                      <Col span={8}>
                        <Button type="primary" icon={<EyeOutlined />}>
                          View
                        </Button>
                      </Col>
                      <Col span={8}>
                        <Button
                          className={styles.editButton}
                          icon={<EditOutlined />}
                          onClick={() => {
                            goToEdit(item.uuid);
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col span={8}>
                        <Button type="danger" icon={<DeleteOutlined />}>
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Grid>
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
