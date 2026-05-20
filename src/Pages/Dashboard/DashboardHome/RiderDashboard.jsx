import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AnimatedNumber = ({ value, prefix = "", suffix = "" }) => {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!value) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}{display}{suffix}
    </span>
  );
};

const StatCard = ({ label, value, prefix = "", suffix = "", iconBg, iconColor, iconLetter, barColor, note }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-300 transition-colors duration-200">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
        <span className={`text-sm font-bold ${iconColor}`}>{iconLetter}</span>
      </div>
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-medium text-gray-800">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
      </p>
      <div className="mt-3 h-1 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-[1400ms] ease-out`}
          style={{ width: "100%" }}
        />
      </div>
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
    <div className="w-10 h-10 rounded-xl bg-gray-100 mb-3" />
    <div className="h-3 w-24 bg-gray-100 rounded mb-2" />
    <div className="h-8 w-16 bg-gray-100 rounded mb-3" />
    <div className="h-1 bg-gray-100 rounded-full" />
  </div>
);

const RiderDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["rider-dashboard-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/dashboard/stats?riderEmail=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  const { totalDelivered = 0, totalEarnings = 0 } = stats;

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">My Overview</p>
          <h2 className="text-xl font-medium text-gray-800">Rider Dashboard</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <span>👋</span>
          <span>{user?.displayName || "Rider"}</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard
          label="Total Delivered"
          value={totalDelivered}
          iconBg="bg-teal-100"
          iconColor="text-teal-800"
          iconLetter="D"
          barColor="bg-teal-500"
          note="Parcels successfully delivered"
        />

        <StatCard
          label="Total Earnings"
          value={totalEarnings}
          prefix="৳"
          iconBg="bg-amber-100"
          iconColor="text-amber-800"
          iconLetter="৳"
          barColor="bg-amber-400"
          note="Based on delivery commission"
        />

        {/* Dark total card */}
        <div className="bg-gray-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Avg. Per Parcel</p>
            <p className="text-3xl font-medium text-white">
              ৳{totalDelivered > 0 ? Math.round(totalEarnings / totalDelivered) : 0}
            </p>
            <p className="text-xs text-gray-500 mt-2">Average earning per delivery</p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm font-medium text-gray-700 mb-4">Earnings breakdown</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-36 shrink-0">Total delivered</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-teal-500" style={{ width: "100%" }} />
            </div>
            <span className="text-xs font-medium text-gray-700 min-w-fit">{totalDelivered} parcels</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-36 shrink-0">Total earnings</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-amber-400" style={{ width: "100%" }} />
            </div>
            <span className="text-xs font-medium text-gray-700 min-w-fit">৳{totalEarnings}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-36 shrink-0">Avg. per parcel</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gray-400" style={{ width: "60%" }} />
            </div>
            <span className="text-xs font-medium text-gray-700 min-w-fit">
              ৳{totalDelivered > 0 ? Math.round(totalEarnings / totalDelivered) : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboardHome;