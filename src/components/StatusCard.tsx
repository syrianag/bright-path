import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

type Status = "operational" | "down" | "degraded";

interface StatusCardProps {
  name: string;
  description: string;
  status: Status;
  index?: number;
}

const statusConfig: Record<Status, { icon: typeof CheckCircle; label: string; dotClass: string; bgClass: string }> = {
  operational: {
    icon: CheckCircle,
    label: "Operational",
    dotClass: "bg-success",
    bgClass: "border-success/20 hover:border-success/40",
  },
  down: {
    icon: XCircle,
    label: "Down",
    dotClass: "bg-destructive animate-pulse-soft",
    bgClass: "border-destructive/20 hover:border-destructive/40",
  },
  degraded: {
    icon: AlertTriangle,
    label: "Degraded",
    dotClass: "bg-warning animate-pulse-soft",
    bgClass: "border-warning/20 hover:border-warning/40",
  },
};

const StatusCard = ({ name, description, status, index = 0 }: StatusCardProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border bg-card p-5 transition-all hover:shadow-md ${config.bgClass}`}
    >
      <div className="flex items-center gap-4">
        <div className={`h-2.5 w-2.5 rounded-full ${config.dotClass}`} />
        <div>
          <h3 className="font-display text-base font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold ${
        status === "operational" ? "bg-success/10 text-success" :
        status === "down" ? "bg-destructive/10 text-destructive" :
        "bg-warning/10 text-warning"
      }`}>
        <Icon className="h-3.5 w-3.5" />
        {config.label}
      </div>
    </div>
  );
};

export default StatusCard;
