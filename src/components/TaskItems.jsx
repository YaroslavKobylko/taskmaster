import React, { useState } from 'react';
import { MdDeleteSweep, MdEdit } from 'react-icons/md';
import TaskEdit from './TaskEdit';

const TaskItem = ({ task, deleteTask, toggleCheck, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, editedTitle);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
  };

  return (
    <li className='items' key={task.id}>
      {isEditing ? (
        <>
          <input
            type='text'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button className="SaveCancel" onClick={handleSave}>Save</button>
          <button className="SaveCancel" onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <div className='items-text'>
          <input
            type='checkbox'
            checked={task.completed}
            onChange={() => toggleCheck(task.id)}
          />
          <p className={task.completed ? 'isChecked' : ''}>{task.title}</p>
        </div>
      )}
      <div className='penandbin'>
        <MdEdit
            className='edit-icon'
            onClick={handleEdit}
        />
      <MdDeleteSweep
        className='delete-icon'
        onClick={() => deleteTask(task.id)}
      />
      </div>
    </li>
  );
};

export default TaskItem;