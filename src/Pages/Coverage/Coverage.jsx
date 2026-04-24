import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenter = useLoaderData();
  const position = [23.8103, 90.4125];
  const mapRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.location.value;
    const district = serviceCenter.find(c => c.district.toLowerCase().includes(searchText.toLowerCase()))
    // if(district) {
    //   const coords = [district.latitude, district.longitude]
    //   mapRef.current.flyTo(coords, 13)
    // }

    if (district && mapRef.current) {
    const lat = district.latitude;
    const lng = district.longitude;

    // create small bounds around the point
    const bounds = [
      [lat - 0.05, lng - 0.05], // southwest
      [lat + 0.05, lng + 0.05], // northeast
    ];

    mapRef.current.flyToBounds(bounds, {
      padding: [50, 50],
      duration: 1.5,
    });
  }
  };
  // console.log(serviceCenter);
  return (
    <div className="bg-white rounded-2xl p-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div>
          <h2 className="text-4xl font-bold py-4">
            We are available in 64 districts
          </h2>

          {/* search bar */}

          <form onSubmit={handleSearch}>
            <div className="join">
              <div>
                <label className="input validator join-item">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter Your District"
                    required
                  />
                </label>
                <div className="validator-hint hidden">Search</div>
              </div>
              <button className="btn btn-neutral join-item">Search</button>
            </div>
          </form>

          {/* Text title */}

          <h4 className="text-2xl font-bold py-4">
            We deliver element all over Bangladesh
          </h4>

          <div className="map h-200">
            <MapContainer
              className="h-200"
              center={position}
              zoom={8}
              scrollWheelZoom={false}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {serviceCenter.map((item) => (
                <Marker position={[item.latitude, item.longitude]}>
                  <Popup>
                    <strong>{item.district}</strong> <br />
                    Service Area {item.covered_area.join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            ,
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
