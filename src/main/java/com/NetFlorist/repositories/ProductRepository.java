/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.repositories;

//
import com.NetFlorist.model.Product;
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
public interface ProductRepository  extends CrudRepository<Product, Integer>{
    //Spring dynamically creates a proxy that implements the same interface(s) as the class you're annotating
     @Transactional
    // will trigger the query annotated to the method as updating query instead of a selecting one
     @Modifying
     @Query("Delete FROM Product p WHERE p.productID = :productID")
     public int deleteProduct(@Param("productID") int productId);
     
     
     @Query("SELECT p FROM Product p WHERE p.category = :category")
     public ArrayList<Product> findProductByCategory(@Param("category") String category);
     
      @Transactional
    // will trigger the query annotated to the method as updating query instead of a selecting one
    @Modifying
    @Query("Update Product p SET p.quantity = :quantity WHERE p.productID = :productID")
    public int updateQuantity(@Param("productID") int productid, @Param("quantity") int quantity);

     @Query("SELECT p FROM Product p WHERE p.quantity < 20")
    public ArrayList<Product> findAllOrd();
     
}