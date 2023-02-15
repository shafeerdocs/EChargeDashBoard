import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import FormModal from "../../Components/FormModal";
import { addStation, deleteStationById, editStationById } from "../../Api";

let form;
export default function StationList(props) {
  let { stations, sockets } = props;

  const [Action, setAction] = useState("Add");
  const [Reload, setReload] = useState(false);
  const [OpenAddStationModal, setOpenAddStationModal] = useState(false);
  const [SelectedStation, setSelectedStation] = useState(null);

  const openAddModal = () => {
    form = [
      {
        label: "Name",
        type: "text",
        placeholder: "Enter the name of ev station",
        value: "",
      },
      {
        label: "Location",
        type: "text",
        placeholder: "Enter the location of ev station",
        value: "",
      },
      {
        label: "City",
        type: "text",
        placeholder: "Enter the city",
        value: "",
      },
      {
        label: "Country",
        type: "text",
        placeholder: "Enter the country",
        value: "",
      },
      {
        label: "Sockets",
        type: "select",
        placeholder: "choose the socket",
        options: sockets,
        value: [],
      },
    ];
    setAction("Add");
    setOpenAddStationModal(true);
  };

  const submitForm = (e, data) => {
    e.preventDefault();
    let station = {};
    data?.map((datum) => {
      if (datum.label === "Name") station.title = datum.value;
      else if (datum.label === "Location") station.location = datum.value;
      else if (datum.label === "City") station.city = datum.value;
      else if (datum.label === "Country") station.country = datum.value;
      else if (datum.label === "Sockets") station.sockets = datum.value || [];
    });
    if (Action === "Add") addstation(station);
    else if (Action === "Edit") editStation(station);
  };

  const addstation = (station) => {
    addStation(station)
      .then((res) => {
        stations.push(res.data);
        setOpenAddStationModal(false);
      })
      .catch((err) => setOpenAddStationModal(false));
  };

  const editStation = (station) => {
    editStationById(SelectedStation, station).then((res) => {
      let editedStationIndex = stations.findIndex(
        (item) => item._id === SelectedStation
      );
      stations = stations.splice(editedStationIndex, 1, res.data);
      setOpenAddStationModal(false);
    });
  };

  const deleteStation = (station, index) => {
    deleteStationById(station._id).then((res) => {
      stations = stations?.splice(index, 1);
      setReload(!Reload);
    });
  };

  const openEditModal = (station) => {
    setSelectedStation(station._id);
    station.sockets.map((socket) => {
      socket.label = socket.title;
    });
    form = [
      {
        label: "Name",
        type: "text",
        placeholder: "Enter the name of ev station",
        value: station.title,
      },
      {
        label: "Location",
        type: "text",
        placeholder: "Enter the location of ev station",
        value: station.location,
      },
      {
        label: "City",
        type: "text",
        placeholder: "Enter the city",
        value: station.city,
      },
      {
        label: "Country",
        type: "text",
        placeholder: "Enter the country",
        value: station.country,
      },
      {
        label: "Sockets",
        type: "select",
        placeholder: "choose the socket",
        options: sockets,
        value: station.sockets,
      },
    ];
    setAction("Edit");
    setOpenAddStationModal(true);
  };

  return (
    <div>
      <FormModal
        title={`${Action} Ev Station`}
        show={OpenAddStationModal}
        onSubmit={(e, data) => submitForm(e, data)}
        form={form}
        action={Action}
        close={() => setOpenAddStationModal(false)}
      />
      <div className="addButtonWrapper">
        <Button className="addButton" onClick={openAddModal}>
          Add station
        </Button>
      </div>
      <Table striped hover responsive className="tableWrapper">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>City</th>
            <th>Country</th>
            <th>Number of sockets</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stations?.map((station, i) => (
            <tr key={i}>
              <td>{station.title}</td>
              <td>{station.location}</td>
              <td>{station.city}</td>
              <td>{station.country}</td>
              <td>{station.sockets.length}</td>
              <td align="center">
                <MdOutlineEdit
                  size={24}
                  color="#ADADAD"
                  onClick={() => openEditModal(station)}
                />
              </td>
              <td>
                <MdOutlineDelete
                  size={24}
                  color="#ADADAD"
                  onClick={() => deleteStation(station, i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
