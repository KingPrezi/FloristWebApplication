/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.controller;

import com.NetFlorist.exceptions.DataNotFoundException;
import com.NetFlorist.model.Orders;
import com.NetFlorist.services.AddressService;
import com.NetFlorist.services.OrdersService;
import java.util.ArrayList;
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
//map web requests onto specific handler classes and/or handler methods.
@RequestMapping(value = "/orders")
public class OrdersController {
    //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities. 
    @Autowired
    private OrdersService ordersServices;
    
    @Autowired
    private AddressService addressService;
    
     //=========================Save an Order==========================
    @RequestMapping(value = "/saveOrders", method = RequestMethod.POST)
    //used to bind the HTTP request/response body with a domain object in method parameter or return type
    @ResponseBody
    public Orders saveOrder(@RequestBody Orders orders)
    {
       Orders order = ordersServices.saveOrders(orders);
           
        if(order == null)
        {
            throw new DataNotFoundException("Order Not Saved...");
        }
       
        return order;
    }
    
     //===============Remove Order ==========================
    @RequestMapping(value = "/findAllOrders", method = RequestMethod.GET)
    @ResponseBody
    public Object findAllOrders()
    {
        
        Object object =  ordersServices.findAllOrders();
        if(object == null)
        {
            throw new DataNotFoundException("Orders not Found...");
        }
       return object;
    }
    
    //=================Update Order Status based on a orderno==========================
    @RequestMapping(value = "/updateOrderStatus/{orderId}/{orderStatus}", method = RequestMethod.PUT)
    @ResponseBody
    public int updateOrderStatus(@PathVariable int orderId, @PathVariable String orderStatus )
    {
       
       int updated = ordersServices.updateOrdersStatus(orderId, orderStatus);
       if(updated != 1)
       {
           throw new DataNotFoundException("Order Status Not Updated...");
       }
       return updated;
    }
    
    //=====================Remove Order Status==========================
    @RequestMapping(value = "/deleteOrders/{orderNo}" , method = RequestMethod.DELETE)
    @ResponseBody
    public int removeOrderStatu(@PathVariable int orderNo )
    {
       int delete = ordersServices.deleteOrders(orderNo);
        
        if(delete != 1){
            throw new DataNotFoundException("Order Not Deleted...");
        }else{
            if(delete == 1)
            {
                 addressService.deleteDelivary(orderNo);
            }
        }
        return delete;
    }
    
    //======================View Order Status based on a orderNo==========================
    @RequestMapping(value = "/findByOrderNo/{orderno}", method = RequestMethod.GET)
    @ResponseBody
    public ArrayList<Orders> viewByOrderNo(@PathVariable int orderno)
    {
        ArrayList<Orders> orderList = ordersServices.findOrdersByOrderNo(orderno);
        
        if(orderList == null)
        {
            throw new DataNotFoundException("Orders Not Found...");
        }
        
        return orderList;
    }
    
}
