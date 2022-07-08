import { useState } from "react";
import WalletDetails from "./WalletDetails";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import "../App.css";

function Home() {
  const [walletId, setWalletId] = useState(localStorage.getItem("walletId"));
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/setup", {
      name,
      balance,
    });
    setWalletId(data.id);
    localStorage.setItem("walletId", data.id);
  };

  return (
    <div className="Home">
      {walletId ? (
        <WalletDetails setWalletId={setWalletId} />
      ) : (
        <div className="walletForm">
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Name"
              value={name}
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Balance"
              value={balance}
              fullWidth
              type="number"
              inputProps={{ min: "0" }}
              onChange={(e) => setBalance(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Create
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;
