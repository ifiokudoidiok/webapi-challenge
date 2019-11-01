const express = require("express");
const helmet = require("helmet");

const actionRouter = require("./routers/actionRouter");
const projectRouter = require("./routers/projectRouter");

const server = express();

server.use(helmet());

server.use(express.json());

server.use("/actions", logger, actionRouter);
server.use("/projects", logger, projectRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.get("/actions", (req, res) => {
  res.send("actions api is running");
});
server.get("/projects", (req, res) => {
  res.send("projects api is running");
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.host}`
  );

  next();
}

module.exports = server;
