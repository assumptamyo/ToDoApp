const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require('./app');

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASEPASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.log(`DB connection error ${err.message}`);
  });
 
app.listen(process.env.PORT , () => {
    console.log(`Server is running at port no : ${process.env.PORT}`)
})
