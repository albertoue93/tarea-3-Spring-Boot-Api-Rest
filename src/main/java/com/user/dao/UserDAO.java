package com.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.user.model.User;

public interface UserDAO extends JpaRepository<User, Integer> {

}
