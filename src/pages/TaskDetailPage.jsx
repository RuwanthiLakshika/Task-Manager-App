import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TaskForm } from '../components/TaskForm';
import { Button } from '@/components/ui/button';
import useTasks from '../hooks/useTasks';


export const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTask, updateTask, deleteTask } = useTasks();
  const [copied, setCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const task = getTask(id);

  const handleSubmit = (taskData) => {
    updateTask(id, taskData);
    navigate('/tasks');
  };

  const handleDelete = () => {
    deleteTask(id);
    navigate('/tasks');
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(task.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4 text-3xl">
            ⚠️
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Task Not Found</h2>
          <p className="text-slate-600 mb-8 text-lg">The task you're looking for doesn't exist or has been deleted.</p>
          <Button
            onClick={() => navigate('/tasks')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8"
            size="lg"
          >
            Back to Tasks
          </Button>
        </div>
      </div>
    );
  }

  const createdDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const updatedDate = new Date(task.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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
          {!showDeleteConfirm ? (
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="ghost"
              className="flex items-center gap-2 text-red-600"
            >
              🗑️ Delete
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="text-white"
              >
                Confirm Delete
              </Button>
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h1 className="text-4xl font-bold text-slate-800 mb-8">Edit Task</h1>
              <TaskForm initialData={task} onSubmit={handleSubmit} />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 space-y-6">
              <div className="pb-6 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Task ID
                </h3>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
                  <code className="text-sm font-mono text-slate-700 flex-1 truncate">{task.id}</code>
                  <button
                    onClick={handleCopyId}
                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800 text-xl"
                  >
                    {copied ? '✓' : '📋'}
                  </button>
                </div>
              </div>

              <div className="pb-6 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Created
                </h3>
                <div className="flex items-center gap-2 text-slate-800">
                  <span className="text-xl">📅</span>
                  <span className="font-medium">{createdDate}</span>
                </div>
              </div>

              <div className="pb-6 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Last Updated
                </h3>
                <div className="flex items-center gap-2 text-slate-800">
                  <span className="text-xl">📅</span>
                  <span className="font-medium">{updatedDate}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/tasks')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-lg transition-all hover:shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
