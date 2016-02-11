var app = angular.module('myApp', ['ngMaterial', 'google.places']);

app.controller('AppCtrl', ['$scope', '$mdSidenav','$http', function ($scope, $mdSidenav, $http) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.googleUrl = 'http://google.com';
    $scope.angular = 'https://material.angularjs.org'
    $scope.sizes = [
           "small (12-inch)",
           "medium (14-inch)",
           "large (16-inch)",
           "insane (42-inch)"
    ];
    $scope.meals = [
      { category: 'meat', name: 'Pepperoni' },
      { category: 'meat', name: 'Sausage' },
      { category: 'meat', name: 'Ground Beef' },
      { category: 'meat', name: 'Bacon' },
      { category: 'veg', name: 'Mushrooms' },
      { category: 'veg', name: 'Onion' },
      { category: 'veg', name: 'Green Pepper' },
      { category: 'veg', name: 'Green Olives' }
    ];
    $scope.Select = "Select";

    //Maine Code starts here
    //$scope.ZipCode = null;
    $scope.ShowMap = false;
    $scope.SearchMap = function (ZipCode) {debugger        
        $scope.citiesInfo = [];
        $scope.markers = [];        
        window.navigator.geolocation.getCurrentPosition(function () {            
            //console.log(pos);
            //var pos = parseInt(ZipCode);
            var pos = ZipCode;
            //To get Map by Country and Zip Code
            //$http.get('http://maps.googleapis.com/maps/api/geocode/json?components=country:IN|postal_code:' + pos + '&sensor=true').then(function (res) {
            //To get Map by Zip Code
            $http.get('http://maps.googleapis.com/maps/api/geocode/json?address='+pos+'&sensor=true').then(function (res) {debugger
                console.log(res.data);
                $scope.citiesInfo = res.data;
                $scope.LocateZip = [];
                angular.forEach($scope.citiesInfo.results, function (value, key) {
                    var eachAddressInfo = {};
                    eachAddressInfo.Id = value.place_id;
                    eachAddressInfo.city = value.formatted_address.split(',')[0];
                    eachAddressInfo.desc = value.formatted_address;
                    eachAddressInfo.lat = value.geometry.location.lat;
                    eachAddressInfo.long = value.geometry.location.lng;
                    $scope.LocateZip.push(eachAddressInfo);
                });
                if ($scope.LocateZip.length > 0) {
                    $scope.ShowMap = true;
                    $scope.MarkEachCities();
                }
                else {
                    alert("No Result found");
                }
            });
        })
    }

    $http.get('data/IndianPinCodes.json').then(function (res) {debugger

    });

    $scope.FilterMap = function () {debugger
        $scope.ShowMap = false;
        $scope.filteredZip = [];
        angular.forEach($scope.LocateZip, function (value, key) {            
            angular.forEach(MasterData, function (v, k) {
                debugger                
                if (parseInt(v.lat) == parseInt(value.lat)) {
                    $scope.filteredZip.push(v);
                }
            });
            
        });
        $scope.LocateZip = [];
        
        $scope.LocateZip = $scope.filteredZip;
        if ($scope.LocateZip.length > 0) {
            $scope.markers = [];
            $scope.MarkEachCities();
        }
        else {
            $scope.markers = [];
        }
        $scope.ShowMap = true;
    }
    

    var MasterData = [
                   {
                       city: 'Patna',
                       desc: 'Patna Junction,Patna, Bihar',
                       zip:'800026',
                       lat: 25.6028,
                       long: 85.1375
                   },
                   {
                       city: 'New Delhi',
                       desc: 'New Delhi,Karol Bagh',
                       zip: '110002',
                       lat: 28.6629,
                       long: 77.2100
                   },
                   {
                       city: 'Jaipur, Rajasthan',
                       desc: 'The Pink City of India',
                       zip: '115802',
                       lat: 26.9000,
                       long: 75.8000
                   },
                   {
                       city: 'Mumbai, Maharastra',
                       desc: 'Film City',
                       zip: '805026',
                       lat: 18.9750,
                       long: 72.8258
                   },
                   {
                       city: 'Bangalore',
                       desc: 'HSR Layout',
                       zip: '560103',
                       lat: 12.9100,
                       long: 77.6400
                   },
                    {
                        city: 'Bangalore',
                        desc: 'BTM Layout',
                        zip: '560103',
                        lat: 12.9526,
                        long: 77.6400
                    },
                    {
                        city: 'Bangalore',
                        desc: 'Kormangala',
                        zip: '560103',
                        lat: 12.9000,
                        long: 77.6400
                    },
                     {
                         city: 'Kolkata',
                         desc: 'Applied Optics and Photonics, University of Calcutta',
                         zip: '560103',
                         lat: 22.567587,
                         long: 88.415398
                     },
                      {
                          city: 'Kolkata',
                          desc: 'Jadavpur University',
                          zip: '560103',
                          lat: 22.499313,
                          long: 88.371849
                      },
                       {
                           city: 'Kolkata',
                           desc: 'Heritage Institute of Technology',
                           zip: '560103',
                           lat: 22.516525,
                           long: 88.418213
                       },
                        {
                            city: 'Bangalore',
                            desc: 'Electronic City',
                            zip: '560103',
                            lat: 12.839939,
                            long: 77.677003
                        },
                         {
                             city: 'Bangalore',
                             desc: 'Kormangala',
                             zip: '560103',
                             lat: 12.997121,
                             long: 77.669232
                         },
                         {
                             city: 'Goa',
                             desc: 'Goa',
                             zip: '560103',
                             lat: 15.299326,
                             long: 74.123996
                         },
                         {
                             city: 'Pune',
                             desc: 'Pune',
                             zip: '560103',
                             lat: 18.520430,
                             long: 73.856744
                         }

    ];

   

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info) {
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
            //draggable: true
            
        });
        //$scope.temp = marker;
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        google.maps.event.addListener($scope.map,'dragend', function () {
            //alert("Map dragged");
            //In event we will get the current location
            //var latitude = event.latLng.lat();
            //var longitude = event.latLng.lng();
            //console.log(latitude + ', ' + longitude);
            $scope.FilterMap();
        });

        google.maps.event.addListener($scope.map, 'click', function () {
            //alert("Map click");
            //var latitude = event.latLng.lat();
            //var longitude = event.latLng.lng();
            //console.log(latitude + ', ' + longitude);
            //$scope.FilterMap(latitude, longitude);
            $scope.FilterMap();
        });
        $scope.markers.push(marker);
        //google.maps.event.addListener(marker, 'drag', function (event) {
        //    debugger
        //    //placeMarker(event.latLng);
        //});

    }

    //var DragMap = {
    //    zoom: 15,
    //    center: new google.maps.LatLng(12.52,75.52),
    //    mapTypeId: google.maps.MapTypeId.TERRAIN
    //}
    

    $scope.MarkEachCities = function () {
        var mapOptions = {
            //events: {
            //    dragend: function (event)
            //    {
            //        console.log("Map dragged");
            //    },
            //    click: function (event) {
            //        console.log("Map clcik");
            //    }
            //},
            zoom: 12,
            center: new google.maps.LatLng($scope.LocateZip[0].lat, $scope.LocateZip[0].long),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);       
        var cities = $scope.LocateZip;
        for (var i = 0; i < cities.length; i++) {
            createMarker(cities[i]);
        }
    }
   
}]);
