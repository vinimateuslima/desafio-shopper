import "./Opcoes.css";

import Map from "../../Components/Map/Map.jsx";

//Toast
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Navigate
import { useNavigate } from "react-router-dom";

const Opcoes = () => {
  const url = "http://localhost:8080/ride/confirm";

  const data = JSON.parse(localStorage.getItem("Data"));

  const information = JSON.parse(localStorage.getItem("Information"));

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const confirm = (id) => {
    const { start, end, customer_id } = information;

    const driver = data.options.find((driver) => driver.id === id);

    const dataConfirm = {
      customer_id: customer_id,
      origin: start,
      destination: end,
      distance: data.distance,
      duration: data.duration,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value,
    };



    MySwal.fire({
      title: "Deseja confirmar a corrida?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      allowOutsideClick: false,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataConfirm),
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
              await MySwal.fire({
                title: "Corrida confirmada com sucesso!",
                html: "Essa janela fechará em breve.",
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
                allowOutsideClick: false,
              });

              navigate("/historico");
            }
          })
          .catch((error) => console.error("Erro:", error));
      }
    });
  };

  return (
    <div className="container-opcoes">
      <div className="mapa">
        <Map origin={data.origin} destination={data.destination} />
      </div>
      <div className="container-table">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Veículo</th>
              <th>Avaliação</th>
              <th>Valor da viagem</th>
              <th>Opção</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.options.map((driver, index) => (
                <tr key={index}>
                  <td>{driver.name}</td>
                  <td>{driver.description}</td>
                  <td>{driver.vehicle}</td>
                  <td>
                    <p>{driver.review.rating} / 5</p>
                    <p>{driver.review.comment}</p>
                  </td>
                  <td>R$ {driver.value} / Km</td>
                  <td>
                    <button
                      type="button"
                      className="btn-escolher"
                      onClick={() => confirm(driver.id)}
                    >
                      Escolher
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Opcoes;
