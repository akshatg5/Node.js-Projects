const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

// we have to create in memory storage to store a list of accounts
let accounts = [
  {
    id: 1,
    name: "Savings Account",
    balance: 5000.0,
  },
  {
    id: 2,
    name: "Checking Account",
    balance: 3000.0,
  },
  {
    id: 3,
    name: "Investment Account",
    balance: 10000.0,
  },
];

app.get("/", (req, res) => {
  res.send("<div><h2>Please go to the correct routes- /accounts </h2></div>");
});

app.get("/accounts", (req, res) => {
  res.json(accounts);
});

app.get("/accounts/:id", (req, res) => {
  const accountId = accounts.findIndex(
    (account) => account.id === parseInt(req.params.id)
  );
  if (accountId === -1) {
    res.status(404).send(`
            <div>
                <h4 style="color: red;">Account Not found, Invalid Id</h4>
            </div>`);
  } else {
    res.status(200).send(`<div>
        <h2>
            id:${accounts[accountId].id}
        </h2>
        <h2>
            name:${accounts[accountId].name}
        </h2>
        <h2>
            balance:${accounts[accountId].balance}
        </h2>
    </div>`);
  }
  console.log(accountId);
});

app.post("/accounts", (req, res) => {
  const { name, balance } = req.body;
  const newaccount = {
    id: Math.floor(Math.random() * 90) + 10,
    name,
    balance,
  };
  accounts.push(newaccount);
  res.status(201).send(`<div>
        <h4 style="color: green;">Account Added</h4>
    </div>`);
});

app.put("/accounts/:id", (req, res) => {
  const accountId = req.params.id;
  const { balance } = req.body;
  //we first get the Id of the account and then we have to edit the balance of the account.
  const account = accounts.findIndex((acc) => acc.id === accountId);
  console.log(accountId);
  console.log(balance);
  console.log(account);
  if (!account) {
    return res.status(404).json({
      msg: "Invalid account.",
    });
  }

  account.balance = balance;
  res.send(200).json({ msg: "Update successful" });
});

app.delete("/accounts/:id", (req, res) => {
    const accountId = req.params.id;
    const deleteId = accounts.findIndex((acc) => acc.id === accountId);
  
    if (deleteId === -1) {
      return res.status(404).json({
        msg: "Invalid id",
      });
    }
  
    accounts.splice(deleteId, 1);
  
    return res.status(200).json({
      msg: "Deleted",
    });
  });
  

app.listen(3000);
