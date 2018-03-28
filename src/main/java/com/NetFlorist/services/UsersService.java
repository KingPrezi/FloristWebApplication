/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.services;

import com.NetFlorist.model.Users;
import com.NetFlorist.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
//annotation is used to annotate classes that perform service tasks
@Service
public class UsersService {
    //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities.
    @Autowired
    private UsersRepository usersRepository;
    
    public Users saveUser(Users users)
    {
      PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
      String hashedPassword = passwordEncoder.encode(users.getPassword());
      users.setPassword(hashedPassword);
      return usersRepository.save(users);
    }
    
    public Users findUserByUserId(int userId)
    {
        return usersRepository.findOne(userId);
    }
    
    public void deleteUser(int userId)
    {
        usersRepository.delete(userId);
    }
    
    public Users userLogin(String email)
    {
        return usersRepository.login(email);
    }
    
}
