/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.controller;

import com.NetFlorist.exceptions.DataNotFoundException;
import com.NetFlorist.model.Category;
import com.NetFlorist.model.Orderl;
import com.NetFlorist.services.CategoryService;
import com.NetFlorist.services.OrderlService;
import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
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
//map web requests onto specific handler classes or handler methods.
@RequestMapping(value = "/orderl")
public class OrderlController{
     //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities. 
    @Autowired
    private OrderlService orderlService;
    
    //========================Find All Categories======================
    @RequestMapping(value = "/findAllOrderlist", method = RequestMethod.GET)
    //used to bind the HTTP request/response body with a domain object in method parameter or return type
    @ResponseBody
    public Object getAllRep()
    {
        Object object = orderlService.findAllOrderlist();
        if(object == null)
        {
            throw new DataNotFoundException("Category Not Deleted...");
        }
       return object; 
    }
  
    //========================Save Categories======================
    @RequestMapping(value = "/saveOrderList", method = RequestMethod.POST)
    @ResponseBody
    public Orderl saveOrderList(@RequestBody Orderl orderl) throws SQLException
    {
        Orderl orderl1 = orderlService.saveOrderList(orderl);
        
        if(orderl1 == null)
        {
            throw new DataNotFoundException("List Not Saved...");
        }
        return orderl1;         
    }
   
    //========================Delete Categories based on category Id======================
    @RequestMapping(value = "/deleteOrder/{name}", method = RequestMethod.DELETE)
    @ResponseBody
    public int deleteOrder(@PathVariable String name)
    {
        int deleteRow = orderlService.deleteOrder(name);
        
        if(deleteRow != 1)
        {
            throw new DataNotFoundException("List Not Deleted...");
        }
        
        return deleteRow;         
    }
    
}
