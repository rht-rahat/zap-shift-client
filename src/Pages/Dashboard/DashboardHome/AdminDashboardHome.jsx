import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const STATUS_CONFIG = [
  {
    key: "rider_assigned",
    label: "Rider Assigned",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-800",
    barColor: "bg-amber-400",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
  },
  {
    key: "parcel_delivered",
    label: "Parcel Delivered",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-800",
    barColor: "bg-teal-500",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-700",
  },
  {
    key: "pending-pickup",
    label: "Pending Pickup",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-800",
    barColor: "bg-orange-500",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
  },
];

// CountUp manually — no library, no object issue
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (value === 0) return;
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

  return <span>{display}</span>;
};

const StatCard = ({ config, count, total }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-300 transition-colors duration-200">
      <div className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center mb-3`}>
        <span className={`text-sm font-bold ${config.iconColor}`}>
          {config.label.charAt(0)}
        </span>
      </div>
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
        {config.label}
      </p>
      <p className="text-3xl font-medium text-gray-800">
        <AnimatedNumber value={count} />
      </p>
      <div className="mt-3 h-1 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${config.barColor} transition-all duration-[1400ms] ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">{pct}% of total</p>
    </div>
  );
};

const BreakdownRow = ({ config, count, total }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-32 shrink-0">{config.label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${config.barColor} transition-all duration-[1200ms] ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 w-8 text-right">{pct}%</span>
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText}`}>
        {count}
      </span>
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

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: statsArray = [], isLoading } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const { statsMap, total } = useMemo(() => {
    const map = {};
    let sum = 0;
    statsArray.forEach(({ _id, count }) => {
      map[_id] = count;
      sum += count;
    });
    return { statsMap: map, total: sum };
  }, [statsArray]);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Overview</p>
          <h2 className="text-xl font-medium text-gray-800">Delivery Dashboard</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <span>📦</span>
          <span><AnimatedNumber value={total} /> total parcels</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATUS_CONFIG.map((config) => (
          <StatCard
            key={config.key}
            config={config}
            count={statsMap[config.key] ?? 0}
            total={total}
          />
        ))}

        {/* Total Card */}
        <div className="bg-gray-800 rounded-2xl p-5 col-span-2 lg:col-span-1 flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
            <span className="text-white">📦</span>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Parcels</p>
            <p className="text-3xl font-medium text-white">
              <AnimatedNumber value={total} />
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm font-medium text-gray-700 mb-4">Status breakdown</p>
        <div className="space-y-3">
          {STATUS_CONFIG.map((config) => (
            <BreakdownRow
              key={config.key}
              config={config}
              count={statsMap[config.key] ?? 0}
              total={total}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;