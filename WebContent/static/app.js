var myMod = angular.module('NetFloristProject',["ngRoute"]);
myMod.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider) {
       $routeProvider;
         $locationProvider.hashPrefix('');
              $routeProvider
   .when('/registration', {
      
      templateUrl :'/registration',
       controller : 'Cus'
  })
   .when('/AdminAddP', {
      
      templateUrl :'/AdminAddP',
       controller : 'productC'
  })
     .when('/login', {
      templateUrl :'/login',
       controller : 'Cus'
  })
  .otherwise({
      redirectTo :'/'
   });
}]);
////////////////////////////////new customer registering/////////////////////////////////  
myMod.controller("Cus", function ($scope, $http,$location)
		{
	var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var url = 'http://localhost:8086/resting';
        $scope.create = function ()
        {
            alert("press OK to finish registering");
            $http.post(url, {
                  email: $scope.email,
                  name: $scope.name,
                  password: $scope.password,
                  surname: $scope.surname,
                  cat:$scope.cat

            }).then(successCallback, errorCallback);
               function successCallback(response) {
             $scope.rt=response.data;
              console.log($scope.rt);
                }
                function errorCallback(response) {
                    console.log(response);

                };        
        };

    });
    
    
    
    ////////////////////////////////customer logging/////////////////////////////////  
    myMod.controller("login",function ($scope,$http,$location)
		{
	var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };
        $scope.customers =[];
         var urls = 'http://localhost:8086/customers';
            $scope.gets = function ()
        {
                $http.defaults.headers.post["Content-Type"] = "application/json";

            $http.get(urls, config).then(successCallback, errorCallback);
               function successCallback(response) {
                      $scope.customers=response.data;
                      console.log($scope.customers);


          for(var i=0;i<$scope.customers.length;i++)
{
if($scope.customers[i].password == $scope.password && $scope.customers[i].email == $scope.email)
      if($scope.customers[i].cat ==="customer") 
  {
      console.log("customer successfully login"); 
        window.location.href = "/home";
        }
        
        else if($scope.customers[i].cat ==="admin")
        {
            
             console.log("admin successfully login"); 
        window.location.href = "/adminViewP";
        }

else 
        {
        console.log("invalid password and email"); 
          window.location.href = "/index";
        }

  }

      }
        function errorCallback(response) {
            console.log(response);

      };        
};

    });


myMod.controller("productC", function ($scope, $http,$location)
      {
        var config = {
           headers: {
           'Content-Type': 'application/json;charset=utf-8;'
                    }
                    };   
     ////////////////////////////////add product/////////////////////////////////               
        $scope.image = null;
          $http.defaults.headers.post["Content-Type"] = "application/json";
               var url = 'http://localhost:8086/saveP';
               var imageCopy = null;
               var image = null;
               var handleImageSelect = function (evt)
        {
      var files = evt.target.files;
         var file = files[0];
            if (files && file)
            {
                var reader = new FileReader();
                  reader.onload = function (readerEvt) 
                {
                    var binaryString = readerEvt.target.result;
                     imageCopy = btoa(binaryString);
                      image = 'data:image/octet-stream;base64,' + imageCopy;
                       $scope.image = image;

                };

          reader.readAsBinaryString(file);
            }
        };

if(window.File && window.FileReader && window.FileList && window.Blob)
 {
   document.getElementById('image').addEventListener('change', handleImageSelect, false);
 }
else
  { 
    alert('The File APIs are not fully supported in this browser.');
  }
    $scope.product = function ()
    {
           var data = {
            'name': $scope.name,
             'description': $scope.description,
              'price': $scope.price,
               'image': $scope.image};
              console.log(data);
              
           
     $http.post(url,data ).then(successCallback, errorCallback);
        function successCallback(response)
        {
         alert("press ok to add product")
             console.log(response.data);
        }
            function errorCallback(response) 
            {
                console.log(response);

            };        
    };
                    
 
});
			
myMod.controller("productControllerView", function ($scope,$filter, $http,$location)
{
    	var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
                       }};
////////////////////////////////view product/////////////////////////////////  			
var urls = 'http://localhost:8086/adminView';
		   	    
      $http.get(urls,config).then(successCallback);
        function successCallback(response) 
    {
         $scope.products =response.data;
          console.log($scope.products);
    };
////////////////////////////////delete product/////////////////////////////////  
$scope.deleteProduct = function(Id)
{
  console.log(Id);
      $http.delete('http://localhost:8086//productdelete/' + Id + '')
          .then( function(response)
{

           alert('are sure you want to\n\
                  deleted product id '+ Id);
     return response.data;
}, 
    function(errResponse)
{
alert('Error while deleting product');
  console.error('Error while deleting product');
    return response.data;
}); 

};   
 
$scope.cartItems=[];
  $scope.CartAmount =0.0;
 
 
  
    $scope.addItem = function(product)
   {
        var data = {"quantity":$scope.itemsNum};
    console.log(data);
       
       var existingItem = getExistingItem(product.id);
         console.log(product);
            if(existingItem === null)
        {
             amount = 1 * product.price,
         $scope.cartItems.push
         ({
           quantity: 1,
             product_id:product.id,
              name: product.name,
	        description: product.description,
                  price: product.price,
                    image: product.image,
                       totalAmount:amount
          });

              console.log("dont exist");
        } 
    else{
              console.log("exist");

          existingItem.quantity++;
             var totalAmount = 0.0;
                 for(var a = 0; a < $scope.cartItems.length; a++)
    {
      var amount = parseInt($scope.cartItems[a].price * $scope.cartItems[a].quantity);
        totalAmount = amount;
    }
             console.log(totalAmount);
                existingItem.totalAmount = totalAmount;
        }
          
   
        console.log($scope.cartItems);
         var totalAmount = 0.0;
          for(var a = 0; a < $scope.cartItems.length; a++)
        {
        var amount = parseInt($scope.cartItems[a].totalAmount + totalAmount);
         totalAmount = amount;
        }
        $scope.CartAmount = totalAmount;
         return totalAmount;
            
    };
    
  ////////////////////////////////increase item in cart/////////////////////////////////  
    $scope.increase=function(item,price)
    {
        item.quantity++;
          item.price= item.price *item.quantity;
    };
      function getItemIndex(item)
      {
        for (var i = 0, max = $scope.cartItems[i].length; i < max; i++)
        {
            if ($scope.cartItems[i].id===item.id)
            {
                return i;
            }
            break;
        }
        return i;
    };
    
////////////////////////////////decrease item in cart/////////////////////////////////  
    $scope.decrease =function(item,price){
        var index=getItemIndex(item);
          if(item.quantity -1===0)
          {
            $scope.cartItems.splice(index,1);
          }
        else{
         item.quantity--;
          item.price;
           }
    };
        
    //checking if item already exist
    function getExistingItem(id)
    {
        for (var i=0; i< $scope.cartItems.length; i++)
        {
           if($scope.cartItems[i].product_id === id)
          {
             return $scope.cartItems[i];
              }
            }
        
        return null;
    }
    
      ///////////////////////////////////remove product from cart////////////////////////////////////////////////
     
       $scope.removeItem = function()
        {
             var index =$scope.cartItems.indexOf($scope.length);
                $scope.cartItems.splice(index, 1);
        };
      /////////////////////////////////updateProduct////////////////////////////////////////////////
          $scope.updateProduct = function (Id)
        {
            var name = $scope.name;
              var description = $scope.description;
                 var price = $scope.price;
            
           
    $http.put('http://localhost:8080/update/' + Id + '/' + name + '/' + description + '/'+price+'').then(function(response){
        console.log(response);
          if(response.data !== 0)
              {
                alert("Product has been Updated");
              }else{
                    alert("Product Not Updated!..Product Name exists..!!!");
                }
            });
        };
        
        
    ////////////////////////////placeOrder///////////////////////////////////////////////

   $scope.placeOrder  = function()
         {
          var cardN = $scope.cardNo;
            var cardHolde = $scope.cardHolder;
             
             
   $http.get('http://localhost:8080/pay/' + cardN + '/' + cardHolde).then(function(response){
     console.log(response);
        $scope.bankingdata = response.data;
             if($scope.bankingdata !== null)
             {
                 if($scope.bankingdata.balance < $scope.CartAmount)
                 {
                    alert("insufficient Funds to \n\
                           Processed with Order...");  
                 }else{
                          
   var order= Math.floor((Math.random() * 10000) + 1);
     for(var x = 0; x < $scope.cartItems.length; x++)
     {           
           
           var name = $scope.cartItems[x].name;
             var price = $scope.cartItems[x].price;
               var quantity = $scope.cartItems[x].quantity;
                 var description = $scope.cartItems[x].description;
                   var totalAmount = $scope.cartItems[x].totalAmount;
                     var image = $scope.cartItems[x].image;
                       var orderNo = order;
           
    var data = {
                "amount": totalAmount,      
                "quantity":quantity,
                "status":'true',
                "name":name,
                "price":price,
                "description":description,
                "image":image,
                "orderno":orderNo
               };
           
   console.log(data);
    $http.post('http://localhost:8080/Custorder',data).then(function (response) {
      $scope.order = response.data;  
           
                        
        alert("successfully Ordered\n\
               Order Number is: "
                  + orderNo);
   });
      }   
        }
          }else
             {
console.log("Account Not Authorized");
  alert("UnAuthorized bank detail..Verify your detail...");
                        
             }
                     
     });
      };

  $http.get('http://localhost:8080/order').then(function(response)
          {
                console.log(response);
                      $scope.custOrders = response.data;
	 });     
});
    
  
   
   
               