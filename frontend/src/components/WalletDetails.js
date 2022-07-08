import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function WalletDetails({ setWalletId }) {
  const [walletDetails, setWalletDetails] = useState();
  const [amount, setAmount] = useState(1);
  const [description, setDescription] = useState("");
  const [transType, setTransType] = useState(1);

  const getData = async (id) => {
    const { data } = await axios.get(`/api/wallet/${id}`);
    if (!data || data.message) {
      localStorage.removeItem("walletId");
      setWalletId("");
    } else {
      setWalletDetails(data);
    }
  };

  useEffect(() => {
    const walletId = localStorage.getItem("walletId");
    getData(walletId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transType === "-1" && walletDetails.balance < +amount) {
      alert("Insufficient balance");
      return;
    }
    const walletId = localStorage.getItem("walletId");
    await axios.post(`/api/transact/${walletId}`, {
      amount: amount * +transType,
      description,
    });
    getData(walletId);
    setAmount(1);
    setDescription("");
    setTransType(1);
  };

  return walletDetails ? (
    <>
      <div className="details">
        <h2>
          <i>Name</i>: {walletDetails.name}
        </h2>
        <h2>
          <i>Balance</i>: {walletDetails.balance}
        </h2>
        <h2>
          <i>ID</i>: {walletDetails._id}
        </h2>
        <Link to="/transactions">
          <Button
            variant="outlined"
            color="secondary"
            style={{ float: "right" }}
          >
            All Transactions
          </Button>
        </Link>
      </div>
      <div className="transact">
        <h1>Transaction</h1>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Amount"
            value={amount}
            fullWidth
            type="number"
            required
            inputProps={{ min: "1" }}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Description"
            value={description}
            fullWidth
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl>
            <RadioGroup
              value={transType}
              onChange={(e) => setTransType(e.target.value)}
              row
            >
              <FormControlLabel value={1} control={<Radio />} label="CREDIT" />
              <FormControlLabel value={-1} control={<Radio />} label="DEBIT" />
            </RadioGroup>
          </FormControl>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </>
  ) : (
    <h2>Loading...</h2>
  );
}
