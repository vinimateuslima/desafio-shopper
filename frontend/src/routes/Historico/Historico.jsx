import "./Historico.css";

import { useState } from "react";

//Toast
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Historico = () => {
  const url = "http://localhost:8080/ride/getCustomerRidesByDriver";
  const [customerId, setCustomerId] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const MySwal = withReactContent(Swal);

  const filterRides = (customerId, selectedOption) => {
    if (!customerId) {
      return MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Preencha todos os campos obrigatórios",
      });
    }

    let driverRequest = "";

    if (selectedOption != "all") {
      driverRequest = `?driver_id=${selectedOption}`;
    }

    setIsLoading(true);

    fetch(`${url}/${customerId}${driverRequest}`)
      .then((response) => response.json())
      .then(async (data) => {
       
        if (data.error_code) {
          await MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: data.error_description,
          });
        } else {
          setData(data);
          setIsLoading(false);
         
        }
      })
      .catch((error) => console.error("Erro:", error))
      .finally(() => {
       
        setIsLoading(false);
      });
  };

  const handleCustomerId = (e) => {
    let value = e.target.value;
    setCustomerId(value);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Formata a data manualmente de forma simples
    const day = String(date.getDate()).padStart(2, "0"); // Adiciona 0 à esquerda se for < 10
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses começam do 0, então +1
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="container-historico">
      <h1>Histórico de Viagens</h1>
      <div className="filter-section">
        <label htmlFor="userId">ID do Usuário:</label>
        <input
          type="text"
          id="customerId"
          value={customerId}
          onChange={handleCustomerId}
          placeholder="Informe o ID do cliente"
        />

        <label htmlFor="driverFilter">Motorista:</label>
        <select onChange={handleSelectChange} value={selectedOption}>
          <option value="all">Mostrar Todos</option>
          <option value="1">Homer Simpson</option>
          <option value="2">Dominic Toretto</option>
          <option value="3">James Bond</option>
        </select>

        <button
          id="applyFilter"
          onClick={() => filterRides(customerId, selectedOption)}
        >
          Aplicar Filtro
        </button>
      </div>

      <table className="trips-table">
        <thead>
          <tr>
            <th>Data e Hora</th>
            <th>Motorista</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Distância</th>
            <th>Tempo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody id="tripsList">
          {isLoading ? (
            <tr className="loading">
              <td colSpan="7" style={{ textAlign: "center" }}>Carregando...</td>
            </tr>
          ) : (
            data &&
            data.rides.map((ride, index) => (
              <tr key={index}>
                <td>{formatDate(ride.date)}</td>
                <td>{ride.driver.name}</td>
                <td>{ride.origin}</td>
                <td>{ride.destination}</td>
                <td>{ride.distance} Km</td>
                <td>{ride.duration}</td>
                <td>R$ {ride.value}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Historico;
