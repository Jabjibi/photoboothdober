import { FILTERS, type FilterId } from "@/lib/hook/use-filter";

interface FilterRowProps {
  filter: FilterId;
  setFilter: (id: FilterId) => void;
  running: boolean;
}

export function FilterRow({ filter, setFilter, running }: FilterRowProps) {
  return (
    <div className="flex gap-2 items-center overflow-x-auto pb-1">
      <p className="font-mono-booth text-[10px] tracking-[0.18em] opacity-70 shrink-0">FILTER ›</p>
      {FILTERS.map((f) => {
        const active = filter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            disabled={running}
            className="font-mono-booth shrink-0 text-[11px] tracking-[0.1em] px-3 py-1.5 rounded-full cursor-pointer disabled:cursor-not-allowed"
            style={{
              background: active ? "var(--ink)" : "var(--paper)",
              color: active ? "var(--paper)" : "var(--ink)",
              border: "2px solid var(--ink)",
              boxShadow: active ? "0 3px 0 var(--red)" : "0 3px 0 var(--ink)",
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
