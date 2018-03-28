package com.NetFlorist.model;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-03-28T13:20:13")
@StaticMetamodel(Orders.class)
public class Orders_ { 

    public static volatile SingularAttribute<Orders, String> image;
    public static volatile SingularAttribute<Orders, Integer> orderno;
    public static volatile SingularAttribute<Orders, Integer> quantity;
    public static volatile SingularAttribute<Orders, String> orderstatus;
    public static volatile SingularAttribute<Orders, Integer> productID;
    public static volatile SingularAttribute<Orders, Integer> orderID;
    public static volatile SingularAttribute<Orders, Date> delivarydate;
    public static volatile SingularAttribute<Orders, Date> orderdate;
    public static volatile SingularAttribute<Orders, Integer> userID;
    public static volatile SingularAttribute<Orders, Double> orderamount;
    public static volatile SingularAttribute<Orders, Double> price;
    public static volatile SingularAttribute<Orders, String> name;
    public static volatile SingularAttribute<Orders, String> category;

}