import React from 'react';
import { Button, Table } from 'react-bootstrap';

const UserTable = (props) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
					<th>Cédula</th>
                    <th>Nombre</th>
					<th>Apellidos</th>
                    <th>Email</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                { props.users.length > 0 ? (
                    props.users.map(user => {
                        const {id, ced, name, lastname, email} = user;
                        return (
                            <tr key={id}>
								<td>{ced}</td>
                                <td>{name}</td>
                                <td>{lastname}</td>
                                <td>{email}</td>
                                <td>
								    <Button variant="warning" block onClick={() => props.editUser(id, user)}>Editar</Button>
                                </td>
                                <td>
                                    <Button variant="danger" block onClick={() => props.deleteUser(id)}>Eliminar</Button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={6}>No hay usuarios Registrados</td>
                    </tr>
                )   
                }
            </tbody>
        </Table>
    )
}

export default UserTable;