import React, { useState } from "react"
import { Map, Marker } from "pigeon-maps"
import { APP_CITY_DD_COORDINATES } from "../../constants/constants"

export default function MyMap({ addresses = [] }) {
  const [marker, setMarker] = useState()
  return (
    <Map
      height={500}
      defaultCenter={APP_CITY_DD_COORDINATES}
      defaultZoom={13}
      onClick={(event) => setMarker(event.latLng)}
    >
      {addresses.map((address) => (
        <Marker key={address} width={50} anchor={address} />
      ))}
      {marker && <Marker width={50} anchor={marker} />}
    </Map>
  )
}
