import { CheckCheck, ListTodo, Sparkles } from 'lucide-react';

const statCards = [
  { key: 'total', label: 'Total tasks', icon: ListTodo, tone: 'bg-brand-600 text-white' },
  { key: 'completed', label: 'Completed', icon: CheckCheck, tone: 'bg-accent-500 text-white' },
  { key: 'remaining', label: 'Still moving', icon: Sparkles, tone: 'bg-sand-200 text-brand-900' },
];

export default function TodoStats({ total, completed, remaining }) {
  const values = { total, completed, remaining };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statCards.map(({ key, label, icon: Icon, tone }) => (
        <div key={key} className={`rounded-[28px] p-5 shadow-sm ${tone}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] opacity-80">{label}</p>
              <p className="mt-3 text-3xl font-bold tracking-tight">{values[key]}</p>
            </div>
            <div className="rounded-2xl bg-white/20 p-3">
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
