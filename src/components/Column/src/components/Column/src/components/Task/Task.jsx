import styles from './Task.module.css';

function Task({ task }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={styles.task}
      draggable
      onDragStart={handleDragStart}
    >
      {task.title}
    </div>
  );
}

export default Task;
