const express = require("express");
const knex = require("../data/dbConfig");
const router = express.Router();

router.get("/", (req, res) => {
    knex.select("*")
        .from("Accounts")
        .then((accounts) => {
            console.log(accounts);
            res.status(200).json({ accounts });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                Error: "Error retrieving the accounts information",
                err,
            });
        });
});

router.get("/:id", (req, res) => {
    knex.select("*")
        .from("Accounts")
        .where("id", req.params.id)
        .first()
        .then((acct) => {
            console.log(acct);
            res.status(200).json(acct);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
