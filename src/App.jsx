import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoStats from './components/TodoStats';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (err) {
      setError('Unable to load your tasks right now. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    return {
      total: todos.length,
      completed,
      remaining: todos.length - completed,
    };
  }, [todos]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newTodo.trim()) return;

    try {
      setSaving(true);
      const response = await axios.post('/api/todos', { title: newTodo.trim() });
      setTodos((current) => [response.data, ...current]);
      setNewTodo('');
    } catch (err) {
      setError('Could not add that task. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id, completed) => {
    const previous = todos;
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, completed, updatedAt: new Date().toISOString() } : todo)));

    try {
      await axios.patch(`/api/todos/${id}`, { completed });
    } catch (err) {
      setTodos(previous);
      setError('Could not update that task. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const previous = todos;
    setTodos((current) => current.filter((todo) => todo.id !== id));

    try {
      await axios.delete(`/api/todos/${id}`);
    } catch (err) {
      setTodos(previous);
      setError('Could not delete that task. Please try again.');
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 text-brand-950 md:px-6 md:py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 px-5 py-8 text-white shadow-xl shadow-brand-200/80 md:px-8 md:py-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Momentum Tasks</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">Stay on top of every to-do with calm, colorful focus.</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Add tasks, mark progress, and clear out finished work in one simple tracker built for quick daily check-ins.
          </p>
        </motion.section>

        <TodoStats {...stats} />
        <TodoForm value={newTodo} onChange={setNewTodo} onSubmit={handleSubmit} loading={saving} />

        {error ? (
          <div className="flex items-start gap-3 rounded-[28px] bg-rose-50 p-4 text-base text-rose-700 shadow-sm">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Something went wrong</p>
              <p>{error}</p>
            </div>
          </div>
        ) : null}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-brand-950">Your tasks</h2>
            <button
              type="button"
              onClick={loadTodos}
              className="min-h-[44px] rounded-full bg-white px-4 text-base font-medium text-brand-700 shadow-sm transition hover:-translate-y-0.5"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-[220px] items-center justify-center rounded-[28px] bg-white/80 p-6 shadow-sm">
              <div className="flex items-center gap-3 text-brand-700">
                <LoaderCircle className="h-6 w-6 animate-spin" />
                <span className="text-base font-medium">Loading your tasks...</span>
              </div>
            </div>
          ) : todos.length === 0 ? (
            <div className="rounded-[28px] bg-white/85 p-8 text-center shadow-sm">
              <p className="text-xl font-semibold text-brand-900">No tasks yet</p>
              <p className="mt-2 text-base text-brand-700/80">Add your first to-do above to start building momentum.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {todos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.25 }}
                >
                  <TodoItem todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
