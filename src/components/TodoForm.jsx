import { Plus } from 'lucide-react';

export default function TodoForm({ value, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-white/90 p-4 shadow-lg shadow-brand-200/60 backdrop-blur md:p-5">
      <label htmlFor="todo-input" className="mb-3 block text-base font-semibold text-brand-900">
        Add a new task
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          id="todo-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Plan groceries, finish report, call mom..."
          className="min-h-[52px] flex-1 rounded-2xl border-0 bg-sand-100 px-4 text-base text-brand-900 outline-none ring-2 ring-transparent transition focus:ring-brand-400"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="min-h-[52px] min-w-[52px] rounded-2xl bg-brand-600 px-6 text-base font-semibold text-white shadow-md shadow-brand-300 transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <Plus className="h-5 w-5" />
            Add task
          </span>
        </button>
      </div>
    </form>
  );
}
