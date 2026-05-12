import { FILTERS, type FilterId } from "@/lib/hook/use-filter";
import w from "@/lib/wording.json";

interface FilterRowProps {
  filter: FilterId;
  setFilter: (id: FilterId) => void;
  running: boolean;
}

export function FilterRow({ filter, setFilter, running }: FilterRowProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <p className="font-mono-booth shrink-0 text-[10px] tracking-[0.18em] opacity-70">
        {w.camera.filter.label}
      </p>
      {FILTERS.map((f) => {
        const active = filter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            disabled={running}
            className="font-mono-booth shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-[11px] tracking-[0.1em] disabled:cursor-not-allowed"
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
