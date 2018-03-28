/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.services;

import com.NetFlorist.model.Bank;
import com.NetFlorist.repositories.BankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
//annotation is used to annotate classes that perform service tasks
@Service
public class BankService{
    //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities.
    @Autowired
    private BankRepository bankRepository;
    
    public Bank findBankAccount(int cardNo, String cardHolder, String bankName)
    {
        return bankRepository.findBankAccount(cardNo, cardHolder, bankName);
    }
    
    public int updateBankBalance(int cardNo, double balance)
    {
        return bankRepository.updateBankBalance(cardNo, balance);
    }
}
