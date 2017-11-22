console.log('controllers file..');
angular.module('Ctrls', [])

.controller('MainController',function($scope,$http) {
	
	
	// onload controller get the current state : == handle the updating of the state within the api json response 
	// To change with webSockets.
	 angular.element(document).ready(function () {
         $http.get('https://qms-bdridi.c9users.io/api/state').
         then(function(response) {
        	console.log(response.data);
        	$scope.state = response.data;
			$("#token").sevenSeg({ digits: 2, value: $scope.state.lastGiven });
        	
        	
        });
    });
	
	
	
	$scope.tagline = "QMS App is started ! Wait for it ....";	
	/*
	var socket = io.connect('https://qms-bdridi.c9users.io');
	socket.on('forward',function(data){
		console.log('socket recieved ...');
		$scope.lastGivenToken = data;			
	});
	*/
	
	
	// Controoler function - Calling the api for taking a new token
	$scope.newToken = function(){
	    
	   
	    $http.get('https://qms-bdridi.c9users.io/api/forward').
        then(function(response) {
        		$scope.state = response.data;
        		 console.log('calling for new token');
        		 $("#token").sevenSeg({ digits: 2,value: $scope.state.lastGiven });
        });
	    
	};
	
	$scope.next = function(desk){
		$http.get('https://qms-bdridi.c9users.io/api/next/'+desk).
        then(function(response) {
        		$scope.state = response.data;
        		 console.log('Desk '+desk+' calls for next');
        });
		
	};
	
	

})

.controller('AboutController', function($scope) {

	$scope.tagline = "QMS App About Page...";	
	

});