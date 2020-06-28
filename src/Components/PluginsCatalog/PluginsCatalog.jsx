import React from "react";
import styles from "./PluginsCatalog.module.css";
import { Modal, List, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const PluginsCatalog = ({
  pluginsCatalog,
  pluginsModalVisible,
  closeModal,
  addPlugin,
}) => {
  const closePluginsCatalog = () => {
    closeModal();
  };

  const handleAddPlugin = () => {
    addPlugin("plop");
  };

  return (
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
                  onClick={handleAddPlugin}
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
  );
};

export default PluginsCatalog;
