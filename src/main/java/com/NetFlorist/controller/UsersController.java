/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.controller;

import com.NetFlorist.exceptions.DataNotFoundException;
import com.NetFlorist.model.Users;
import com.NetFlorist.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author User
 */
//adds the @Controller and @ResponseBody annotations
@RestController
//map web requests onto specific handler classes and/or handler methods.
@RequestMapping(value = "/user")
public class UsersController {
    //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities. 
    @Autowired
    private UsersService usersService;
  
    //========================Find User Based on ID======================
    @RequestMapping(value = "/findUserByUserId/{userId}" , method = RequestMethod.GET)
    //used to bind the HTTP request/response body with a domain object in method parameter or return type
    @ResponseBody
    public Users findUsersByUserId(@PathVariable int userId)
    {
        Users user = usersService.findUserByUserId(userId);
        if(user == null)
        {
            throw new DataNotFoundException("User does not Exist");
        }
        return user;
    }
    
    //========================Register  User======================
   @RequestMapping(method = RequestMethod.POST, value="/register")
   @ResponseBody
    public Users registerUsers(@RequestBody Users users) throws Exception 
    {
        Users  user = usersService.saveUser(users);
        if(user != null)
        {
            return user;
        }else{
            throw new DataNotFoundException("User Not Registered,Email already exists");
        }     
    }
    
    //========================User Login Using username and password======================
    @RequestMapping(value="/login/{username}/{password}", method = RequestMethod.GET)
    @ResponseBody
    public Users userLogin(@PathVariable String username, @PathVariable String password)
    { 
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
        Users user = usersService.userLogin(username);
        if(user != null)
        {
           if(passwordEncoder.matches(password, user.getPassword()))
           {
              return user;
           }else
           {
              throw new DataNotFoundException("Incorrect Password");
           }
        }else{
             throw new DataNotFoundException("e-mail does not exist");
        }
    }
    
}
