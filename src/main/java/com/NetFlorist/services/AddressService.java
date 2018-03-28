/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.services;

import com.NetFlorist.model.Address;
import com.NetFlorist.repositories.AddressRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
//annotation is used to annotate classes that perform service tasks
@Service
public class AddressService {
  //Marks a constructor, method or config method as to be autowired by Spring's dependency injection facilities.
    @Autowired
    private AddressRepository addressRepository;
    
     public Address saveAddress(Address address)
    {
        return addressRepository.save(address);
    }  
    
    public ArrayList<Address> findAddressByOrderNo(int orderNo)
    {
        return addressRepository.findAddressByOrderNo(orderNo);
    }
    
    public int deleteDelivary(int orderNo)
    {
        return addressRepository.deleteAddress(orderNo);
    }
}
