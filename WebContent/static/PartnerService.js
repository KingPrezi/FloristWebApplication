var myApp = angular.module('NetFloristProject');
'use strict';
myApp.factory('PartnerService', ['$http', '$q', function($http, $q){
	var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };
	  var storedObject;
    return {
         
    	
    	    
    	        set: function (o) {
    	            this.storedObject = o;
    	        },
    	        gets: function () {
    	            this.storedObject;
    	        },
    	    
    	
    	
    	 fetchAllPartners: function() {
             return $http.get('http://localhost:8080/customers', config)
             .then(
                     function(response){
                         return response.data;
                     }, 
                     function(errResponse){
                         console.error('Error while fetching Partner');
                         return $q.reject(errResponse);
                     }
             );
         },

//         Login: function(Partner,email,password)
//         {
//        	 return $http.get('http://localhost:8080/login')
//        	 .then(
//        			 function(response)
//        			 {
//        				 return response.data;
//        			 },
//        			 function(errResponse){
//        				 console.error('Error while getting credentials');
//        				 return $q.reject(errResponse);
//        			 }
//        			 );
//         },
         
     
         
    addPartner: function(Partner){
            return $http.post('http://localhost:8080/user/Partner', Partner)
            .then(
                    function(response){
                   
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while creating Partner');
                        return $q.reject(errResponse);
                    }
            );
        },
     
    updatePartner: function(Partner, id){
            return $http.put('http://localhost:8080/user/Partner'+id, Partner)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while updating partner');
                        return $q.reject(errResponse);
                    }
            );
        },
     
   deletePartner: function(id){
            return $http.delete('http://localhost:8080/user/Partner'+id)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while deleting partner');
                        return $q.reject(errResponse);
                    }
            );
        }
         
    };
 
}]);

myApp.factory('StoreService',['$localStorage', function ($localStorage) {
    var storedObject;
    return {
        set: function (o) {
            this.storedObject = o;
        },
        get: function () {
            return this.storedObject;
        }
    };
}]);

//Product Service
myApp.factory('ProductService', ['$http', '$q', function($http, $q, $scope){
	var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };
    return {
    	
    fetchAllProducts: function() {
            return $http.get('http://localhost:8080/user/products', config)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while fetching Product');
                        return $q.reject(errResponse);
                    }
            );
        },
     
    addProduct: function(Product){
            return $http.post('http://localhost:8080/user/addProduct', Product)
            .then(
                    function(response){
            	    $http.defaults.headers.post["Content-Type"] = "application/json";
            	    
            	    
                        return response.data;
                    }
                    
                    , 
                    function(errResponse){
                        console.error('Error while creating Product');
                        return $q.reject(errResponse);
                    }
            );
        },
     
    updateProduct: function(Product, id){
            return $http.put('http://localhost:8080/user/products/'+id, Product)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while updating product');
                        return $q.reject(errResponse);
                    }
            );
        },
     
   deleteProduct: function(id){
            return $http.delete('http://localhost:8080/user/products/'+id)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while deleting product');
                        return $q.reject(errResponse);
                    }
            );
        }
         
    };
 
}]);


/*

myApp.factory('PurchaseService',['$http','$q', function($http, $q)
{
return {
	savUserOrder: function(UserOrder){
return $http.post('http://localhost:8080/user/placeOrder',UserOrder)
.then(
function(response)
{
return response.data;
}, 
function(errResponse){
console.error('Error while creating Order');
 return $q.reject(errResponse);
 }
);
}
}
}]);*/

//Driver Service
myApp.factory('DriverService', ['$http', '$q', function($http, $q,$scope){
	 
    return {
         
    fetchAllDrivers: function() {
            return $http.get('http://localhost:8080/user/addDriver')
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while fetching Driver');
                        return $q.reject(errResponse);
                    }
            );
        },
     
    addDriver: function(Driver){
            return $http.post('http://localhost:8080/user/addDriver', Driver)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while creating Driver');
                        return $q.reject(errResponse);
                    }
            );
        },
     
    updateDriver: function(Driver, id){
            return $http.put('http://localhost:8080/user/addDriver'+id, Driver)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while updating driver');
                        return $q.reject(errResponse);
                    }
            );
        },
     
   deleteDriver: function(id){
            return $http.delete('http://localhost:8080/user/addDriver'+id)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while deleting driver');
                        return $q.reject(errResponse);
                    }
            );
        }
         
    };
 
}]);




//Bank Factory
myApp.factory('BankService', ['$http', '$q', function($http, $q,$scope){
var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };
    return {
    fetchAllBanks: function() {
            return $http.get('http://localhost:8080/user/banks', config)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while fetching Bank details');
                        return $q.reject(errResponse);
                    }
            );
        },
     
        login: function()
        {
        	return $http.get('http://localhost:8080/user/payments/' + config)
        	.then
        	(
        			   function(response){
                           return response.data;
                       }, 
                       function(errResponse){
                           console.error('Error while fectching Bank account');
                           return $q.reject(errResponse);
                       }	
        	);
        },
        
        addBank: function(Bank){
            return $http.post('http://localhost:8080/user/banks/',Bank)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while creating Bank');
                        return $q.reject(errResponse);
                    }
            );
        },
     
    updateBank: function(Bank, id){
            return $http.put('http://localhost:8080/user/bank'+id, Bank)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while updating Bank');
                        return $q.reject(errResponse);
                    }
            );
        },
     
   deleteBank: function(id){
            return $http.delete('http://localhost:8080/user/bank'+id)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while deleting Bank');
                        return $q.reject(errResponse);
                    }
            );
        }
         
    };
 
}]);