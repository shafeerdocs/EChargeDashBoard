import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { addSocket, deleteSocketById, editSocketById } from "../../Api";
import FormModal from "../../Components/FormModal";

let form;
export default function SocketList(props) {
  let { sockets } = props;
  const [Action, setAction] = useState("Add");
  const [Reload, setReload] = useState(false);
  const [OpenAddSocketModal, setOpenAddSocketModal] = useState(false);
  const [SelectedSocket, setSelectedSocket] = useState(null);


  const openAddModal = () => {
    form = [
      {
        label: "Name",
        type: "text",
        placeholder: "Enter the name of socket",
        value: "",
      },
      {
        label: "Type",
        type: "text",
        placeholder: "Enter the type of socket",
        value: "",
      },
    ];
    setAction("Add");
    setOpenAddSocketModal(true);
  };

  const openEditModal = (socket) => {
    setSelectedSocket(socket._id);
    form = [
      {
        label: "Name",
        type: "text",
        placeholder: "Enter the name of socket",
        value: socket.title,
      },
      {
        label: "Type",
        type: "text",
        placeholder: "Enter the type of socket",
        value: socket.type,
      },
    ];
    setAction("Edit");
    setOpenAddSocketModal(true);
  };

  const submitForm = (e, data) => {
    e.preventDefault();
    let socket = {};
    data.map((datum) => {
      if (datum.label === "Name") socket.title = datum.value;
      else if (datum.label === "Type") socket.type = datum.value;
    });
    if (Action === "Add") addsocket(socket);
    else if (Action === "Edit") editSocket(socket);
  };

  const addsocket = (socket) => {
    addSocket(socket)
      .then((res) => {
        sockets.push(res.data);
        setOpenAddSocketModal(false);
      })
      .catch((err) => setOpenAddSocketModal(false));
  };

  const editSocket = (socket) => {
    editSocketById(SelectedSocket, socket).then((res) => {
      let editedSocketIndex = sockets.findIndex(
        (item) => item._id === SelectedSocket
      );
      sockets = sockets.splice(editedSocketIndex, 1, res.data);
      setOpenAddSocketModal(false);
    });
  };

  const deleteSocket = (socket, index) => {
    deleteSocketById(socket._id).then((res) => {
      sockets = sockets?.splice(index, 1);
      setReload(!Reload);
    });
  };

  return (
    <div>
      <FormModal
        title={`${Action} Socket`}
        show={OpenAddSocketModal}
        onSubmit={(e, data) => submitForm(e, data)}
        action={Action}
        form={form}
        close={() => setOpenAddSocketModal(false)}
      />
      <div className="addButtonWrapper">
        <Button className="addButton" onClick={openAddModal}>
          Add socket
        </Button>
      </div>
      <Table striped hover responsive className="tableWrapper">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sockets?.map((socket, i) => (
            <tr key={i}>
              <td>{socket.title}</td>
              <td>{socket.type}</td>
              <td align="right">
                <MdOutlineEdit
                  size={24}
                  color="#ADADAD"
                  onClick={() => openEditModal(socket)}
                />
              </td>
              <td align="center">
                <MdOutlineDelete
                  size={24}
                  color="#ADADAD"
                  onClick={() => deleteSocket(socket, i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
