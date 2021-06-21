import React, { useEffect, useState } from "react";
import Axios from "../apiCalls";
import AddCustomer from "./AddCustomer";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";

const show_customer = (customer, history, delUser) => {
  return (
    <tr className=" text-center">
      <td className="col-4">{customer.name}</td>
      <td className="col-4">{customer.email}</td>
      <td className="col-2">{customer.balance}</td>
      <td className="col-2">
        <div className="btn-group">
          <button
            className="btn btn-dark"
            onClick={() =>
              history.push(`/transactions/transfer?from=${customer._id}`)
            }
          >
            Transfer
          </button>
          <button
            className="btn btn-danger"
            onClick={() => delUser(customer._id)}
            type="button"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

function ViewCustomers() {
  const [customerChanged, setCustomerChanged] = useState(false);
  const [custData, setCustData] = useState({
    loading: true,
    cust: [],
    error: null,
  });
  useEffect(() => {
    Axios.get("/api/customers")
      .then((httpData) => httpData.data)
      .then((data) =>
        setCustData({
          loading: false,
          cust: data,
          error: null,
        })
      )
      .catch((err) =>
        setCustData({
          loading: false,
          cust: [],
          error: err,
        })
      );
  }, [customerChanged]);
  const history = useHistory();

  const delUser = (userId) => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      Axios.delete(`/api/customers/${userId}`)
        .then(() => setCustomerChanged(`${userId} deleted`))
        .catch((error) => console.log(error));
    }
  };
  return custData.loading ? (
    <h3>Loading...</h3>
  ) : custData.error ? (
    <h3>Error fetching Data...Please try again...</h3>
  ) : (
    <div style={{ flex: 1 }} className="py-5 px-5">
      <AddCustomer setCustomerChanged={setCustomerChanged} />
      <Table bordered hover striped>
        <thead className="table-dark">
          <tr className=" text-center">
            <th className="col-4" scope="col">
              Name
            </th>
            <th className="col-4" scope="col">
              Email
            </th>
            <th className="col-2" scope="col">
              Balance
            </th>
            <th className="col-2" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {custData.cust.map((cus) => show_customer(cus, history, delUser))}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewCustomers;
