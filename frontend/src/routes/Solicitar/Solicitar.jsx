import "./Solicitar.css";

import { useState } from "react";

//Toast
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Navigate
import { useNavigate } from "react-router-dom";

const Solicitar = () => {
  const url = "http://localhost:8080/ride/estimate";

  const [customerId, setCustomerId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const handleRequestRide = async (e) => {
    e.preventDefault();

    try {
      const data = {
        customer_id: customerId,
        origin: origin,
        destination: destination,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(`${url}`, options)
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error_code) {
            await MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: data.error_description,
            });
          } else {
            localStorage.setItem(
              "Information",
              JSON.stringify({
                customer_id: customerId,
                start: data.routerResponse[0].legs[0].start_address,
                end: data.routerResponse[0].legs[0].end_address,
              })
            );

            delete data.routerResponse;

            localStorage.setItem("Data", JSON.stringify(data));

            await MySwal.fire({
              title: "Carregando estimativa de valor",
              html: "Essa janela fechará em breve.",
              timer: 2000,
              timerProgressBar: true,
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });

            navigate("/opcoes");
          }
        })
        .catch((error) => console.error("Erro:", error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomerId = (e) => {
    let value = e.target.value;
    setCustomerId(value);
  };

  const handleOrigin = (e) => {
    let value = e.target.value;
    setOrigin(value);
  };

  const handleDestination = (e) => {
    let value = e.target.value;
    setDestination(value);
  };

  return (
    <div className="container-solicitar">
      <form
        onSubmit={(e) => handleRequestRide(e)}
        id="form-solicitar"
        action=""
      >
        <h3>Solicite uma corrida</h3>
        <input
          type="text"
          maxLength={3}
          value={customerId}
          onChange={handleCustomerId}
          name="customer_id"
          id="customer_id"
          placeholder="Insira o Id do Cliente"
        />
        <input
          type="text"
          value={origin}
          onChange={handleOrigin}
          name="origin"
          id="origin"
          placeholder="Origem da corrida"
        />
        <input
          type="text"
          value={destination}
          onChange={handleDestination}
          name="destination"
          id="destination"
          placeholder="Destino da corrida"
        />
        <input type="submit" value="Estimar Valor" />
      </form>
    </div>
  );
};

export default Solicitar;
