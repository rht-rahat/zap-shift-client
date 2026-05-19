import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();
  const { data: trackings, isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
    // refetchInterval: 10000,
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
  };
  console.log(trackings);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-base-100 shadow-xl rounded-2xl p-6">
          {/* heading skeleton */}
          <div className="skeleton h-8 w-64 mb-3"></div>
          <div className="skeleton h-4 w-40 mb-10"></div>

          {/* timeline skeleton */}
          <ul className="timeline timeline-vertical">
            {[1, 2, 3, 4].map((item) => (
              <li key={item}>
                {item !== 1 && <hr />}

                {/* date */}
                <div className="timeline-start">
                  <div className="skeleton h-4 w-28"></div>
                </div>

                {/* icon */}
                <div className="timeline-middle">
                  <div className="skeleton h-10 w-10 rounded-full"></div>
                </div>

                {/* status box */}
                <div className="timeline-end timeline-box w-full">
                  <div className="skeleton h-5 w-40 mb-3"></div>
                  <div className="skeleton h-4 w-full mb-2"></div>
                  <div className="skeleton h-4 w-3/4 mb-3"></div>
                  <div className="skeleton h-3 w-24"></div>
                </div>

                {item !== 4 && <hr />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-base-100 shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-2 text-primary">
          Track Your Package
        </h2>

        <p className="mb-8 text-gray-500">
          Tracking ID:
          <span className="font-semibold ml-2 text-black">{trackingId}</span>
        </p>

        <ul className="timeline timeline-vertical">
          {trackings?.map((tracking, index) => (
            <li key={tracking._id}>
              {/* top line */}
              {index !== 0 && <hr className="bg-primary" />}

              {/* date */}
              <div className="timeline-start text-sm text-gray-500">
                {formatDate(tracking.createAt)}
              </div>

              {/* icon */}
              <div className="timeline-middle">
                <div className="bg-primary text-white rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* status box */}
              <div className="timeline-end timeline-box w-full">
                <h3 className="font-bold text-lg capitalize">
                  {tracking.status ==="pending-pickup" ? "Pending Pickup" : tracking.status === "rider_assigned" ? "Rider Assigned" : tracking.status === "pick_up" ? "Pick Up" : tracking.status === "parcel_delivered" ? "Delivered" :" "}
                </h3>

                <p className="text-sm text-gray-500 mt-1">{tracking.details ==="pending pickup" ? "Pending Pickup" : tracking.details === "rider_assigned" ? "Rider Assigned" : tracking.details === "pick_up" ? "Pick Up" : tracking.details === "parcel_delivered" ? "Delivered" :" "}</p>

                {tracking.updatedBy && (
                  <p className="text-xs text-primary mt-2">
                    Updated By: {tracking.updatedBy}
                  </p>
                )}
              </div>

              {/* bottom line */}
              {index !== trackings.length - 1 && <hr className="bg-primary" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ParcelTrack;
