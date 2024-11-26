const Driver = require("../models/Driver");
require("dotenv").config();

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

const createDriver = async (req, res) => {
  try {
    const { id, name, description, vehicle, tax, kmMin, review } = req.body;

    const existingDriver = await Driver.findOne({ id: id });

    if (!id || !name || !description || !vehicle || !kmMin || !review || !tax) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos obrigatórios." });
    }

    if (!Array.isArray(review) || review.length === 0) {
      return res
        .status(400)
        .json({ msg: "O review precisa ser um array com pelo menos um item." });
    }

    if (existingDriver) {
      return res
        .status(409)
        .json({ msg: "Já existe um Motorista com o mesmo ID." });
    }

    // Criar o novo Driver
    const newDriver = new Driver({
      id,
      name,
      description,
      vehicle,
      tax,
      kmMin,
      review: review || [],
    });

    await newDriver.save();

    res.status(201).json({
      msg: "Motorista cadastrado com sucesso!",
      newDriver,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Ocorreu um erro ao criar o Motorista.");
  }
};

module.exports = {
  getDrivers,
  createDriver,
};
