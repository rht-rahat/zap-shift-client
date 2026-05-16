import React, { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import rider from "../../assets/agent-pending.png";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Rider = () => {
  const serviceCenters = useLoaderData();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const regions = useMemo(() => {
    return [...new Set(serviceCenters.map((r) => r.region))];
  }, [serviceCenters]);

  // console.log(regions);
  const districtsByRegions = (region) => {
    const regionDistricts = serviceCenters.filter((r) => r.region === region);

    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRiderApplication = async(data) => {
    // console.log("ridersData", data);

    const res = await axiosSecure.post("/riders", data)
    console.log("After registration rider", res);

    if(res.status === 200){
      toast.success(`${res.data.message ? res.data.message : "Rider Submission Successfully we reply in 20 days"}`)
      // navigate("/")
    }



  };

  const riderRegion = useWatch({ control, name: "region" });
  
  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-[#03373D] mb-4">
            Be a Rider
          </h1>

          <p className="text-gray-600 max-w-2xl">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Side */}
          <div>
            <h2 className="text-3xl font-bold text-[#03373D] mb-8">
              Tell us about yourself
            </h2>

            <form onSubmit={handleSubmit(handleRiderApplication)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="font-medium mb-2 block">Your Name</label>

                <input
                  type="text"
                  placeholder="Your Name"
                  defaultValue={user.displayName}
                  readOnly
                  className="input font-bold input-bordered w-full"
                  {...register("displayName", {
                    required: "Name is required",
                  })}
                />

                {errors.displayName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.displayName.message}
                  </p>
                )}
              </div>

              {/* Driving License */}
              <div>
                <label className="font-medium mb-2 block">
                  Driving License Number
                </label>

                <input
                  type="text"
                  placeholder="Driving License Number"
                  className="input input-bordered w-full"
                  {...register("license", {
                    required: "License number is required",
                  })}
                />

                {errors.license && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.license.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="font-medium mb-2 block">Your Email</label>

                <input
                  type="email"
                  placeholder="Your Email"
                  defaultValue={user.email}
                  readOnly
                  className="font-bold input input-bordered w-full"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Region */}
              <div>
                <label className="font-medium mb-2 block">Your Region</label>

                <select
                  className="select select-bordered w-full"
                  {...register("region", {
                    required: "Region is required",
                  })}
                >
                  <option value="">Select your Region</option>

                  {regions.map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))}
                </select>

                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="font-medium mb-2 block">Your District</label>

                <select
                  className="select select-bordered w-full"
                  {...register("district", {
                    required: "District is required",
                  })}
                >
                  <option value="">Select your District</option>
                  {districtsByRegions(riderRegion).map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))}
                  <option value="Dhaka">Dhaka</option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="Cumilla">Cumilla</option>
                </select>

                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* NID */}
              <div>
                <label className="font-medium mb-2 block">NID No</label>

                <input
                  type="text"
                  placeholder="NID"
                  className="input input-bordered w-full"
                  {...register("nid", {
                    required: "NID is required",
                  })}
                />

                {errors.nid && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nid.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="font-medium mb-2 block">Phone Number</label>

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Bike Model */}
              <div>
                <label className="font-medium mb-2 block">
                  Bike Brand Model and Year
                </label>

                <input
                  type="text"
                  placeholder="Bike Brand Model and Year"
                  className="input input-bordered w-full"
                  {...register("bikeInfo", {
                    required: "Bike information is required",
                  })}
                />

                {errors.bikeInfo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bikeInfo.message}
                  </p>
                )}
              </div>

              {/* Bike Registration */}
              <div>
                <label className="font-medium mb-2 block">
                  Bike Registration Number
                </label>

                <input
                  type="text"
                  placeholder="Bike Registration Number"
                  className="input input-bordered w-full"
                  {...register("bikeRegistration", {
                    required: "Bike registration is required",
                  })}
                />

                {errors.bikeRegistration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bikeRegistration.message}
                  </p>
                )}
              </div>

              {/* About */}
              <div>
                <label className="font-medium mb-2 block">
                  Tell Us About Yourself
                </label>

                <textarea
                  placeholder="Tell Us About Yourself"
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  {...register("about")}
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn bg-lime-400 hover:bg-lime-500 border-none text-black w-full"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right Side */}
          <div className="flex justify-center items-center">
            <img src={rider} alt="Rider" className="max-w-md w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
