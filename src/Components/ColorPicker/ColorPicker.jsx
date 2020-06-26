import React, { useState } from "react";
import styles from "./ColorPicker.module.css";
import { SketchPicker } from "react-color";

const ColorPicker = ({ colorBg, onChangeColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChangeColor = (value) => {
    onChangeColor(value);
  };

  const handleColorClick = () => {
    setDisplayColorPicker({ displayColorPicker: !displayColorPicker });
  };

  const handleCloseColorPicker = () => {
    setDisplayColorPicker(false);
  };

  return (
    <div>
      <div className={styles.swatchs} onClick={handleColorClick}>
        <div
          className={styles.currentColorContainer}
          style={{
            background: colorBg.hex,
          }}
        />
      </div>
      {displayColorPicker ? (
        <div className={styles.colorPicker}>
          <div
            className={styles.colorPickerOutside}
            onClick={handleCloseColorPicker}
          />
          <SketchPicker color={colorBg} onChange={handleChangeColor} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
