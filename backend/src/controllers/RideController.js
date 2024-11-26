const Driver = require("../models/Driver");
require("dotenv").config();

const estimate = async (req, res) => {
  const { customer_id, origin, destination } = req.body;

  if (!customer_id || !origin || !destination) {
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

  fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`
  )
    .then((response) => response.json())
    .then(async (data) => {
      const distance = data.routes[0].legs[0].distance.value / 1000;

      const availableDrivers = await Driver.find({ value: { $lte: distance } });

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

      const dataEstimate = {
        origin: {
          latitude: data.routes[0].legs[0].start_location.lat,
          longitude: data.routes[0].legs[0].start_location.lng,
        },
        destination: {
          latitude: data.routes[0].legs[0].end_location.lat,
          longitude: data.routes[0].legs[0].end_location.lng,
        },

        distance: distance,
        duration: data.routes[0].legs[0].duration.value,
        options,
        routerResponse: data.routes,
      };

      res.status(200).json(dataEstimate);
    })
    .catch((error) => console.error("Erro:", error));
};

module.exports = {
  estimate,
};
