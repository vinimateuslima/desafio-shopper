const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
  try {
    const { customer_id, name } = req.body;

      if (!customer_id || !name) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos obrigatórios." });
    }

    const existingCustomer = await Customer.findOne({ customer_id: customer_id });

    if (existingCustomer) {
      return res
        .status(409)
        .json({ msg: "Já existe um Cliente com o mesmo ID." });
    }

    // Criar o novo Customer
    const newCustomer = new Customer({
      customer_id,
      name,
    });

    await newCustomer.save();

    res.status(201).json({
      msg: "Cliente cadastrado com sucesso!",
      newCustomer,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Ocorreu um erro ao criar o Cliente.");
  }
};

module.exports = {
  createCustomer,
};
