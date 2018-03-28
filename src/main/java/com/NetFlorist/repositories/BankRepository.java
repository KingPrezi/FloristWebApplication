/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.repositories;

import com.NetFlorist.model.Bank;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;

/**
 *
 * @author User
 */
//provide custom controllers that take advantage of spring data rest functionality
@RepositoryRestController
public interface BankRepository extends CrudRepository<Bank, Integer>{
  
    @Query("SELECT b FROM Bank b WHERE b.cardno = :cardno AND b.cardholder = :cardholder AND b.bankname = :bankname")
    public Bank findBankAccount(@Param("cardno") int cardNo, @Param("cardholder") String cardHolder, @Param("bankname") String bankName);
    //Spring dynamically creates a proxy that implements the same interface(s) as the class you're annotating
    @Transactional
    // will trigger the query annotated to the method as updating query instead of a selecting one
    @Modifying
    @Query("Update Bank b SET b.balance = :balance WHERE b.cardno = :cardno")
    public int updateBankBalance(@Param("cardno") int cardNo, @Param("balance") double balance);

}
