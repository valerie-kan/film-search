// import css from "./Loader.module.css";

import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <InfinitySpin
        visible={true}
        width="185"
        color="#187ed7"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
