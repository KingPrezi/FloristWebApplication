/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NetFlorist.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



/**
 *
 * @author User
 */
@Entity
@Table(name = "orderl")
@NamedQueries({
    @NamedQuery(name = "Orderl.findAll", query = "SELECT l FROM Orderl l")
    , @NamedQuery(name = "Orderl.findBylisID", query = "SELECT l FROM Orderl l WHERE l.listID = :listID")
    , @NamedQuery(name = "Orderl.findByName", query = "SELECT l FROM Orderl l WHERE l.name = :name")})
public class Orderl implements Serializable {
//universal version identifier for a Serializable class
    private static final long serialVersionUID = 1L;
   //indicating the member field below is the primary key of current entity.
    @Id
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "listID")
    private Integer listID;
    @Column(name = "name")
    private String name;

    public Orderl() {
    }

    public Orderl(Integer listID) {
        this.listID = listID;
    }

    public Orderl(Integer listID, String name) {
        this.listID = listID;
        this.name = name;
    }

    public Integer getListID() {
        return listID;
    }

    public void setListID(Integer listID) {
        this.listID = listID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
