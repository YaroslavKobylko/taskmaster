import React, { useState } from 'react';

const TaskEdit = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState(task.title);

  const handleInputChange = (event) => {
    setEditedTask(event.target.value);
  };

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <div className="task-edit">
      <input type="text" value={editedTask} onChange={handleInputChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default TaskEdit;