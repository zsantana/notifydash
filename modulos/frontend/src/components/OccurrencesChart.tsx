import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Occurrence } from "@/hooks/useWebSocket";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface OccurrencesChartProps {
  occurrences: Occurrence[];
}

export function OccurrencesChart({ occurrences }: OccurrencesChartProps) {
  const data = [...occurrences].reverse().map((occ) => ({
    value: occ.unitValue,
    time: new Date(occ.receivedAt).toLocaleTimeString(),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Values Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}