import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Occurrence } from "@/hooks/useWebSocket";

interface OccurrencesTableProps {
  occurrences: Occurrence[];
}

export function OccurrencesTable({ occurrences }: OccurrencesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Origin</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead className="text-right">Unit Value</TableHead>
            <TableHead>Received At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {occurrences.map((occurrence, index) => (
            <TableRow key={index} className="animate-fade-in">
              <TableCell>{occurrence.origin}</TableCell>
              <TableCell>{occurrence.platform}</TableCell>
              <TableCell className="text-right">
                ${occurrence.unitValue}
              </TableCell>
              <TableCell>
                {new Date(occurrence.receivedAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}