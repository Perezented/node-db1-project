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
            if (acct) {
                res.status(200).json(acct);
            } else res.status(404).json({ error: "ID not in database" });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/", (req, res) => {
    // knex.insert(req.body, "*")
    //     .into("Accounts")
    //     .then((newAcct) => {
    //         if (req.body.name && req.body.budget) {
    //             res.status(201).json(newAcct);
    //         } else if (!req.body.name) {
    //             res.status(400).json({ error: "Missing name" });
    //         } else if (!req.body.budget) {
    //             res.status(400).json({ error: "Missing budget" });
    //         }
    //     });

    if (req.body.name && req.body.budget) {
        knex.insert(req.body, "*")
            .into("Accounts")
            .then((newAcct) => {
                res.status(201).json(newAcct);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: "Account name may already exist",
                    err,
                });
            });
    } else if (!req.body.name) {
        res.status(400).json({ error: "Missing name" });
    } else if (!req.body.budget) {
        res.status(400).json({ error: "Missing budget" });
    }
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    knex("Accounts")
        .where({ id })
        .update(changes)
        .then((count) => {
            console.log(count);
            if (count > 0) {
                res.status(203).json({
                    message: "Record updated successfully",
                    Changes: `${count} change(s) were done`,
                });
            } else {
                res.status(404).json({
                    error: "ID was not found in the data base",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    knex("Accounts")
        .where({ id })
        .del()
        .then((count) => {
            console.log(count);
            if (count > 0) {
                res.status(410).json({
                    // 410 Gone
                    // This response is sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
                    message: "Record deleted successfully",
                });
            } else {
                res.status(404).json({
                    error: "ID was not found in the data base",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/limit/:id", (req, res) => {
    knex.select("*")
        .from("Accounts")
        .limit(req.params.id)
        .then((accts) => {
            console.log(accts);
            if (accts) {
                res.status(200).json(accts);
            } else res.status(404).json({ error: "ID not in database" });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
