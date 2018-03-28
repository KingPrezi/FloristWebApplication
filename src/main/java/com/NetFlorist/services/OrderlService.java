/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.services;


import com.NetFlorist.model.Orderl;
import com.NetFlorist.repositories.OrderlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
//annotation is used to annotate classes that perform service tasks
@Service
public class OrderlService{
    //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities.
    @Autowired
    private OrderlRepository orderlRepository;
    
    public Object findAllOrderlist()
    {
        return orderlRepository.findAll();
    }
    
    public Orderl saveOrderList(Orderl orderl)
    {
        return orderlRepository.save(orderl);
    }
    
    public int deleteOrder(String name)
    {
        return orderlRepository.deleteOrder(name);
    }

}
