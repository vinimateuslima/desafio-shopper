const { response } = require("express");
const Customer = require("../models/Customer");
const Driver = require("../models/Driver");
require("dotenv").config();

const estimate = async (req, res) => {
  const { customer_id, origin, destination } = req.body;

  const customer = await Customer.findOne({ customer_id: customer_id });

  if (!customer_id || !origin || !destination) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Por favor, preencha todos os campos obrigatórios.",
    });
  }

  if (!customer) {
    return res.status(404).json({
      error_code: "NOT_FOUND",
      error_description: "Cliente não encontrado",
    });
  }

  if (origin == destination) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Os endereços não podem ser iguais",
    });
  }

  fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`
  )
    .then((response) => response.json())
    .then(async (data) => {
      const distance = data.routes[0].legs[0].distance.value / 1000;

      const availableDrivers = await Driver.find({ kmMin: { $lte: distance } });

      const options = availableDrivers.map((driver) => {
        const calculatedValue = distance * driver.tax;

        return {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: {
            rating: driver.review[0].rating,
            comment: driver.review[0].comment,
          },
          value: calculatedValue.toFixed(2),
        };
      });

      options.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));

      const dataEstimate = {
        origin: {
          latitude: data.routes[0].legs[0].start_location.lat,
          longitude: data.routes[0].legs[0].start_location.lng,
        },
        destination: {
          latitude: data.routes[0].legs[0].end_location.lat,
          longitude: data.routes[0].legs[0].end_location.lng,
        },

        distance: data.routes[0].legs[0].distance.value,
        duration: data.routes[0].legs[0].duration.text,
        options,
        routerResponse: data.routes,
      };

      res.status(200).json(dataEstimate);
    })
    .catch((error) => console.error("Erro:", error));
};

const confirm = async (req, res) => {
  try {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = req.body;

    if (
      !customer_id ||
      !origin ||
      !destination ||
      !distance ||
      !duration ||
      !driver ||
      !driver.id ||
      !driver.name ||
      !value
    ) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Por favor, preencha todos os campos obrigatórios.",
      });
    }

    if (origin == destination) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Os endereços não podem ser iguais",
      });
    }

    const customer = await Customer.findOne({ customer_id: customer_id });

    if (!customer) {
      return res.status(404).json({
        error_code: "CUSTOMER_NOT_FOUND",
        error_description: "Cliente não encontrado",
      });
    }

    const driverFound = await Driver.findOne({ id: driver.id });

    if (!driverFound) {
      return res.status(404).json({
        error_code: "DRIVER_NOT_FOUND",
        error_description: "Motorista não encontrado",
      });
    }

    if (distance < driverFound.kmMin) {
      return res.status(406).json({
        error_code: "INVALID_DISTANCE",
        error_description: "Quilometragem inválida para o motorista",
      });
    }

    const newRide = {
      date: Date.now(),
      origin: origin,
      destination: destination,
      distance: distance,
      duration: duration,
      driver: {
        id: driver.id,
        name: driverFound.name,
      },
      value: value,
    };

    // Adicionando uma nova corrida no array de Rides no Customer
    customer.rides.push(newRide);

    await customer.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Ocorreu um erro ao criar a Corrida.");
  }
};

const getCustomerRides = async (req, res) => {
  try {
    const { customer_id } = req.params;

    const customerRides = await Customer.findOne({ customer_id }, { rides: 1 });

    if (!customerRides) {
      return res.status(404).send({
        error_code: "NO_RIDES_FOUND",
        error_description: "Nenhum registro encontrado",
      });
    }

    res.status(200).json(customerRides);
  } catch (error) {
    res.status(500).send("Ocorreu um erro buscar as Corridas.");
  }
};

const getCustomerRidesByDriver = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    const customer = await Customer.findOne({ customer_id }, { rides: 1 });

    if (!customer_id) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Por favor, preencha todos os campos obrigatórios.",
      });
    }

    if (!customer || !customer.rides.length) {
      return res.status(404).send({
        error_code: "NO_RIDES_FOUND",
        error_description: "Nenhum registro encontrado",
      });
    }

    let filteredRides = customer.rides;

    // Verificando se foi passado o id do motorista no parametro
    if (driver_id) {
      filteredRides = customer.rides.filter(
        (ride) => ride.driver.id.toString() === driver_id
      );
    }

    if (!filteredRides.length) {
      return res.status(404).send({
        error_code: "NO_RIDES_FOUND",
        error_description:
          "Nenhuma corrida encontrada para o motorista fornecido.",
      });
    }

    filteredRides = filteredRides.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const formattedRides = filteredRides.map((ride) => ({
      id: ride._id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    }));

    // Retorna a resposta no formato desejado
    res.status(200).json({
      customer_id,
      rides: formattedRides,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocorreu um erro ao buscar as corridas.");
  }
};

module.exports = {
  estimate,
  confirm,
  getCustomerRides,
  getCustomerRidesByDriver,
};
