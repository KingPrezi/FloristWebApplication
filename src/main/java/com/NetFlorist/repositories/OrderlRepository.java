/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.repositories;

import com.NetFlorist.model.Orderl;
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
public interface OrderlRepository extends CrudRepository<Orderl, Integer>{
   //Spring dynamically creates a proxy that implements the same interface(s) as the class you're annotating
    @Transactional
    // will trigger the query annotated to the method as updating query instead of a selecting one
    @Modifying
    @Query("Delete FROM Orderl l WHERE l.name = :name")
    public int deleteOrder(@Param("name") String name);

   

 
}