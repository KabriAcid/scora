import { useState, useMemo, useCallback } from "react";

export type SortDir = "asc" | "desc";

export interface UseAdminTableResult<T> {
  displayedRows: T[];
  search: string;
  setSearch: (s: string) => void;
  sortKey: string | null;
  sortDir: SortDir;
  toggleSort: (key: string) => void;
  page: number;
  setPage: (p: number) => void;
  pageSize: number;
  totalPages: number;
  totalFiltered: number;
}

export function useAdminTable<T extends object>(
  data: T[],
  searchKeys: (keyof T)[] = [],
  defaultPageSize = 10,
): UseAdminTableResult<T> {
  const [search, setSearchRaw] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPageRaw] = useState(1);

  const setSearch = useCallback((s: string) => {
    setSearchRaw(s);
    setPageRaw(1);
  }, []);

  const setPage = useCallback((p: number) => setPageRaw(p), []);

  const toggleSort = useCallback((key: string) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return key;
      }
      setSortDir("asc");
      return key;
    });
    setPageRaw(1);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim() || searchKeys.length === 0) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((key) => {
        const val = row[key];
        return typeof val === "string" && val.toLowerCase().includes(q);
      }),
    );
  }, [data, search, searchKeys]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (av === bv) return 0;
      const cmp = av! < bv! ? -1 : 1;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalFiltered = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / defaultPageSize));

  const displayedRows = useMemo(() => {
    const start = (page - 1) * defaultPageSize;
    return sorted.slice(start, start + defaultPageSize);
  }, [sorted, page, defaultPageSize]);

  return {
    displayedRows,
    search,
    setSearch,
    sortKey,
    sortDir,
    toggleSort,
    page,
    setPage,
    pageSize: defaultPageSize,
    totalPages,
    totalFiltered,
  };
}
