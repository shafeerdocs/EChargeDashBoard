import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { addSocket, deleteSocketById } from "../../Api";
import FormModal from "../../Components/FormModal";

export default function SocketList(props) {
  let { sockets } = props;
  const [Reload, setReload] = useState(false);
  const [OpenAddSocketModal, setOpenAddSocketModal] = useState(false);

  const addsocket = (e, data) => {
    e.preventDefault();
    let socket = {};
    data.map((datum) => {
      if (datum.label === "Name") socket.title = datum.value;
      else if (datum.label === "Type") socket.type = datum.value;
    });
    addSocket(socket)
      .then((res) => {
        sockets.push(res.data);
        setOpenAddSocketModal(false);
      })
      .catch((err) => setOpenAddSocketModal(false));
  };

  const deleteSocket = (socket, index) => {
    deleteSocketById(socket._id).then((res) => {
      sockets = sockets?.splice(index, 1);
      setReload(!Reload);
    });
  };

//   const editSocket = (socket, index) => {
//     deleteSocketById(socket._id).then((res) => {
//       sockets = sockets?.splice(index, 1);
//       setReload(!Reload);
//     });
//   };

  return (
    <div>
      <FormModal
        title="Add Socket"
        show={OpenAddSocketModal}
        onSubmit={(e, data) => addsocket(e, data)}
        form={[
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
        ]}
        close={() => setOpenAddSocketModal(false)}
      />
      <div className="addButtonWrapper">
        <Button onClick={() => setOpenAddSocketModal(true)}>Add socket</Button>
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
                  onClick={() => editSocket(socket)}
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
