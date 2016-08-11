/**
 * Created by Nguyen Hoang on 4/11/2015.
 */
App.service('ManagementModel', function($http ) {

    this.CreateContent = function(contents,callbackFunc){
        $http.post('http://localhost/angularApi/ContentApi.php/CreateContent?XDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=14299570233574',contents).success(function(data,status){
            callbackFunc(data,status);
        }).error(function(){
            console.log('error-CreateContent')
        });
    }

    this.GetContentByCategory = function(category,callbackFunc){

        $url = 'http://localhost/angularApi/ContentApi.php/GetContentByCategory?category=' + category + '&XDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=14299570233574'
        $http.get($url).success(function(data){
            callbackFunc(data);
        }).error(function(){
            console.log('error-GetContentByCategory')
        });

        //$http({
        //    url: 'http://localhost/angularApi/ContentApi.php/GetContentByCategory?categoryXDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=14299570233574',
        //    method: "GET",
        //    params: {category: category}
        //}).success(function(data){
        //    callbackFunc(data);
        //}).error(function(){
        //    console.log('error-GetContentByCategory')
        //});


    }




    this.getLinks = function(callbackFunc) {
        $http.get('http://localhost/angularApi/ContentApi.php/GetContent?XDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=14299570233574').then(function(response) {

            callbackFunc(response);
        })
            .catch(function(response) {
                console.error('Gists error', response.status, response.data);
            })
            .finally(function() {
                console.log("finally finished gists");
            });
        //.success(function(data){
        //
        //    alert(data);
        //    callbackFunc(data);
        //
        //}).error(function(){
        //    console.log('error-getLinks')
        //});
    }

});





