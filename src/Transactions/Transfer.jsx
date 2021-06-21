import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Axios from "../apiCalls";
import { useFormik } from "formik";
import FeedBack from "../FeedBack";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Transfer() {
  const [transData, setTransData] = useState({
    loading: false,
    transaction: null,
    error: null,
  });

  const params = useQuery();
  const history = useHistory();
  if (!params.get("from")) {
    history.push("/customer");
  }

  const [custData, setCustData] = useState({
    loading: true,
    cust: [],
    error: null,
  });
  useEffect(() => {
    Axios.get("/api/customers")
      .then((httpData) => httpData.data)
      .then((data) => {
        data = data.filter((customer) => customer._id != params.get("from"));
        setCustData({
          loading: false,
          cust: data,
          error: null,
        });
      })
      .catch((err) =>
        setCustData({
          loading: false,
          cust: [],
          error: err,
        })
      );
  }, []);
  const transferForm = useFormik({
    initialValues: { fromId: params.get("from"), toId: "", amount: "" },
    validate: (values) => {
      let errors = {};
      if (values.amount == "") {
        errors.amount = "Amount is required";
      } else if (!parseFloat(values.amount)) {
        errors.amount = "Amount must be a number.";
      } else if (values.amount <= 0) {
        errors.amount = "Amount must be greater than 0";
      }
      return errors;
    },
    onSubmit: (values) => {
      setTransData({
        loading: true,
        transaction: null,
        error: null,
      });

      Axios.post("/api/transactions", values)
        .then(() => {
          transferForm.setSubmitting(false);
          setTransData({
            loading: false,
            transaction: true,
            error: null,
          });
        })
        .catch((error) => {
          transferForm.setSubmitting(false);
          setTransData({
            loading: false,
            transaction: null,
            error: error.response.data,
          });
        });
    },
  });

  useEffect(() => {
    if (custData.cust.length > 0) {
      transferForm.setFieldValue("toId", custData.cust[0]._id);
    }
  }, [custData]);
  return (
    <div className="container my-5">
      <Card>
        <Form onSubmit={transferForm.handleSubmit}>
          <CardHeader>Transfer Money</CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="toId">To</Label>
              <Input
                type="select"
                id="toId"
                value={transferForm.values.toId}
                onChange={transferForm.handleChange}
              >
                {custData.cust.map((customer) => (
                  <option value={customer._id}>{customer.name}</option>
                ))}
              </Input>
            </FormGroup>
            <br />

            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="text"
                id="amount"
                value={transferForm.values.amount}
                onChange={transferForm.handleChange}
                onBlur={transferForm.handleBlur}
              />
              {transferForm.errors.amount ? (
                <span className="text-danger">
                  {transferForm.errors.amount}
                </span>
              ) : null}
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              disabled={
                transferForm.dirty &&
                (transferForm.isSubmitting || !transferForm.isValid)
              }
            >
              Transfer
            </Button>
          </CardFooter>
        </Form>
      </Card>
      <br />
      <br />
      <FeedBack on={transData.loading} message="Loading..." type="secondary" />
      <FeedBack
        on={!transData.loading && transData.transaction != null}
        message="Transferred Successfully"
        type="success"
      />
      <FeedBack
        on={!transData.loading && transData.error != null}
        message={`Error while transfering..${transData.error}`}
        type="danger"
      />
    </div>
  );
}

export default Transfer;
