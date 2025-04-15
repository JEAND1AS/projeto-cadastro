import { useEffect, useState, useRef } from "react";
import "./style.css";
import Lixeira from "../../assets/lixeira.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const userFromApi = await api.get("/usuarios");

    setUsers(userFromApi.data);
  }

  async function CreateUsers() {
    const resposta = async () => {
      return await api
        .post("/usuarios", {
          name: inputName.current.value,
          age: inputAge.current.value,
          email: inputEmail.current.value,
        })
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    };
    await resposta()
      .then(() => {
        alert(`Usuário ${inputName.current.value} criado com sucerro!`)
         //popup de alerta com o nome do usuário
        getUsers();
      })
      .catch((error) => {
        console.log(error);
        [409].includes(error?.response?.status)
          ? alert(error?.response?.data?.message)
          : alert("Ocorreu um erro ao criar usuário");
      });

    /* Toda vez que criar um usuário, ele ira chamar a função getUser() e atualizar automático */
  }

  async function deleteUsers(id) {
    const userToDelete = users.find(user => user.id === id); // Encontra o usuário pelo ID
    
    await api.delete(`/usuarios/${id}`)
      .then(() => {
        alert(`Usuário ${userToDelete?.name} apagado!`); //popup de alerta com o nome do usuário excluído
        getUsers();
      })
  }

  useEffect(() => {
    getUsers();
  }, []);

  /* Placeholder é um texto ou valor inserido dentro de um campo de entrada */
  return (
    <div className="container">
      <form
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          e.preventDefault();
          CreateUsers();
        }
      }}>
        <h1>Cadastro de Usuários</h1>

        <input
          placeholder="Nome"
          name="nome"
          type="text"
          ref={inputName}
        ></input>

        <input
          placeholder="Idade"
          name="idade"
          type="number"
          ref={inputAge}
        ></input>

        <input
          placeholder="Email"
          name="email"
          type="email"
          ref={inputEmail}
          >

        </input>
        <button type="button" onClick={CreateUsers}>
          Cadastrar
        </button>{" "}
        {/* Aqui dentro do button adicionamos um onClick={CreateUsers} para chamar essa variável quando apertamos em cadastrar */}
      </form>

      {/*user.map é a gente usando javascript dentro do react  */}
      {users.map((user) => (
        /* Código abaixo são os cards de nomes, idade e email cadastrado, e dentro do card colocamos outra div para adicionar o botão */
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>

          <button className="delete" onClick={() => deleteUsers(user.id)}>
            <img src={Lixeira} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
