import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";
import type { SortDir } from "@/features/admin/hooks/useAdminTable";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  onRowClick?: (row: T) => void;
  sortKey?: string | null;
  sortDir?: SortDir;
  onSort?: (key: string) => void;
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({
  col,
  sortKey,
  sortDir,
}: {
  col: string;
  sortKey?: string | null;
  sortDir?: SortDir;
}) {
  if (col !== sortKey) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
  return sortDir === "asc" ? (
    <ArrowUp className="w-3 h-3 text-primary" />
  ) : (
    <ArrowDown className="w-3 h-3 text-primary" />
  );
}

// ─── DataTable ────────────────────────────────────────────────────────────────

const SKELETON_ROWS = 5;

function DataTable<T extends object>({
  columns,
  data,
  rowKey,
  isLoading = false,
  emptyMessage = "No records found.",
  emptyIcon,
  onRowClick,
  sortKey,
  sortDir,
  onSort,
}: DataTableProps<T>) {
  return (
    <ScrollArea className="w-full">
      <div className="min-w-[600px]">
        <table className="w-full text-sm">
          {/* Header */}
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                    col.sortable &&
                      "cursor-pointer select-none hover:text-foreground transition-colors",
                    col.headerClassName,
                  )}
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && (
                      <SortIcon
                        col={col.key}
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {isLoading ? (
              Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <tr key={i} className="border-b border-border/50">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-4">
                      <Skeleton className="h-4 w-full rounded" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                    {emptyIcon && (
                      <div className="opacity-40 w-12 h-12">{emptyIcon}</div>
                    )}
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              <AnimatePresence initial={false}>
                {data.map((row, idx) => (
                  <motion.tr
                    key={rowKey(row)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.02 }}
                    className={cn(
                      "border-b border-border/50 transition-colors",
                      onRowClick && "cursor-pointer hover:bg-secondary/60",
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "py-3 px-4 text-foreground",
                          col.className,
                        )}
                      >
                        {col.render
                          ? col.render(row)
                          : String(
                              (row as Record<string, unknown>)[col.key] ?? "",
                            )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  );
}

export default DataTable;
