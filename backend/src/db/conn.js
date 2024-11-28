const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true);

async function main() {
  await mongoose.connect(
    `mongodb+srv://viniciusmateusdev:NQhUPzWDhl0vBior@cluster0.qnyk3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );



  console.log("Conectado com sucesso!");
}

main().catch((err) => console.log(err));

module.exports = main;