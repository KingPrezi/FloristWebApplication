/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author User
 */

@Entity
@Table(name = "address")
//uniquely associate a root element with a class.
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Address.findAll", query = "SELECT a FROM Address a")
    , @NamedQuery(name = "Address.findByAddressID", query = "SELECT a FROM Address a WHERE a.addressID = :addressID")
    , @NamedQuery(name = "Address.findByOrderno", query = "SELECT a FROM Address a WHERE a.orderno = :orderno")
    , @NamedQuery(name = "Address.findByName", query = "SELECT a FROM Address a WHERE a.name = :name")
    , @NamedQuery(name = "Address.findBySurname", query = "SELECT a FROM Address a WHERE a.surname = :surname")
    , @NamedQuery(name = "Address.findByEmail", query = "SELECT a FROM Address a WHERE a.email = :email")
    , @NamedQuery(name = "Address.findByContacts", query = "SELECT a FROM Address a WHERE a.contacts = :contacts")
    , @NamedQuery(name = "Address.findByStreet", query = "SELECT a FROM Address a WHERE a.street = :street")
    , @NamedQuery(name = "Address.findByCity", query = "SELECT a FROM Address a WHERE a.city = :city")
    , @NamedQuery(name = "Address.findByProvince", query = "SELECT a FROM Address a WHERE a.province = :province")})

public class Address implements Serializable {
//universal version identifier for a Serializable class
    private static final long serialVersionUID = 1L;
   //indicating the member field below is the primary key of current entity.
    @Id
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "addressID")
    private Integer addressID;
   
    @Column(name = "orderno")
    private int orderno;
    
  
   
    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "contacts")
    private String contacts;
    
    @Column(name = "street")
    private String street;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "province")
    private String province;

    public Address() {
    }

    public Address(Integer addressID) {
        this.addressID = addressID;
    }

  

    public Integer getAddressID() {
        return addressID;
    }

    public void setAddressID(Integer addressID) {
        this.addressID = addressID;
    }

    public int getOrderno() {
        return orderno;
    }

    public void setOrderno(int orderno) {
        this.orderno = orderno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContacts() {
        return contacts;
    }

    public void setContacts(String contacts) {
        this.contacts = contacts;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

  
}
