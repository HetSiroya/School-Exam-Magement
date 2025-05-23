import express from "express";
import connetDB from "./config/db.config";
import routes from "./routes/indexRoute";
const app = express();
const PORT: Number = process.env.PORT ? Number(process.env.PORT) : 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to typescript backend!");
});

app.use("/", routes);
connetDB();
app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});
