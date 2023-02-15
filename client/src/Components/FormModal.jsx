import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";

export default function FormModal({
  show,
  close,
  title,
  form,
  onSubmit,
  action,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption, item) => {
    item.value = selectedOption;
    setSelectedOption(item.value);
  };
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={(e) => onSubmit(e, form)}>
          {form?.map((item, i) => (
            <Form.Group className="mb-3" controlId="formBasicEmail" key={i}>
              <Form.Label>{item.label}</Form.Label>
              {item.type === "text" ? (
                <Form.Control
                  defaultValue={item.value}
                  type="text"
                  placeholder={item.placeholder}
                  onChange={(e) => (item.value = e.target.value)}
                />
              ) : item.type === "select" ? (
                <Select
                  isMulti={true}
                  value={selectedOption || item.value}
                  onChange={(e) => handleChange(e, item)}
                  options={item.options}
                />
              ) : (
                ""
              )}
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            {action}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
