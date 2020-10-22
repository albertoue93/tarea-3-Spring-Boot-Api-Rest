import React, {useState} from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const AddUserForm = (props) => {

	/*var maxNumber = 100;
	var randomNumber = Math.floor((Math.random() * maxNumber) + 1);*/
	
    const initUser = {id: '', ced: '', name: '', lastname: '', email: ''};
	
	const [error, setError] = useState(false);
	
	const [message, setMessage] = useState(false);

    const [user, setUser] = useState(initUser);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }
	/**Guarda el usuario enviandolo al metodo principal*/
    const handleSubmit = e => {
		e.preventDefault();
		/**Verifica que los campos no esten vacíos */
		if (user.ced && user.name && user.lastname && user.email ) {
            handleChange(e, props.addUser(user));
			setMessage(true);
			setError(false);
			setUser(initUser);
        }else{
			console.log("Campos Vacios");
			setError(true);
			return;
		}
	}
	/**Alerta de campos vacíos */
	let component
	if(error === true){
		component = <Alert variant="danger">Campos Vacios</Alert>
		setTimeout(() => {
			setError(1);
		}, 3000);
	}else{
		component = null;
	}
	/**Alerta de Usuario Guardado */
	let messageText
	if(message === true){
		messageText = <Alert variant="success">Usuario Guardado</Alert>
		setTimeout(() => {
			setMessage(1);
		}, 3000);		
	}else{
		messageText = null;
	}

    return (
        <Form className="myForm">
		{component} {messageText}
			<Form.Label>Cédula</Form.Label>
            <Form.Control className="u-full-width" type="text" value={user.ced} name="ced" onChange={handleChange} />
			
            <Form.Label>Nombre</Form.Label>
            <Form.Control className="u-full-width" type="text" value={user.name} name="name" onChange={handleChange} />
			
			<Form.Label>Apellidos</Form.Label>
            <Form.Control className="u-full-width" type="text" value={user.lastname} name="lastname" onChange={handleChange} />
			
            <Form.Label>Email</Form.Label>
            <Form.Control className="u-full-width" type="email" value={user.email} name="email" onChange={handleChange} />
			<hr></hr>
            <Button  variant="success" block type="submit" onClick={handleSubmit} >Agregar Usuario</Button >
        </Form>
    )
}

export default AddUserForm;