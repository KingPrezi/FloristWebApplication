/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.controller;

import com.NetFlorist.exceptions.DataNotFoundException;
import com.NetFlorist.model.Product;
import com.NetFlorist.services.ProductService;
import java.sql.SQLException;
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
@RequestMapping(value = "/product")
public class ProductController{
  //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities. 
    @Autowired
    private ProductService productService;
    
     //=============================Find All products==========================
    @RequestMapping(value = "/findAllProducts" , method = RequestMethod.GET)
    //used to bind the HTTP request/response body with a domain object in method parameter or return type
    @ResponseBody
    public Object findAllProduct()
    {
        Object products = productService.findAllProduct();
        if(products == null)
        {
            throw new DataNotFoundException("Products Not Found...");
        }
        return products;
    }
    
    //====================Find product based on product Id==========================
    @RequestMapping(value = "/findProductById/{productId}" , method = RequestMethod.GET)
    @ResponseBody
    public Product findProductByProductID(@PathVariable int productId)
    {
        Product product = productService.findProductByProductId(productId);
        if(product == null)
        {
            throw new DataNotFoundException("Product Do Not exists...");
        }
        return product;
    }
    
    
    //============================Save Products==========================
    @RequestMapping(value = "/saveProduct" , method = RequestMethod.POST)
    @ResponseBody
    public Product saveProduct(@RequestBody Product product) throws SQLException
    {
        
       Product products = productService.saveProduct(product);
       if(products == null)
       {
           throw new DataNotFoundException("Product Not Added...");
       }
       return products;
    }
    
    //============Remove Product based on product ID==========================
    @RequestMapping(value = "/deleteProduct/{productId}" , method = RequestMethod.DELETE)
    @ResponseBody
    public int deleteProduct(@PathVariable int productId)
    {
        int deleted = productService.deleteProduct(productId);
        
        if(deleted == 0)
        {
            throw new DataNotFoundException("Product Not deleted...");
        }
       return deleted;
    }
    
    
    //=========================Get Product based on Category name==========================
    @RequestMapping(value = "/findProductByCategory/{category}" , method = RequestMethod.GET)
    @ResponseBody
    public ArrayList<Product> retrieveProductsByCategory(@PathVariable String category)
    {
        ArrayList<Product> listPro = productService.findProductByCategory(category);
    
        if(listPro == null)
        {
            throw new DataNotFoundException("Category name do not exist....");
        }
        return listPro;
    }
    
        //=================Update quantity==========================
    @RequestMapping(value = "/updateQuantity/{productID}/{quantity}", method = RequestMethod.PUT)
    @ResponseBody
    public int updateQuantity(@PathVariable int productID, @PathVariable int quantity )
    {
       
       int updated = productService.updateQuantity(productID, quantity);
       if(updated != 1)
       {
           throw new DataNotFoundException("product not updated");
       }
       return updated;
    }
       
     @RequestMapping(value = "/findAllOrde" , method = RequestMethod.GET)
    //used to bind the HTTP request/response body with a domain object in method parameter or return type
    @ResponseBody
     public ArrayList<Product> findAllOrde()
    {
        ArrayList<Product> products = productService.findAllOrde();
        if(products == null)
        {
            throw new DataNotFoundException("Products Not Found...");
        }
        return products;
    }
}
