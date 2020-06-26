import React from "react";
import styles from "./RenderPlugins.module.css";

const RenderPlugins = (plugins) => {
  const renderedPlugins = plugins.map((plugin) => (
    <div className={styles.item} key={plugin.i}>
      <span>{plugin.name}</span>
      <span className={styles.deletePluginButton}>X</span>
    </div>
  ));
  return renderedPlugins;
};

export default RenderPlugins;
