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
        });
});

module.exports = router;
