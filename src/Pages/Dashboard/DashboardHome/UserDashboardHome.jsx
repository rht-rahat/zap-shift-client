import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const STATUS_CONFIG = [
  {
    key: "totalParcels",
    label: "Total Parcels",
    iconEmoji: "📦",
    iconBg: "bg-indigo-100",
    barColor: "bg-indigo-400",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
  },
  {
    key: "delivered",
    label: "Delivered",
    iconEmoji: "🎯",
    iconBg: "bg-teal-100",
    barColor: "bg-teal-500",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-700",
  },
  {
    key: "pendingPickup",
    label: "Pending Pickup",
    iconEmoji: "🕐",
    iconBg: "bg-orange-100",
    barColor: "bg-orange-500",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
  },
  {
    key: "riderAssigned",
    label: "Rider Assigned",
    iconEmoji: "🛵",
    iconBg: "bg-amber-100",
    barColor: "bg-amber-400",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
  },
  {
    key: "totalPaid",
    label: "Paid",
    iconEmoji: "✅",
    iconBg: "bg-emerald-100",
    barColor: "bg-emerald-500",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
  },
  {
    key: "totalUnpaid",
    label: "Unpaid",
    iconEmoji: "⚠️",
    iconBg: "bg-red-100",
    barColor: "bg-red-400",
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
  },
];

// ✅ CountUp এর বদলে নিজস্ব AnimatedNumber
function AnimatedNumber({ end = 0, duration = 1400, separator = false }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!end) return setDisplay(0);
    let current = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(current);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{separator ? display.toLocaleString() : display}</span>;
}

const StatCard = ({ config, count, total, delay }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-300 transition-colors duration-200">
      <div
        className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center mb-3`}
      >
        <span className="text-lg">{config.iconEmoji}</span>
      </div>
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
        {config.label}
      </p>
      <p className="text-3xl font-medium text-gray-800">
        <AnimatedNumber end={count} duration={1400 + delay} />
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
      <span className="text-xs text-gray-500 w-32 shrink-0">
        {config.label}
      </span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${config.barColor} transition-all duration-[1200ms] ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 w-8 text-right">
        {pct}%
      </span>
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText}`}
      >
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

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["userStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/user-stats?email=${encodeURIComponent(user?.email)}`
      );
      return res.data;
    },
    enabled: !!user?.email && !loading,
    refetchInterval: 3000,
  });

  const total = stats?.totalParcels ?? 0;

  if (isLoading || loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
            My Overview
          </p>
          <h2 className="text-xl font-medium text-gray-800">
            Welcome, {user?.displayName || user?.email}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <span>📦</span>
          <span>{total} total parcels</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {STATUS_CONFIG.map((config, i) => (
          <StatCard
            key={config.key}
            config={config}
            count={stats?.[config.key] ?? 0}
            total={total}
            delay={i * 120}
          />
        ))}
      </div>

      {/* Total Spent Card */}
      <div className="bg-gray-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Total Spent
          </p>
          <p className="text-3xl font-medium text-white">
            ৳ <AnimatedNumber end={stats?.totalSpent ?? 0} duration={1600} separator={true} />
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
          💳
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm font-medium text-gray-700 mb-4">
          Status breakdown
        </p>
        <div className="space-y-3">
          {STATUS_CONFIG.filter((c) => c.key !== "totalParcels").map(
            (config) => (
              <BreakdownRow
                key={config.key}
                config={config}
                count={stats?.[config.key] ?? 0}
                total={total}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;