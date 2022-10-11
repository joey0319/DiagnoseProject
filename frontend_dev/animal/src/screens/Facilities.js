/* global kakao */
import React, { useEffect, useState } from "react";

const { kakao } = window;

let latitude = 0;
let longitude = 0;
function success(pos) {
  latitude = pos.coords.latitude;
  longitude = pos.coords.longitude;
}
navigator.geolocation.getCurrentPosition(success);

const FacilitiesPage = () => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);
    const places = new kakao.maps.services.Places();
    places.setMap(map);

    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
      }
    };
    places.keywordSearch("반려 동물", callback);
  });
};

export default FacilitiesPage;
