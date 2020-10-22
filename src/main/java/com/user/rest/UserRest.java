package com.user.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.dao.UserDAO;
import com.user.model.User;

@RestController
@CrossOrigin("*")
@RequestMapping("users")

public class UserRest {
	
	@Autowired
	private UserDAO userDAO;
	
	//METODOS HTTP
	
	//POST
	@PostMapping("/guardar")
	public String guardar(@RequestBody User user) {
		try {
			userDAO.save(user);
			return String.format("Usuario Guardado Correctamente");
		} catch (Exception e) {
			// TODO: handle exception
			return String.format("Usuario No Guardado");
		}
	}
	
	//GET
	@GetMapping("/listar")
	public List<User> listar(){
		return userDAO.findAll();
	}
	
	//GET BY ID
	@GetMapping("/listar/{id}")
	public User listarUser(@PathVariable("id") Integer id) {
		return userDAO.findById(id).orElse(null);
	}
	
	//PUT
	@PutMapping("/actualizar")
	public String actualizar(@RequestBody User user) {
		try {
			User oldUser = userDAO.findById(user.getId()).orElse(null);
			oldUser.setCed(user.getCed());
			oldUser.setEmail(user.getEmail());
			oldUser.setLastname(user.getLastname());
			oldUser.setName(user.getName());
			userDAO.save(oldUser);
			return String.format("Usuario Modificado Correctamente");
		} catch (Exception e) {
			// TODO: handle exception
			return String.format("Usuario No Modificado");
		}
		
	}
	
	//DELETE
	@DeleteMapping("/eliminar/{id}")
	public String eliminar(@PathVariable("id") Integer id) {
		try {
			userDAO.deleteById(id);
			return String.format("Usuario Eliminado Correctamente");
		} catch (Exception e) {
			// TODO: handle exception
			return String.format("Usuario No Eliminado");
		}
		
	}
}
