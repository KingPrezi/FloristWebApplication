/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.services;

import com.NetFlorist.model.Orders;
import com.NetFlorist.repositories.OrdersRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
//annotation is used to annotate classes that perform service tasks
@Service
public class OrdersService {
    //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities.
    @Autowired
    private OrdersRepository orderRepository;
    
    public Orders saveOrders(Orders orders)
    {
   
        return orderRepository.save(orders);
    }
    
    public Object findAllOrders()
    {
        return orderRepository.findAll();
    }
    
    public int updateOrdersStatus(int orderID, String statusStatus)
    {
        return orderRepository.updateOrderStatus(orderID, statusStatus);
    }
    
   public int deleteOrders(int orderNo)
   {
       return orderRepository.deleteOrder(orderNo);
   }
     
   public ArrayList<Orders> findOrdersByOrderNo(int orderNo)
   {
       return orderRepository.findOrderByOrderNo(orderNo);
   }
}
