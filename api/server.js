import { dbconnection } from "./dbconnection/dbconnection.js";
import { app } from "./app.js";

// Database connectivity
dbconnection();

// Created server
app.listen(`${process.env.PORT}`, () =>
  console.log("Listening on port", process.env.PORT)
);
