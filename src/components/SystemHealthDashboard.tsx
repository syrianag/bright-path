"use client";
import { useState, useEffect } from "react";
import { RefreshCw, Activity, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import StatusCard from "./StatusCard";

type Status = "operational" | "down" | "degraded";

interface ServiceStatus {
  name: string;
  description: string;
  status: Status;
}

const initialStatuses: ServiceStatus[] = [
  { name: "Video Lessons", description: "Streaming & playback", status: "operational" },
  { name: "Quizzes & Assessments", description: "Quiz engine & grading", status: "down" },
  { name: "Progress Tracking", description: "Student analytics & reports", status: "degraded" },
  { name: "Login & Accounts", description: "Authentication system", status: "operational" },
  { name: "Notifications", description: "Email & in-app alerts", status: "operational" },
];

const SystemHealthDashboard = () => {
  const [statuses, setStatuses] = useState(initialStatuses);
  const [lastChecked, setLastChecked] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStatuses((prev) =>
        prev.map((s) => ({
          ...s,
          status: (["operational", "down", "degraded"] as Status[])[
            Math.random() > 0.6 ? Math.floor(Math.random() * 3) : 0
          ],
        }))
      );
      setLastChecked(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  const [timeAgo, setTimeAgo] = useState("just now");

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - lastChecked.getTime()) / 1000);
      if (seconds < 60) setTimeAgo(`${seconds}s ago`);
      else setTimeAgo(`${Math.floor(seconds / 60)}m ago`);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastChecked]);

  const operationalCount = statuses.filter((s) => s.status === "operational").length;
  const allOperational = operationalCount === statuses.length;

  return (
    <div className="space-y-6">
      {/* Summary Banner */}
      <div
        className={`flex items-center gap-4 rounded-2xl border p-5 ${
          allOperational
            ? "border-success/20 bg-success/5"
            : "border-warning/20 bg-warning/5"
        }`}
      >
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          allOperational ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
        }`}>
          <Shield className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="font-display text-lg font-extrabold text-foreground">
            {allOperational ? "All Systems Operational" : "Some Systems Need Attention"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {operationalCount} of {statuses.length} services running normally
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">Updated {timeAgo}</span>
          <Button
            size="sm"
            onClick={refresh}
            disabled={isRefreshing}
            className="rounded-xl"
          >
            <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Service List */}
      <div className="space-y-3">
        {statuses.map((service, i) => (
          <StatusCard key={service.name} {...service} index={i} />
        ))}
      </div>
    </div>
  );
};

export default SystemHealthDashboard;
