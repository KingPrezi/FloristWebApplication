package com.NetFlorist.controller;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 *
 * @author User
 */
//@Controller annotation indicates that a particular class serves the role of a controller. 
//acts as a stereotype for the annotated class, indicating its role. 
@Controller
public class NetFloristMainController {
    
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String homePage()
    {
        return "home";
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginPage()
    {
        return "login";
    }
    
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String registerPage()
    {
        return "register";
    }
    
   
    @RequestMapping(value = "/adminHomePage", method = RequestMethod.GET)
    public String adminPage()
    {
        return "adminHomePage";
    }
    
    @RequestMapping(value = "/addProduct", method = RequestMethod.GET)
    public String addProduct()
    {
        return "addProduct";
    }
    
   
    @RequestMapping(value = "/addCategory", method = RequestMethod.GET)
    public String addCategory()
    {
        return "addCategory";
    }
    
    @RequestMapping(value = "/registerAdmin", method = RequestMethod.GET)
    public String registerAdmin()
    {
        return "registerAdmin";
    }
    
    @RequestMapping(value = "/viewOrders", method = RequestMethod.GET)
    public String viewOrders()
    {
        return "viewOrders";
    }
    
    //##############################Customer Pages#########################
    @RequestMapping(value = "/customerHomePage", method = RequestMethod.GET)
    public String customerHomePage()
    {
        return "customerHomePage";
    }
    
    @RequestMapping(value = "/customerOrders", method = RequestMethod.GET)
    public String customerOrders()
    {
        return "customerOrders";
    }
    
     @RequestMapping(value = "/registerSupplier", method = RequestMethod.GET)
    public String registerSupplier()
    {
        return "registerSupplier";
    }
    
     @RequestMapping(value = "/registerDriver", method = RequestMethod.GET)
    public String registerDriver()
    {
        return "registerDriver";
    }
    
     @RequestMapping(value = "/supplierHomePage", method = RequestMethod.GET)
    public String supplierPage()
    {
        return "supplierHomePage";
    }
    
     @RequestMapping(value = "/driverHomePage", method = RequestMethod.GET)
    public String driverPage()
    {
        return "driverHomePage";
    }
    
     @RequestMapping(value = "/orderListPage", method = RequestMethod.GET)
    public String listPage()
    {
        return "orderListPage";
    }
    
}
