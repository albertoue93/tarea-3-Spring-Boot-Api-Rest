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
	public void guardar(@RequestBody User user) {
		userDAO.save(user);
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
	public void actualizar(@RequestBody User user) {
		User oldUser = userDAO.findById(user.getId()).orElse(null);
		oldUser.setCed(user.getCed());
		oldUser.setEmail(user.getEmail());
		oldUser.setLastname(user.getLastname());
		oldUser.setName(user.getName());
		userDAO.save(oldUser);
	}
	//DELETE
	@DeleteMapping("/eliminar/{id}")
	public void eliminar(@PathVariable("id") Integer id) {
		userDAO.deleteById(id);
	}
}
