/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.services;

import com.NetFlorist.model.Category;
import com.NetFlorist.repositories.CatagoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
//annotation is used to annotate classes that perform service tasks
@Service
public class CategoryService{
    //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities.
    @Autowired
    private CatagoryRepository categoryRepository;
    
    public Object findAllCategories()
    {
        return categoryRepository.findAll();
    }
    
    public Category saveCategory(Category category)
    {
        return categoryRepository.save(category);
    }
    
    public int deleteCategory(String name)
    {
        return categoryRepository.deleteCategory(name);
    }
}
