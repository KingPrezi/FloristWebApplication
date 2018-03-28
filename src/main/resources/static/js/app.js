//netfloristApp refers to an html element in which the aplication will run
var netFloristModule = angular.module("NetFloristApp", ['ngRoute']);

netFloristModule.config(["$routeProvider", "$locationProvider", function ($routeProvider) {
        $routeProvider
                .when('/login', {
                    templateUrl: '/login.html',
                    controller: 'LoginController'
                }).when('/register', {
            templateUrl: '/register.html',
            controller: 'RegisterController'
        }).when('/adminHomePage', {
            templateUrl: '/adminHomePage.html',
            controller: 'ProductController'
        }).when('/addProduct', {
            templateUrl: '/addProduct.html',
            controller: 'AddProductController'
        }).when('/addCategory', {
            templateUrl: '/addCategory.html',
            controller: 'CategoryController'
        }).when('/registerAdmin', {
            templateUrl: '/registerAdmin.html',
            controller: 'RegisterController'
        }).when('/viewOrders', {
            templateUrl: '/viewOrders.html',
            controller: 'OrderController'
        }).when('/customerHomePage', {
            templateUrl: '/customerHomePage.html',
            controller: 'CustomerController'
        }).when('/customerOrders', {
            templateUrl: '/customerOrders.html',
            controller: 'OrderController'
        }).when('/registerSupplier', {
            templateUrl: '/registerSupplier.html',
            controller: 'RegisterController'
        }).when('/registerDriver', {
            templateUrl: '/registerDriver.html',
            controller: 'RegisterController'
        }).when('/orderListPage', {
            templateUrl: '/orderListPage.html',
            controller: 'OrderController'
        }).otherwise({
                    redirectTo: '/'
                });
    }]);

netFloristModule.controller("RegisterController", ['$scope', '$http', function ($scope, $http) {
        $http.defaults.headers.post["Content-Type"] = "application/json";

        //######################## Registering Customer with a role of Customer  #####################################

        //function adds new customer and Amin
        $scope.registerUsers = function (num)
        {
            var role = "customer";

            if (num === '1') {
                role = "Admin";
            }

            var user = {
                "name": $scope.fname,
                "surname": $scope.lname,
                "email": $scope.email,
                "password": $scope.password,
                "mobile": $scope.mobileNo,
                "role": role
            };
              
                            $http.post('/user/register', user).then(function (response) {

                                if (response.data.userID !== 0)
                                {
                                    alert("User Registered...");
                                    window.location = './login.html';
                                }
                            })
                        
                                .catch(function (error) {
                                alert(error.data.error + ": User Email Already Exists..");
                            });
                        
        };
        //function registers new supplier and driver
        $scope.registerSup = function (num)
        {
            var role = "supplier";

            if (num === '1') {
                role = "driver";
            }

            var user = {
                "name": $scope.fname,
                "surname": $scope.lname,
                "email": $scope.email,
                "password": $scope.password,
                "mobile": $scope.mobileNo,
                "role": role
            };
   $http.post('/user/register', user).then(function (response) {

                                if (response.data.userID !== 0)
                                {
                                    alert("User Registered...");
                                    window.location = './login.html';
                                }
                            }).catch(function (error) {
                                alert(error.data.error + ": User Email Already Exists..");
                            });
                         

        };
    }]);

netFloristModule.controller("LoginController", function ($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    //######################## Login with Username and Password #####################################


    $scope.login = function ()
    {
        var username = $scope.username;
        var password = $scope.password;

        if (username !== undefined)
        {
            if (password !== undefined)
            {
                var userId = 0;
                //fetches user datafro the database and directs it to the appropriate pages
                $http.get('/user/login/' + username + '/' + password + '').then(function (response) {
                    if (response.data.role === "customer")
                    {
                        userId = response.data.userID;
                        window.location = './customerHomePage.html?userId=' + userId;
                    } else if (response.data.role === "Admin")
                    {
                        userId = response.data.userID;
                        window.location = './adminHomePage.html?userId=' + userId;
                    } else if (response.data.role === "supplier")
                    {
                        userId = response.data.userID;
                        window.location = './supplierHomePage.html?userId=' + userId;
                    } else if (response.data.role === "driver")
                    {
                        userId = response.data.userID;
                        window.location = './driverHomePage.html?userId=' + userId;
                    }
                    
                }).catch(function (error) {
                    alert(error.data.message);
                });
            } else
            {
                alert("Enter Password...");
            }
        } else
        {
            alert("Enter Username...");
        }
    };
});

netFloristModule.controller("ProductController", function ($scope, $http) {

    $http.defaults.headers.post["Content-Type"] = "application/json";
    //######################## Get UserID And User Details #####################################
    var Data = {};
    window.location.search.replace(/\?/, '').split('&').map(function (o) {
        Data[o.split('=')[0]] = o.split('=')[1];
    });
    var userId = Data.userId;

    $http.get('/user/findUserByUserId/' + userId + '').then(function (response) {
        $scope.user = response.data;
    });
    //######################## Find All Products  #####################################
    $http.get('/product/findAllOrde').then(function (response) {
        $scope.products = response.data;
    });
    

    //######################## Find All Categories  #####################################
    $http.get('/category/findAllCategories').then(function (response) {
        $scope.categories = response.data;
    });

    //######################## Admin Delete Product with Product productID   #####################################
    $scope.deleteProduct = function (productId)
    {

        $http.delete('/product/deleteProduct/' + productId + '').then(function (response) {
            if (response.data !== 0)
            {
                alert("Product has been Deleted");

            }
        }).catch(function (error) {
            alert(error.data.message);
        });
    };
    //######################## Find Product based on a Product ID  #####################################

    $scope.findProductById = function (productId)
    {
        $http.get('/product/findProductById/' + productId + '').then(function (response) {
            $scope.product = response.data;
        }).catch(function (error) {
            alert(error.data.message);
        });
    };

});

netFloristModule.controller("AddProductController", function ($scope, $http) {

//    $http.defaults.headers.post["Content-Type"] = "application/json";  


    //######################## Retrieve Category #####################################
    $http.get('/category/findAllCategories').then(function (response) {
        $scope.categories = response.data;
    });


    //######################## Admin Save Product #####################################
    $scope.image = null;
    var imageCopy = null;
    var image = null;
    var handleImageSelect = function (evt)
    {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {

            var reader = new FileReader();
            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                imageCopy = btoa(binaryString);
                image = 'data:image/octet-stream;base64,' + imageCopy;
                $scope.image = image;
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById('productImage').addEventListener('change', handleImageSelect, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }


    $scope.create = function ()
    {
        var product = {
            name: $scope.name,
            category: $scope.category,
            price: $scope.price,
            quantity: $scope.quantity,
            image: $scope.image
        };
        //controller/request
        //send request to rest controller
                    $http.post('/product/saveProduct', product).then(function (response) {

                        if (response.data.pID !== 0)
                        {
                            alert("Product Added...");
                        }
                    }).catch(function (error) {
                        alert(error.data.message);
                    });
    };
    
});

netFloristModule.controller("CategoryController", function ($scope, $http) {

    $http.defaults.headers.post["Content-Type"] = "application/json";

 //######################## Save Order list #####################################
    $scope.saveOrderList = function ()
    {
        var lis = {
            "name": $scope.name
        };

        if (lis.name !== undefined) {
            $http.post('/orderl/saveOrderList', lis).then(function (response) {

                if (response.data.lisID !== 0)
                {
                    alert(" New product order created");
                }
            }).catch(function (error) {
                alert(error.data.message);
            });
        } else
        {
            alert("Enter the name of the product");
        }
    };
    
    ////////////////////////remove Order from list
     $scope.deleteOrderL = function ()
    {
        var name = $scope.name;
        if (name !== undefined) {
            $http.delete('/orderl/deleteOrder/' + name + '').then(function (response) {

                if (response.data !== 0)
                {
                    alert("Order has been Deleted");
                }
            }).catch(function (error) {
                alert(error.data.message);
            });
        } else
        {
            alert("Enter product name to be deleted...");
        }
    };

    //######################## Save Category #####################################
    $scope.saveCategory = function ()
    {
        var cat = {
            "name": $scope.name
        };

        if (cat.name !== undefined) {
            $http.post('/category/saveCategory', cat).then(function (response) {

                if (response.data.catcatID !== 0)
                {
                    alert("Category Added...");
                }
            }).catch(function (error) {
                alert(error.data.message);
            });
        } else
        {
            alert("Enter Category Name...");
        }
    };
    //######################## Admin remove category  #####################################
    $scope.removeCategory = function ()
    {
        var name = $scope.name;
        if (name !== undefined) {
            $http.delete('/category/deleteCategory/' + name + '').then(function (response) {

                if (response.data !== 0)
                {
                    alert("Category has been Deleted");
                }
            }).catch(function (error) {
                alert(error.data.message);
            });
        } else
        {
            alert("Enter Category Name to be deleted...");
        }
    };
});

netFloristModule.controller("CustomerController", function ($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    //######################## Get UserID #####################################
    var Data = {};
    window.location.search.replace(/\?/, '').split('&').map(function (o) {
        Data[o.split('=')[0]] = o.split('=')[1];
    });
    var userId = Data.userId;

    $http.get('/user/findUserByUserId/' + userId + '').then(function (response) {
        $scope.users = response.data;

    });
    
    //######################## Find All Categories #####################################
    $http.get('/category/findAllCategories').then(function (response) {
        $scope.categories = response.data;
    });

    //######################## Retrieve Products  #####################################
    $http.get('/product/findAllProducts').then(function (response) {
        $scope.products = response.data;
    });

    //######################## Add Product To Cart  #####################################
    $scope.cartItems = [];
    $scope.CartAmount = 0.0;
    $scope.addToCart = function (products)
    {
        var checkProducts = checkProductsInCart(products.productID);
        if (checkProducts === null)
        {
            amount = 1 * products.price;

            $scope.cartItems.push({name: products.name,
                quantity: 1,
                productId: products.productID,
                price: products.price,
                category: products.category,
                image: products.image,
                totalAmount: amount
            });

        } else
        {
            checkProducts.quantity++;
            var totalAmount = 0.0;
            for (var x = 0; x < $scope.cartItems.length; x++)
            {
                var amount = parseFloat($scope.cartItems[x].price * $scope.cartItems[x].quantity);
                totalAmount = amount;
            }

            checkProducts.totalAmount = totalAmount;
        }

        var totalAmount = 0.0;
        for (var x = 0; x < $scope.cartItems.length; x++)
        {
            var amount = parseFloat($scope.cartItems[x].totalAmount + totalAmount);
            totalAmount = amount;
        }
        $scope.CartAmount = totalAmount;
    };

    //######################## Check if product exist in the database  #####################################
    function checkProductsInCart(id) {
        for (var i = 0; i < $scope.cartItems.length; i++) {
            if ($scope.cartItems[i].productId === id) {
                return $scope.cartItems[i];
            }
        }
        return null;
    }

    $scope.removeCartItem = function ()
    {
        var index = $scope.cartItems.indexOf($scope.cartItems.length);
        $scope.cartItems.splice(index, 1);

    };

    //######################## Increase Cart Item Quantity  and Cart Amount #####################################
    $scope.increaseItemCount = function (item, quantity)
    {

        item.quantity = quantity;
        var totalAmount = 0.0;
        for (var x = 0; x < $scope.cartItems.length; x++)
        {
            var amount = parseFloat($scope.cartItems[x].price * $scope.cartItems[x].quantity);
            totalAmount = amount;
        }
        item.totalAmount = totalAmount;

        var totalAmount = 0.0;
        for (var x = 0; x < $scope.cartItems.length; x++)
        {
            var amount = parseFloat($scope.cartItems[x].totalAmount + totalAmount);
            totalAmount = amount;
        }
        $scope.CartAmount = totalAmount;

    };

    //######################## Decrease Cart Item Quantity and Cart Amount  #####################################
    $scope.decreaseItemCount = function (item, quantity)
    {

        item.quantity = quantity;

        var totalAmount = 0.0;
        for (var x = 0; x < $scope.cartItems.length; x++)
        {
            var amount = parseFloat($scope.cartItems[x].price * $scope.cartItems[x].quantity);
            totalAmount = amount;
        }

        item.totalAmount = totalAmount;

        var totalAmount = 0.0;
        for (var x = 0; x < $scope.cartItems.length; x++)
        {
            var amount = parseFloat($scope.cartItems[x].totalAmount + totalAmount);
            totalAmount = amount;
        }
        $scope.CartAmount = totalAmount;

    };

    
    //######################## Make an Order(Saving an order and delivary information #####################################
    $scope.payement = function ()
    {
        var cardNo = $scope.cardNo;
        var cardHolder = $scope.cardHolder;
        var bankName = $scope.bankName;

        
        if ($scope.cartItems.length > 0)
        {
        if (cardNo !== undefined)
        {
            if (cardHolder !== undefined)
            {
                if (bankName !== undefined)
                {
///////////////////////////////fetch bank details
                    $http.get('/bank/findBankAccount/' + cardNo + '/' + cardHolder + '/' + bankName).then(function (response) {

                        $scope.banking = response.data;

                        if ($scope.banking.bankID !== undefined)
                        {
                            var bankAmount = $scope.banking.balance;
                            var bankBalance = 0.0;
                            var cardAmount = $scope.CartAmount;
                            var bankCardNo = $scope.banking.cardno;
                            var bankId = $scope.banking.bankID;

                            if (bankAmount < cardAmount)
                            {
                                alert("insufficient Funds in your Bank Account!! Order can not be Processed...");
                            } else {

                                bankBalance = bankAmount - cardAmount;
   /////////////////////update bank balance 
                                $http.put('/bank/updateBankBalance/' + cardNo + '/' + bankBalance + '').then(function (response) {

                                }).catch(function (error) {
                                    alert(error.data.message);
                                });
                                ;

                                var minNumber = 0; // The minimum number you want
                                var maxNumber = 999; // The maximum number you want
                                var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber);
                                var orderno = randomnumber + bankCardNo + randomnumber + bankId;

                                var address = {
                                    "orderno": orderno,
                                    "name": $scope.name,
                                    "surname": $scope.surname,
                                    "email": $scope.email,
                                    "contacts": $scope.contacts,
                                    "street": $scope.street,
                                    "city": $scope.city,
                                    "province": $scope.provinceName};


                                if (address.name !== undefined)
                                {
                                    if (address.surname !== undefined)
                                    {
                                        if (address.email !== undefined)
                                        {
                                            if (address.contacts !== undefined)
                                            {
                                                 if (address.province !== undefined)
                                                        {
                                                            for (var x = 0; x < $scope.cartItems.length; x++) {

                                                                var name = $scope.cartItems[x].name;
                                                                var quantity = $scope.cartItems[x].quantity;
                                                                var productId = $scope.cartItems[x].productId;
                                                                var price = $scope.cartItems[x].price;
                                                                var category = $scope.cartItems[x].category;
                                                                var image = $scope.cartItems[x].image;

                                                                var orderData = {
                                                                    "orderstatus": "Processing",
                                                                    "orderamount": $scope.CartAmount,
                                                                    "userID": userId,
                                                                    "orderno": orderno,
                                                                    "delivarydate": $scope.date,
                                                                    "name": name,
                                                                    "quantity": quantity,
                                                                    "productID": productId,
                                                                    "price": price,
                                                                    "category": category,
                                                                    "image": image
                                                                };
/////////fetch products base on productID 
$http.get('/product//findProductById/' + productId + '').then(function (response) {
    $scope.prod = response.data;
    if ($scope.prod.quantity !== undefined)
                                {
                                    var dquantity = $scope.prod.quantity;
                                    
                                    //alert("i found somthing " + dquantity );
                                    
                                    var prodQuantity = dquantity - quantity;
                                
  /////////////////////////////update product quantity
  
                                 $http.put('/product/updateQuantity/' + productId + '/' + prodQuantity + '').then(function (response) {
                                                                $scope.updating = response.data;
                                                                if (response.data !== 0)
                                                                {
                                                                    //alert("quanitity has been Updated");
                                                                }

                                                            }).catch(function (error) {
                                                                alert(error.data.message);
                                                            });
                                }
                                
    });
    /////////////////////////////////////save order
                                                                $http.post('/orders/saveOrders', orderData).then(function (response) {

                                                                }).catch(function (error) {
                                                                    alert(error.data.message);
                                                                });
                                                            }
      ////////////////////////////////////save address
                                                            $http.post('/address/saveAddress', address).then(function (response) {

                                                            }).catch(function (error) {
                                                                alert(error.data.message);
                                                            });
                                                            alert("Order Processed...");
                                                            alert("Order Number:..." + orderno);
                                                        } else {
                                                            alert("Select Recipient Province...");
                                                        }
                                            } else {
                                                alert("Enter Recipient Contacts Numbers...");
                                            }
                                        } else {
                                            alert("Enter Recipient Email...");
                                        }

                                    } else {
                                        alert("Enter Recipient Surname...");
                                    }

                                } else {
                                    alert("Enter Recipient Name...");
                                }
                            }
                        }

                    }).catch(function (error) {
                        alert(error.data.message);
                    });
                } else
                {
                    alert("Select Bank Name!!!");
                }
            } else
            {
                alert("Enter Your Card Holder Namde!!!");
            }
        } else
        {
            alert("Enter your card number");
        }
    }else
    {
        alert("You have failed to select an item from our catelogue. Restart the process");
         window.location = './customerHomePage.html?userId=' + userId;
    }
    };

});

netFloristModule.controller("OrderController", function ($scope, $http) {

    $http.defaults.headers.post["Content-Type"] = "application/json";

    //########################Find All Orders#####################################
    $http.get('/orders/findAllOrders').then(function (response) {
        $scope.orders = response.data;

    });
    
 /////////////all products to be ordered
    $http.get('/product/findAllOrde').then(function (response) {
        $scope.ord = response.data;

    });
    
    
    //########################Driver Update Status Order Using Order ID #####################################

    $scope.updateOrderStatus = function (orderId, orderStatus)
    {

        $http.put('/orders/updateOrderStatus/' + orderId + '/' + orderStatus + '').then(function (response) {

            if (response.data !== 0)
            {
                alert("Order Status has been Updated");
               
            }
            
        }).catch(function (error) {
            alert(error.data.message);
        });

    };

    //######################## Admin Remove Order Using Order ID #####################################

    $scope.removeOrder = function (orderNo)
    {
        console.log(orderNo);
        $http.delete('/orders/deleteOrders/' + orderNo + '').then(function (response) {

            if (response.data !== 0)
            {
                alert("Order has been deleted");
            }
        }).catch(function (error) {
            alert(error.data.message);
        });
        ;
    };

    //######################## TRACK Order Using Order Number #####################################
    $scope.trackOrder = function (orderNo)
    {
        if (orderNo !== undefined) {
            $http.get('/orders/findByOrderNo/' + orderNo + '').then(function (response) {

                $scope.ordersIn = response.data;
            }).catch(function (error) {
                alert(error.data.message);
            });
        } else
        {
            alert("Enter Order Number...!!!");
        }
    };
});   

