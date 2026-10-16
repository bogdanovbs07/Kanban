import { useState } from 'react';
import Task from '../Task/Task';
import styles from './Column.module.css';

function Column({ title, tasks, onDropTask }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    onDropTask(taskId, title);
  };

  const isEmpty = tasks.length === 0;

  const columnClasses = [
    styles.column,
    isDraggingOver ? styles.dragging : '',
    isEmpty ? styles.empty : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={columnClasses}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.taskList}>
        {isEmpty ? (
          <span className={styles.emptyText}>Нет задач</span>
        ) : (
          tasks.map((task) => <Task key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default Column;
