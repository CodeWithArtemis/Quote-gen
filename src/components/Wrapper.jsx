import React from "react";
import Styles from "../../styles/modules/Wrapper.module.scss";
const Wrapper = () => {
  return (
    <div className={Styles.header_wrapper}>
      <h1 className={Styles.primary}>HELLO PROGRAMMER</h1>
      <h2 className={Styles.secondary}>This is a Quote Generator</h2>
    </div>
  );
};

export default Wrapper;
