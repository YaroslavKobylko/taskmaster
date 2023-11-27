import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput.jsx';
import TaskItem from './components/TaskItems.jsx';
import Stats from './components/Stats.jsx';
import axios from 'axios';

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setToDoList(response.data.slice(0, 100).map(task => ({ ...task, completed: false })));
    } catch (error) {
      console.error('Error fetching TODO list:', error);
    }
  };

  const addTask = (taskName) => {
    const newTask = { id: Date.now(), title: taskName, completed: false }; // Унікальний id
    setToDoList([newTask, ...toDoList]);
  };

  const deleteTask = (taskId) => {
    setToDoList(toDoList.filter((task) => task.id !== taskId));
  };

  const toggleCheck = (taskId) => {
    setToDoList((prevToDoList) =>
      prevToDoList.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = toDoList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(toDoList.length / itemsPerPage);

  const renderPageNumbers = () => {
    const maxVisiblePages = 3; // Максимальна кількість видимих сторінок
  
    const calculateVisiblePages = () => {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  
      let start, end;
  
      if (currentPage <= halfVisiblePages + 1) {
        start = 1;
        end = Math.min(maxVisiblePages, totalPages);
      } else if (currentPage > totalPages - halfVisiblePages) {
        start = Math.max(1, totalPages - maxVisiblePages + 1);
        end = totalPages;
      } else {
        start = Math.max(1, currentPage - halfVisiblePages);
        end = Math.min(currentPage + halfVisiblePages, totalPages);
      }
  
      return { start, end };
    };
  
    const visiblePages = calculateVisiblePages();
  
    const pageNumbers = [];
  
    if (visiblePages.start > 1) {
      // Виводимо завжди перший елемент
      pageNumbers.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={currentPage === 1 ? 'active' : ''}
        >
          1
        </button>
      );
      if (visiblePages.start > 2) {
        // Виводимо крапки перед видимими сторінками
        pageNumbers.push(<span key="ellipsis1">...</span>);
      }
    }
  
    // Виводимо видимі сторінки
    for (let i = visiblePages.start; i <= visiblePages.end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
  
    if (visiblePages.end < totalPages) {
      if (visiblePages.end < totalPages - 1) {
        // Виводимо крапки після видимих сторінок
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }
      // Виводимо завжди останній елемент
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={currentPage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      );
    }
  
    return pageNumbers;
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const editTask = (taskId, newTitle) => {
    setToDoList((prevToDoList) =>
      prevToDoList.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className="container">
      <h1>Task Master</h1>
      <TaskInput addTask={addTask} />
      <div className="toDoList">
        <span>To do</span>
        <ul className="list-items">
          {currentItems.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              deleteTask={deleteTask}
              toggleCheck={toggleCheck}
              editTask={editTask}
            />
          ))}
        </ul>
        {toDoList.length === 0 ? <p className="notify">You are done!</p> : null}
      </div>
      <Stats toDoList={toDoList} />

      <div className="pagination">
        <button className="buttonchange" onClick={handlePrevPage}>Previous</button>
        {renderPageNumbers()}
        <button className="buttonchange" onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;