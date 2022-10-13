import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Marker, Map } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: null,
    longitude: null,
    width: '100%',
    height: '500px',
    zoom: 10,
  });

  useEffect(() => {
    geocodeAddress();
  }, []);

  const render = (status) => {
    return <h1>{status}</h1>;
  };

  const geocodeAddress = async () => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${evt.address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );

      if (!res.ok) {
        const message = `An error has occured : ${res.status}`;
        throw new Error(message);
      }
      const data = await res.json();

      if (data.results.length > 0) {
      
        const { lat, lng } = data.results[0].geometry.location;
        setLat(lat);
        setLong(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Map
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: 12,
        }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onMove={(vp) => {
          setViewport(vp);
        }}
      >
        <Marker latitude={lat} longitude={long} anchor='bottom'>
          <Image src={'/images/pin.svg'} width={30} height={30} />
        </Marker>
      </Map>
    </div>
  );
}
