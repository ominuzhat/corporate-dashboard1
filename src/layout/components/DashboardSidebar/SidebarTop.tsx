import moment from "moment";
import React, { useEffect, useState } from "react";

const SidebarTop: React.FC = () => {
  const [time, setTime] = useState(moment().format("LTS"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("LTS"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <React.Fragment>
      <div className="sidebar-top-style">
        <h1 style={{ fontSize: "24px", fontFamily: "Arial" }}>{time}</h1>

        {/* <Image
          src={logo}
          preview={false}
          style={{
            width: "60%",
            height: "100%",
            objectFit: "contain",
          }}
        /> */}
      </div>
    </React.Fragment>
  );
};

export default SidebarTop;
