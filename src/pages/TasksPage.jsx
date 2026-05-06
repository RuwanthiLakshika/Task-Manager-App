import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTasks from '../hooks/useTasks';


export const TasksPage = () => {
  const navigate = useNavigate();
  const { tasks, deleteTask, searchTasks } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const taskToDelete = deleteConfirmId ? tasks.find(t => t.id === deleteConfirmId) : null;

  const filteredTasks = useMemo(() => {
    return searchQuery ? searchTasks(searchQuery) : tasks;
  }, [tasks, searchQuery, searchTasks]);

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setDeleteConfirmId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      handleDeleteTask(deleteConfirmId);
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8">
      <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-1">My Tasks</h1>
          <p className="text-slate-600">Organize and manage your work efficiently</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <span className="absolute left-3 top-3.5 text-slate-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition-all bg-white"
            />
          </div>
          <Button
            onClick={() => navigate('/tasks/new')}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2.5 flex items-center justify-center gap-2 whitespace-nowrap"
            size="md"
          >
            ➕ New Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              📋
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold text-slate-900">{stats.pending}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
              ⚡
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">Completed</p>
              <p className="text-3xl font-bold text-slate-900">{stats.completed}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              ✓
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filteredTasks.length > 0 ? (
          <div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b border-slate-200">
              <p className="text-sm font-semibold text-slate-700">
                Showing <span className="text-yellow-600">{filteredTasks.length}</span> task{filteredTasks.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Task</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Description</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredTasks.map((task, idx) => (
                    <tr key={task.id} className="hover:bg-yellow-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-yellow-600 bg-yellow-50/30">{String(idx + 1).padStart(2, '0')}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{task.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 line-clamp-1">{task.description}</td>
                      <td className="px-6 py-4 text-center">
                        {task.completed ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-lg">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-lg">
                            ⏳
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() => navigate(`/tasks/${task.id}`)}
                          className="inline px-3 py-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors text-sm font-medium hover:scale-105"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(task.id)}
                          className="inline px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium hover:scale-105"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center mb-6 text-5xl">
              📋
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No tasks yet</h3>
            <p className="text-slate-600 text-center mb-8 max-w-sm">
              Get started by creating your first task. Click the "New Task" button to add an item to your list.
            </p>
            <Button
              onClick={() => navigate('/tasks/new')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 flex items-center gap-2"
              size="md"
            >
              ➕ Create First Task
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              🗑️ Delete Task
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-700">
              Are you sure you want to delete this task?
            </p>
            {taskToDelete && (
              <div className="bg-slate-100 rounded-lg p-3 border-l-4 border-red-500">
                <p className="font-semibold text-slate-900">{taskToDelete.title}</p>
                <p className="text-sm text-slate-600 mt-1">{taskToDelete.description}</p>
              </div>
            )}
            <p className="text-sm text-slate-500">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end pt-2">
              <Button
                onClick={() => setDeleteConfirmId(null)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                variant="destructive"
                className="text-white"
              >
                Delete Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksPage;
