/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.repositories;


import com.NetFlorist.model.Orders;
import java.util.ArrayList;
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
public interface OrdersRepository  extends CrudRepository<Orders, Integer>{
    //Spring dynamically creates a proxy that implements the same interface(s) as the class you're annotating
    @Transactional
    // will trigger the query annotated to the method as updating query instead of a selecting one
    @Modifying
    @Query("Update Orders o SET o.orderstatus = :orderstatus WHERE o.orderID = :orderID")
    public int updateOrderStatus(@Param("orderID") int orderId, @Param("orderstatus") String orderstatus);

    @Transactional
    @Modifying
    @Query("Delete FROM Orders o WHERE o.orderno = :orderno")
    public int deleteOrder(@Param("orderno") int orderNo);
     
    @Query("SELECT o FROM Orders o WHERE o.orderno = :orderno")
    public ArrayList<Orders> findOrderByOrderNo(@Param("orderno") int orderNo);
}
