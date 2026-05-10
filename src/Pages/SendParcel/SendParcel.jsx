import React, { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const { user } = useAuth();
  // console.log(user.email);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const regions = useMemo(() => {
    return [...new Set(serviceCenters.map((r) => r.region))];
  }, [serviceCenters]);

  const districtsByRegions = (region) => {
    const regionDistricts = serviceCenters.filter((r) => r.region === region);

    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const areasByDistrict = (district) => {
    const districtData = serviceCenters.find((d) => d.district === district);
    return districtData ? districtData.covered_area : [];
  };

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const senderDistrict = useWatch({ control, name: "senderDistricts" });
  const receiverDistricts = useWatch({ control, name: "receiverDistrict" });
  const parcelType = useWatch({
    control,
    name: "parcelType",
  });

  const handleParcelSubmit = async (data) => {
    const isSameDistrict = data.senderDistricts === data.receiverDistrict;

    const isDocument = data.parcelType === "Document";

    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const baseCharge = isSameDistrict ? 110 : 150;

        const extraWeight = Math.ceil(parcelWeight - 3);

        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = baseCharge + extraCharge;
      }
    }

    const dataAll = {
      ...data,
      cost,
      status: "pending",
      created_at: new Date().toISOString(),
      payment_status: "unpaid",
      // tracking_id: crypto.randomUUID(),
    };

    const result = await Swal.fire({
      title: "Agree with the Cost?",
      text: `You will have pay ${cost} taka !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Agree",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.post("/parcels", dataAll);

      if (res?.data?.acknowledged) {
        await Swal.fire({
          title: "Your parcel placed",
          text: "Successfully Your parcel submitted",
          icon: "success",
        });

        // reset();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen rounded-3xl flex items-center justify-center">
      <div className="w-full max-w-7xl bg-white rounded-3xl p-10 shadow-sm">
        <h1 className="text-5xl font-extrabold text-teal-900">Send A Parcel</h1>

        <p className="text-lg font-semibold text-teal-900 mt-6">
          Enter your parcel details
        </p>

        <div className="divider my-6"></div>

        <form className="space-y-8" onSubmit={handleSubmit(handleParcelSubmit)}>
          {/* Parcel Type */}
          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="Document"
                {...register("parcelType", {
                  required: "Parcel type is required",
                })}
                defaultChecked
                className="radio radio-success radio-sm"
              />
              <span className="text-sm">Document</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="Not-Document"
                {...register("parcelType")}
                className="radio radio-sm"
              />
              <span className="text-sm">Not-Document</span>
            </label>
          </div>

          {/* Parcel Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label text-sm">Parcel Name</label>
              <input
                type="text"
                placeholder="Parcel Name"
                {...register("parcelName", {
                  required: "Parcel name is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.parcelName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parcelName.message}
                </p>
              )}
            </div>

            {parcelType === "Not-Document" && (
              <div>
                <label className="label text-sm">Parcel Weight (KG)</label>

                <input
                  type="number"
                  placeholder="Parcel Weight (KG)"
                  {...register("parcelWeight")}
                  className="input input-bordered w-full"
                />
              </div>
            )}
          </div>

          {/* Sender + Receiver */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sender */}
            <div className="space-y-4">
              <h3 className="font-bold text-teal-900">Sender Details</h3>

              <input
                type="text"
                placeholder="Sender Name"
                {...register("senderName", {
                  required: "Sender name is required",
                })}
                readOnly
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
              />
              {errors.senderName && (
                <p className="text-red-500 text-sm ">
                  {errors.senderName.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Sender Address"
                {...register("senderAddress", {
                  required: "Sender address is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.senderAddress && (
                <p className="text-red-500 text-sm ">
                  {errors.senderAddress.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Sender Phone No"
                {...register("senderPhone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Invalid Bangladeshi phone number",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.senderPhone && (
                <p className="text-red-500 text-sm ">
                  {errors.senderPhone.message}
                </p>
              )}
              <input
                type="email"
                placeholder={user?.email}
                {...register("senderEmail", {
                  // required: "Sender email is required",
                })}
                readOnly
                defaultValue={user?.email}
                className="input input-bordered w-full"
              />
              {errors.senderEmail && (
                <p className="text-red-500 text-sm ">
                  {errors.senderEmail.message}
                </p>
              )}

              <select
                {...register("senderRegion", {
                  required: "Sender region is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select Receiver Region</option>
                {regions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {errors.senderRegion && (
                <p className="text-red-500 text-sm ">
                  {errors.senderRegion.message}
                </p>
              )}

              <select
                {...register("senderDistricts", {
                  required: "Sender police Station is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select Your District</option>
                {districtsByRegions(senderRegion).map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {errors.senderDistricts && (
                <p className="text-red-500 text-sm ">
                  {errors.senderDistricts.message}
                </p>
              )}
              <select
                {...register("senderThana", {
                  required: "Sender police Station is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select Your Police Station</option>
                {areasByDistrict(senderDistrict).map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {errors.senderThana && (
                <p className="text-red-500 text-sm ">
                  {errors.senderThana.message}
                </p>
              )}

              <textarea
                {...register("pickupInstruction")}
                className="textarea textarea-bordered w-full h-28"
                placeholder="Pickup Instruction"
              ></textarea>
              {errors.pickupInstruction && (
                <p className="text-red-500 text-sm ">
                  {errors.pickupInstruction.message}
                </p>
              )}
            </div>

            {/* Receiver */}
            <div className="space-y-4">
              <h3 className="font-bold text-teal-900">Receiver Details</h3>

              <input
                type="text"
                placeholder="Receiver Name"
                {...register("receiverName", {
                  required: "Receiver name is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm ">
                  {errors.receiverName.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Receiver Address"
                {...register("receiverAddress", {
                  required: "Receiver address is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.receiverAddress && (
                <p className="text-red-500 text-sm ">
                  {errors.receiverAddress.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Receiver Contact No"
                {...register("receiverPhone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Invalid Bangladeshi phone number",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.receiverPhone && (
                <p className="text-red-500 text-sm ">
                  {errors.receiverPhone.message}
                </p>
              )}

              <input
                type="email"
                placeholder="receiver@email.com"
                {...register("receiverEmail", {
                  required: "Receiver email is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.receiverEmail && (
                <p className="text-red-500 text-sm ">
                  {errors.receiverEmail.message}
                </p>
              )}

              <select
                {...register("receiverRegion", {
                  required: "Receiver district is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select Receiver Region</option>
                {regions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {errors.receiverRegion && (
                <p className="text-red-500 text-sm ">
                  {errors.receiverRegion.message}
                </p>
              )}

              <select
                {...register("receiverDistrict", {
                  required: "Receiver Police Station is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select Receiver District</option>
                {districtsByRegions(receiverRegion).map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {errors.receiverDistrict && (
                <p className="text-red-500 text-sm ">
                  {errors.receiverDistrict.message}
                </p>
              )}
              {/* receiver police station */}
              <select
                {...register("receiverPoliceStation", {
                  required: "Receiver Police Station is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select Receiver Police Station</option>
                {areasByDistrict(receiverDistricts).map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {errors.receiverPoliceStation && (
                <p className="text-red-500 text-sm ">
                  {errors.receiverPoliceStation.message}
                </p>
              )}

              <textarea
                {...register("deliveryInstruction")}
                className="textarea textarea-bordered w-full h-28"
                placeholder="Delivery Instruction"
              ></textarea>
              {errors.deliveryInstruction && (
                <p className="text-red-500 text-sm ">
                  {errors.deliveryInstruction.message}
                </p>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600">* PickUp Time 4pm-7pm Approx.</p>

          <button
            disabled={isSubmitting}
            type="submit"
            className="btn bg-lime-400 hover:bg-lime-500 disabled:bg-gray-300 disabled:text-gray-500 border-none text-black px-10 min-w-64"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              "Proceed to Confirm Booking"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
