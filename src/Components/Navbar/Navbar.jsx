import React from "react";
import styles from "./Navbar.module.css";
import { Menu, Layout } from "antd";
import {
  UnorderedListOutlined,
  PlusSquareOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "../../react-auth0-spa";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

const { Header } = Layout;

const Navbar = ({ selectedKey }) => {
  const history = useHistory();
  const { logout } = useAuth0();

  const goToCreation = () => {
    history.push("/creation");
  };

  const goToHome = () => {
    history.push("/");
  };

  const logOut = () => {
    logout();
  };

  return (
    <Header>
      <div className={styles.logo} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedKey]}>
        <Menu.Item key="1" icon={<UnorderedListOutlined />} onClick={goToHome}>
          Dashboard List
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusSquareOutlined />} onClick={goToCreation}>
          Create Dashboard
        </Menu.Item>
        <SubMenu
          title="User"
          icon={<UserOutlined />}
          style={{ float: "right" }}
        >
          <Menu.Item key="setting:1" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="setting:2" icon={<LogoutOutlined />} onClick={logOut}>
            Log Out
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

export default Navbar;
