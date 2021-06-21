import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Input,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Button,
  ModalFooter,
} from "reactstrap";
import Axios from "../apiCalls";
import FeedBack from "../FeedBack";

function AddCustomer({ setCustomerChanged }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [customerAdd, setCustomerAdd] = useState({
    loading: true,
    added: false,
    error: null,
  });
  const toggle = () => setModalOpen(!isModalOpen);
  const custForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      balance: "",
    },
    onSubmit: (values) => {
      Axios.post("/api/customers", values)
        .then((httpData) => httpData.data)
        .then((data) => {
          setCustomerChanged(data);
          custForm.setSubmitting(false);
          toggle();
          setCustomerAdd({ loading: false, added: true, error: null });
        })
        .catch((error) => {
          toggle();
          custForm.setSubmitting(false);
          setCustomerAdd({
            loading: false,
            added: false,
            error: error?.response?.data,
          });
        });
    },
  });
  return (
    <div className="mb-3">
      <div
        className="mb-3"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button className="ml-2" color="primary" onClick={toggle}>
          Add Customer
        </Button>
      </div>

      <FeedBack
        type="success"
        message="Customer successfully added..."
        on={!customerAdd.loading && customerAdd.added}
      />
      <FeedBack
        type="danger"
        message={customerAdd.error}
        on={!customerAdd.loading && customerAdd.error != null}
      />

      <Modal isOpen={isModalOpen} toggle={toggle}>
        <Form onSubmit={custForm.handleSubmit}>
          <ModalHeader>Add Customer</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={custForm.values.name}
                onChange={custForm.handleChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                id="email"
                value={custForm.values.email}
                onChange={custForm.handleChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="balance">Balance</Label>
              <Input
                type="text"
                id="balance"
                value={custForm.values.balance}
                onChange={custForm.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="dark">
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default AddCustomer;
