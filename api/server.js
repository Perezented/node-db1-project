const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();
const AccountsRouter = require("../AccountsRouter/index");

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

module.exports = server;
