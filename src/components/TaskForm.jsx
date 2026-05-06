import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export const TaskForm = ({ initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    completed: initialData?.completed || false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    } else if (formData.description.trim().length < 5) {
      newErrors.description = 'Task description must be at least 5 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ title: true, description: true });
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      completed: formData.completed,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="title" className="flex items-center gap-2 text-sm font-bold text-slate-800">
          📝 Task Title
        </label>
        <Input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Give your task a clear name"
          error={touched.title && !!errors.title}
        />
        {errors.title && touched.title && (
          <div className="flex gap-2 items-center text-red-600 text-sm font-medium">
            <span>⚠️</span>
            {errors.title}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="flex items-center gap-2 text-sm font-bold text-slate-800">
          📄 Task Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Describe what needs to be done"
          rows="4"
          error={touched.description && !!errors.description}
        />
        {errors.description && touched.description && (
          <div className="flex gap-2 items-center text-red-600 text-sm font-medium">
            <span>⚠️</span>
            {errors.description}
          </div>
        )}
      </div>

      <div className="space-y-3 pt-2">
        <label htmlFor="completed" className="flex items-center gap-3 cursor-pointer group rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:border-emerald-300 hover:bg-emerald-50/60">
          <Checkbox
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
            Mark as completed
          </span>
        </label>
      </div>

      <Button type="submit" size="full" className="mt-6 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
        {initialData ? '✓ Update Task' : '+ Create Task'}
      </Button>
    </form>
  );
};

export default TaskForm;
