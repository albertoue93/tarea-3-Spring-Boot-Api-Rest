import React, {useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUserForm = (props) => {

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    const [user, setUser] = useState(props.currentUser);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
        }
    /**Edita el usuario enviandolo al metodo principal*/
    const handleSubmit = e => {
        e.preventDefault();
        if (user.ced && user.name && user.lastname && user.email){
			props.updateUser(user);
		}
	}
	
    return (
        <Form className="myForm">
            <Form.Label>Cédula</Form.Label>
            <Form.Control className="u-full-width" type="text" value={user.ced} name="ced" onChange={handleChange} />
			
			<Form.Label>Nombre</Form.Label>
            <Form.Control className="u-full-width" type="text" value={user.name} name="name" onChange={handleChange} />
			
            <Form.Label>Apellidos</Form.Label>
            <Form.Control className="u-full-width" type="text" value={user.lastname} name="lastname" onChange={handleChange} />
			
			<Form.Label>Email</Form.Label>
            <Form.Control className="u-full-width" type="text" value={user.email} name="email" onChange={handleChange} />
			<hr></hr>
            <Button variant="warning" block type="submit" onClick={handleSubmit} >Editar Usuario</Button>{' '}
            <Button variant="secondary" block type="submit" onClick={() => props.setEditing(false)} >Cancelar</Button>
        </Form>
    )
}

export default EditUserForm;