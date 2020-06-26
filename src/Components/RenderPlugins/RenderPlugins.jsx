import React from "react";
import styles from "./RenderPlugins.module.css";

const RenderPlugins = (plugins, deletePlugin) => {
  const renderedPlugins = plugins.map((plugin) => (
    <div className={styles.item} key={plugin.i}>
      <span>{plugin.name}</span>
      <span
        className={styles.deletePluginButton}
        onClick={() => {
          deletePlugin(plugin.i);
        }}
      >
        X
      </span>
    </div>
  ));
  return renderedPlugins;
};

export default RenderPlugins;
