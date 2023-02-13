import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import SocketList from "./SocketList";
import StationList from "./StationList";
import { getSockets, getStations } from "../../Api";
import "./Dashboard.css";

let stations, sockets;
export default function Dashboard() {
  const [Reload, setReload] = useState(true);

  useEffect(() => {
    getValues();
  }, []);

  let getValues = () => {
    Promise.all([getStations(), getSockets()])
      .then((res) => {
        stations = res[0].data;
        sockets = res[1].data;
        // let socket={}
        sockets.map((socket) => {
          socket.label = socket.title;
          socket.value = socket._id;
        });
        setReload(!Reload);
      })
      .catch((err) => console.log(err));
  };

  let handleChange = () => {
    getValues();
  };

  return (
    <div className="dashboardWrapper">
      <h4>Admin Dashboard</h4>
      <Tabs
        defaultActiveKey="ev-station"
        className="mb-3 mt-4"
        fill
        onSelect={handleChange}
      >
        <Tab eventKey="ev-station" title="EV station">
          <StationList stations={stations} sockets={sockets} />
        </Tab>
        <Tab eventKey="socket" title="Socket">
          <SocketList sockets={sockets} />
        </Tab>
      </Tabs>
    </div>
  );
}
