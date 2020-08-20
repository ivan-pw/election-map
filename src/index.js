'use strict';

import './scss/style.scss';

import L from 'leaflet';
import 'leaflet-plugins/layer/tile/Yandex.js';
import 'leaflet/dist/leaflet.css';
import ymaps from 'ymaps';

const apikey = '44f9c843-38d6-49d5-9cb1-7ce14746edf9';

ymaps
    .load('https://api-maps.yandex.ru/2.1/?lang=en_US&mode=debug&apikey=' + apikey)
    .then((ymaps) => {
      const map = L.map('map', {

      }).setView([0, 0], 7);

      const baseLayers = {
        'Yandex map': L.yandex() // 'map' is default
            .addTo(map),
        'Yandex satellite': L.yandex({type: 'satellite'}), // type can be set in options
        'Yandex hybrid': L.yandex('hybrid'),
        'OSM': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      };

      console.log(map);

      L.control.layers(baseLayers).addTo(map);


      fetch('30perc.geojson')
          .then((responce) => responce.json())
          .then((data) => {
            console.log(data.features);

            const myStyle = {
              'color': '#ff7800',
              'weight': 5,
              'opacity': 0.65,
            };


            data.features.forEach(function(obj) {
              // не Крым
              if (
                obj.properties.okrug != 219 &&
                obj.properties.okrug != 21 &&
                obj.properties.okrug != 20 &&
                obj.properties.okrug != 19
              ) {
                L.geoJSON(obj, {style: myStyle}).addTo(map);
                console.log(obj);

                L.geoJSON(obj, {
                  style: myStyle,
                }).addTo(map).addEventListener('click', (e)=>{
                  console.log(e);
                });
              }
            });
          });
    });


// import ymaps from 'ymaps';

// const apikey = '44f9c843-38d6-49d5-9cb1-7ce14746edf9';

// ymaps
//     .load('https://api-maps.yandex.ru/2.1/?lang=en_US&mode=debug&coordorder=longlat&apikey=' + apikey)
//     .then((maps) => {
//       const map = new maps.Map('map', {
//         center: [0, 0],
//         zoom: 9,
//         controls: ['geolocationControl', 'searchControl'],
//       }, {
//         projection: maps.projection.wgs84Mercator,
//       });


//       const objectManager = new maps.ObjectManager();


//       // const myGeocoder = maps.geocode('Москва');
//       // myGeocoder.then(
//       //     function(res) {
//       //       map.geoObjects.add(res.geoObjects);
//       //       // Выведем в консоль данные, полученные в результате геокодирования объекта.
//       //       console.log(res.geoObjects);
//       //       console.log(res.geoObjects.get(0).properties.get('metaDataProperty').getAll());
//       //     },
//       //     function(err) {
//       //       // Обработка ошибки.
//       //     },
//       // );


//       // maps.borders.load('RU').then(function(geojson) {
//       //   console.log(geojson);

//       //   for (let i = 0; i < geojson.features.length; i++) {
//       //     if (geojson.features[i].properties.iso3166 !== 'RU-KRY' && geojson.features[i].properties.iso3166 !== 'RU-SEV') {
//       //       const geoObject = new maps.GeoObject(geojson.features[i]);
//       //       map.geoObjects.add(geoObject);
//       //     }
//       //   }
//       // }, function(e) {
//       //   console.log(e);
//       // });

//       fetch('30perc.geojson')
//           .then((responce) => responce.json())
//           .then((data) => {
//             console.log(data.features);
//             data.features.forEach(function(obj) {
//               obj.options = {
//                 'fillColor': '#255F06',
//                 'strokeColor': '#255F06',
//                 'opacity': 0.5,
//               };

//               // obj.geometry.coordinates[0][0].forEach((coordArr)=>{
//               //   coordArr.map((v)=>{
//               //     v = v / 10000;
//               //   });
//               //   return coordArr.reverse();
//               // });
//             });


//             data.features.forEach(function(obj) {
//               // Задаём контент балуна.
//               obj.properties.balloonContent = obj.properties.description;
//               // Задаём пресет для меток с полем iconCaption.
//               if (obj.properties.iconCaption) {
//                 obj.options = {
//                   preset: 'islands#greenDotIconWithCaption',
//                 };
//               }
//             });


//             // Добавляем описание объектов в формате JSON в менеджер объектов.
//             objectManager.add(data);
//             // Добавляем объекты на карту.
//             map.geoObjects.add(objectManager);
//           });
//     })
//     .catch((error) => console.log('Failed to load Yandex Maps', error));
