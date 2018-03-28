/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.controller;

import com.NetFlorist.exceptions.DataNotFoundException;
import com.NetFlorist.model.Bank;
import com.NetFlorist.services.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author User
 */
//?
//@Controller annotation indicates that a particular class serves the role of a controller. 
//acts as a stereotype for the annotated class, indicating its role. 
@Controller
//map web requests onto specific handler classes and/or handler methods.
@RequestMapping(value = "/bank")
public class BankController{
    //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities. 
    @Autowired
    private BankService bankService;
    
  //######################## find bank account details  #####################################
    @RequestMapping(value = "/findBankAccount/{cardNo}/{cardHolder}/{bankName}", method = RequestMethod.GET)
    //used to bind the HTTP request/response body with a domain object in method parameter or return type
    @ResponseBody
    public Bank findBankAccount(@PathVariable int cardNo, @PathVariable String cardHolder, @PathVariable String bankName)
    {
        Bank bank = bankService.findBankAccount(cardNo, cardHolder, bankName);
        
        if(bank == null)
        {
            throw new DataNotFoundException("Account Not Authorized..Verify your Credict Card Details...");
        }
        return bank;
    }
    
    
     
   //######################## Update Bank balance after deduction#####################################
    @RequestMapping(value = "/updateBankBalance/{cardNo}/{balance}", method = RequestMethod.PUT)
    @ResponseBody
    public int updateBankBalance(@PathVariable int cardNo, @PathVariable double balance)
    {
        
         int update = bankService.updateBankBalance(cardNo, balance);
         
         if(update == 0)
         {
            throw new DataNotFoundException("Bank Balance Not updated...");
         }
            
        return update;
    }
    
}
