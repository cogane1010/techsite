/**
 * Created by Nguyen Hoang on 4/11/2015.
 */
App.controller('ManagementCtrl', function ($scope, $http, $location, $routeParams, ManagementModel ) {
    //var uploader = $scope.uploader = new FileUploader({
    //    url: 'upload.php'
    //});
    $scope.displayed = [];

    $scope.init = function () {

        //dropdown ctegory
        $scope.ddSelectOptions = [
            {
                text: 'Tin Tức',
                value: '1'
            }, {
                text: 'Chia Sẻ',
                value: '2'
            }, {
                text: 'Suy Ngẫm',
                value: '3'
            }, {
                text: 'Tiếng Anh',
                value: '4'
            }
        ];
        $scope.ddSelectSelected = {
            text: "Select an Category"
        };
        $scope.selectedItem = $scope.ddSelectOptions[0];

        if($location.path() == "/admin/"){

            $scope.delete = function removeRow(id) {
                alert(id + 'remove');
            }
            $scope.edit = function edit(id) {
                alert(id + 'edit');
            }

            if($scope.selectedItem != ''){
               getNews($scope.selectedItem );
            }
        }

      // var
      //      nameList = [' Pierre ', ' Pol ', ' Jacques ', ' Robert ', 'Elisa'],
      //      familyName = [' dupont Germain ', ' rmain GermainGermain', 'lcourt Germain', ' bjip Germain', 'enezGermain'];
      //
      // function createRandomItem() {
      //      var
      //          id = Math.floor(Math.random() * 4),
      //          title = familyName[Math.floor(Math.random() * 4)]
      //      return{
      //          Id: id,
      //          Title: title
      //      };
      // }
      //
      //// $scope.displayed = [];
      // for (var j = 0; j < 500; j++) {
      //     $scope.displayed.push(createRandomItem());
      // }

    };

    if($location.path() == "/createAticle/"){
        $scope.$watch('files', function () {
            $scope.upload($scope.picFile);
        });

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: 'upload/url',
                        fields: {'username': $scope.username},
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    });
                }
            }
        };

    }

    $scope.submit = function(contents) {
        contents.categoryID = $scope.ddSelectSelected.value;
        if(contents.categoryID == null){
            $('#categoryError').show();
        }else{
            $('#categoryError').hide();
            ManagementModel.CreateContent(contents, function(dataResponse,status){
                if(status ==  200){
                    $location.path("/admin");
                }else{
                    $('#ErrorPopup').show();
                }
            })
        }
    };

    $scope.getData = function(categoryID){
        alert(categoryID);
    }

    var getNews = function(category)
    {
        var categoryID = category.value;
        ManagementModel.GetContentByCategory(categoryID, function(dataResponse) {
           // $scope.displayed = dataResponse;
            $scope.displayed = [];
            for (var j = 0; j < 9; j++) {
                $scope.displayed.push(createItem(dataResponse[j]));
            }
        });
    };

    function createItem(data) {

              return{
                  Id: data.Id,
                  Title: data.Title
              };
        }

    var getContents = function()
    {


        $scope.contents = "";
        ManagementModel.getLinks(function(data) {

            $scope.contents = angular.toJson(data.data);
        });

    };


}).directive('stRatio',function(){
    return {
        link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            element.css('width',ratio+'%');
        }
    };
});