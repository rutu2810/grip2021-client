import React, { useEffect, useState } from "react";
import Axios from "../apiCalls";
import { Table } from "reactstrap";

function getDateTimeString(ISOString) {
  let date = new Date(ISOString);
  return `${date.toDateString()}, ${date.toLocaleTimeString()}`;
}

const show_transHist = (transaction) => {
  return (
    <tr className="text-center">
      <td className="col-3">{transaction.from.name}</td>
      <td className="col-3">{transaction.to.name}</td>
      <td className="col-3">{transaction.amount}</td>
      <td className="col-3">{getDateTimeString(transaction.createdAt)}</td>
    </tr>
  );
};

function TransHistory() {
  const [transhist, settranshist] = useState({
    loading: true,
    transData: [],
    error: null,
  });
  useEffect(() => {
    Axios.get("/api/transactions")
      .then((httpData) => httpData.data)
      .then((data) =>
        settranshist({
          loading: false,
          transData: data,
          error: null,
        })
      )
      .catch((error) =>
        settranshist({
          loading: false,
          transData: [],
          error: error,
        })
      );
  }, []);
  return transhist.loading ? (
    <h3>Loading...</h3>
  ) : transhist.error ? (
    <h3>Error fetching Data...Please try again...</h3>
  ) : (
    <div style={{ flex: 1 }} className="py-5 px-4">
      <Table bordered hover striped>
        <thead className="table-dark">
          <tr className=" text-center">
            <th className="col-3" scope="col">
              From
            </th>
            <th className="col-3" scope="col">
              To
            </th>
            <th className="col-3" scope="col">
              Amount
            </th>
            <th className="col-3" scope="col">
              Time
            </th>
          </tr>
        </thead>
        <tbody>{transhist.transData.map(show_transHist)}</tbody>
      </Table>
    </div>
  );
}

export default TransHistory;
