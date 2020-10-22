import React, { useState, useEffect} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import UserTable from "./tables/UserTable";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/users/listar')
    .then(result => {
      let user = result.data;
      setUsers(
        user.map(u => {
          return {
            id: u.id,
            ced: u.ced,
            name: u.name,
            lastname: u.lastname,
            email: u.email
          };
        })
      );
    })
    .catch(err => alert(err));
  },[]);

  /**Método que guarda el usuario recibiendolo del formulario */
  const addUser = (user) => {
    axios.post('http://localhost:8080/users/guardar', user)
    .then(result => {
      if(result.data != null){
        setUsers([...users, user]);
      }
      console.log(result.data)
    });
  };
  /**Método que elimina el usuario */
  const deleteUser = (id) => {
	  if(window.confirm('¿Desea eliminarlo?')){
      axios.delete('http://localhost:8080/users/eliminar/'+id)
      .then(result => {
        if(result.data != null){
          setUsers(users.filter((user) => user.id !== id))
          console.log(result.data)
        }
      });      
    }
  };

  const [editing, setEditing] = useState(false);

  const initialUser = { id: null, ced: "", name: "", lastname: "", email: "" };

  const [currentUser, setCurrentUser] = useState(initialUser);


  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  };
  
  /**Método que edita el usuario recibiendolo del formulario */
  const updateUser = (newUser) => {
    axios.put('http://localhost:8080/users/actualizar', newUser)
    .then(result => {
      if(result.data != null){
        setUsers(
          users.map((user) => (user.id === currentUser.id ? newUser : user))
        );
        setCurrentUser(initialUser);
        setEditing(false);
      }
      console.log(result.data)
    })
  };

  return (
    <Container>
      <h1>CRUD USUARIOS | Tarea 3 Fundamentos Web</h1>
      <hr></hr>
      <Row>
        <Col xs={12} md={5}>
          {editing ? (
            <div>
              <h2>Editar Usuario</h2>
              <EditUserForm
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Agregar Usuario</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </Col>
        <Col xs={12} md={7}>
          <h2>Lista de Usuarios</h2>
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editUser={editUser}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
