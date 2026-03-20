import clsx from 'clsx';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <article
      className={clsx(
        'rounded-[28px] p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
        todo.completed ? 'bg-accent-50 shadow-accent-100/80' : 'bg-white shadow-brand-100/80'
      )}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          aria-label={todo.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
          onClick={() => onToggle(todo.id, !todo.completed)}
          className="mt-1 min-h-[44px] min-w-[44px] rounded-full bg-white text-brand-600 shadow-sm transition hover:scale-[1.03]"
        >
          <span className="flex items-center justify-center">
            {todo.completed ? <CheckCircle2 className="h-6 w-6 text-accent-600" /> : <Circle className="h-6 w-6" />}
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <h3 className={clsx('text-lg font-semibold tracking-tight', todo.completed ? 'text-accent-900 line-through' : 'text-brand-950')}>
            {todo.title}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-brand-700/80">
            {todo.completed ? 'Completed' : 'In progress'} · Updated{' '}
            {formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true })}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Delete ${todo.title}`}
          onClick={() => onDelete(todo.id)}
          className="min-h-[44px] min-w-[44px] rounded-full bg-rose-50 text-rose-500 transition hover:bg-rose-100 hover:text-rose-600"
        >
          <span className="flex items-center justify-center">
            <Trash2 className="h-5 w-5" />
          </span>
        </button>
      </div>
    </article>
  );
}
