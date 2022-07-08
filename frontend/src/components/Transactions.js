import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function Transactions() {
  const navigate = useNavigate();
  const [walletDetails, setWalletDetails] = useState();
  const [trans, setTrans] = useState([]);

  const getData = async (id) => {
    const { data } = await axios.get(`/api/wallet/${id}`);
    if (!data || data.message) {
      localStorage.removeItem("walletId");
      navigate("/");
    } else {
      const { data: transactions } = await axios.get(
        `/api/transactions?walletId=${id}`
      );
      setTrans(transactions);
      setWalletDetails(data);
    }
  };

  useEffect(() => {
    const walletId = localStorage.getItem("walletId");
    getData(walletId);
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 350 },
    { field: "walletId", headerName: "Wallet ID", width: 350 },
    { field: "amount", headerName: "Amount", type: "number", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "balance", headerName: "Balance", type: "number", width: 150 },
    { field: "description", headerName: "Description", width: 350 },
    { field: "createdAt", headerName: "Date", type: "date", width: 350 },
  ];

  return (
    <div>
      {trans.length ? (
        <div>
          <div className="details-head">
            <h1>Transactions</h1>
            <div className="w-details">
              <p>
                <strong>Wallet ID:</strong> {walletDetails && walletDetails._id}
              </p>
              <p>
                <strong>Wallet Name:</strong>{" "}
                {walletDetails && walletDetails.name}
              </p>
              <p>
                <strong>Wallet Balance:</strong>{" "}
                {walletDetails && walletDetails.balance}
              </p>
            </div>
          </div>
          <div className="data-table" style={{ height: 380, width: "98%" }}>
            <DataGrid
              columns={columns}
              rows={trans}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row._id}
            />
            <Link to="/">
              <Button
                variant="outlined"
                color="secondary"
                style={{ float: "right", margin: "1em 0.3em" }}
              >
                Home
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/">
            <Button
              variant="outlined"
              color="secondary"
              style={{ margin: "1em 0.3em" }}
            >
              Home
            </Button>
          </Link>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}
