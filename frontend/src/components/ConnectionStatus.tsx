import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "transition-colors",
        isConnected ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
      )}
    >
      {isConnected ? "Connected" : "Disconnected"}
    </Badge>
  );
}