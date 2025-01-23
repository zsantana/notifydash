import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { OccurrencesTable } from "@/components/OccurrencesTable";
import { OccurrencesChart } from "@/components/OccurrencesChart";
import { useWebSocket } from "@/hooks/useWebSocket";

const WEBSOCKET_URL = "ws://localhost:8080/ws"; // Update this with your Spring Boot WebSocket endpoint

export default function Index() {
  const { isConnected, occurrences } = useWebSocket(WEBSOCKET_URL);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Occurrences Dashboard</h1>
        <ConnectionStatus isConnected={isConnected} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latest Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Occurrences</p>
                <p className="text-2xl font-bold">{occurrences.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Average Value</p>
                <p className="text-2xl font-bold">
                  $
                  {occurrences.length
                    ? (
                        occurrences.reduce((acc, curr) => acc + curr.unitValue, 0) /
                        occurrences.length
                      ).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <OccurrencesChart occurrences={occurrences} />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Occurrences</CardTitle>
          </CardHeader>
          <CardContent>
            <OccurrencesTable occurrences={occurrences} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}