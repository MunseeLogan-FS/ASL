import express from "express";
import dotenv from "dotenv";
import router from "./routes/contact.routes.js";
dotenv.config();
// set port from env or default to 8080
const port = process.env.PORT || 8080;
const app = express();

// parse JSON
app.use(express.json());

app.use("/v1/contacts", router);

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
