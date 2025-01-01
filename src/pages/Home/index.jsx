import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [usuarios, setUsuarios] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsuarios() {
    const usuariosApi = await api.get("/usuarios");

    setUsuarios(usuariosApi.data);
  }

  async function addUsuarios() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsuarios();
  }

  async function deleteUsuarios(id) {
    await api.delete(`/usuarios/${id}`);
    getUsuarios();
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro</h1>
        <input name="name" type="text" placeholder="Nome" ref={inputName} />
        <input name="age" type="number" placeholder="Idade" ref={inputAge} />
        <input name="email" type="email" placeholder="Email" ref={inputEmail} />
        <button type="button" onClick={addUsuarios}>
          Enviar
        </button>
      </form>

      {usuarios.map((usuario) => (
        <div key={usuario.id} className="card">
          <div>
            <p>
              Nome: <span>{usuario.name}</span>{" "}
            </p>
            <p>
              Idade: <span>{usuario.age}</span>{" "}
            </p>
            <p>
              Email: <span>{usuario.email}</span>{" "}
            </p>
          </div>
          <button onClick={() => deleteUsuarios(usuario.id)}>
            <img src={Trash} alt="Trash" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
