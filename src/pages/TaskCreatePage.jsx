import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { Button } from '@/components/ui/button';
import useTasks from '../hooks/useTasks';


export const TaskCreatePage = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const handleSubmit = (taskData) => {
    addTask(taskData);
    navigate('/tasks');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12 flex items-center justify-between">
          <button
            onClick={() => navigate('/tasks')}
            className="group flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-lg transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform text-2xl">←</span>
            <span>Back to Tasks</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h1 className="text-4xl font-bold text-slate-800 mb-8">✨ Create New Task</h1>
              <TaskForm onSubmit={handleSubmit} />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 space-y-6">
              <div className="pb-6 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  📝 Task Details
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Enter a clear task title and detailed description to help you stay organized.
                </p>
              </div>

              <div className="pb-6 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  ✓ Status
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Mark the task as completed when you're finished with it. You can always update the status later.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  💡 Tips
                </h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>✓ Be specific with your task title</li>
                  <li>✓ Add context in the description</li>
                  <li>✓ Set priority through task content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreatePage;
