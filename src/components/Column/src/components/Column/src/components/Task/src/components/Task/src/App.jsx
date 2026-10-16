import { useState } from 'react';
import Column from './components/Column/Column';
import styles from './App.module.css';

const initialData = {
  todo: [
    { id: '1', title: 'Сверстать колонку' },
    { id: '2', title: 'Написать стили' },
  ],
  inProgress: [{ id: '3', title: 'Разобраться с drag & drop' }],
  done: [],
};

function App() {
  const [columns, setColumns] = useState(initialData);

  const handleDropTask = (taskId, targetColumn) => {
    setColumns((prev) => {
      const next = { ...prev };
      let movedTask = null;

      for (const key in next) {
        const found = next[key].find((t) => t.id === taskId);
        if (found) {
          movedTask = found;
          next[key] = next[key].filter((t) => t.id !== taskId);
          break;
        }
      }

      if (movedTask && targetColumn in next) {
        next[targetColumn] = [...next[targetColumn], movedTask];
      }

      return next;
    });
  };

  return (
    <div className={styles.board}>
      <Column title="todo" tasks={columns.todo} onDropTask={handleDropTask} />
      <Column title="inProgress" tasks={columns.inProgress} onDropTask={handleDropTask} />
      <Column title="done" tasks={columns.done} onDropTask={handleDropTask} />
    </div>
  );
}

export default App;
