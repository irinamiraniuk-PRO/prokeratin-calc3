import { useState, useEffect } from "react";

// ─── Категории задач для запуска ───────────────────────────────────────────
const DEFAULT_CATEGORIES = [
  {
    id: "seo",
    name: "SEO",
    color: "#2ecc71",
    tasks: [
      { id: "seo-1", text: "Проверить мета-теги на всех страницах", done: false },
      { id: "seo-2", text: "Проверить sitemap.xml", done: false },
      { id: "seo-3", text: "Проверить robots.txt", done: false },
      { id: "seo-4", text: "Проверить скорость загрузки страниц", done: false },
      { id: "seo-5", text: "Проверить мобильную версию", done: false },
      { id: "seo-6", text: "Проверить alt-теги у изображений", done: false },
      { id: "seo-7", text: "Проверить внутреннюю перелинковку", done: false },
    ],
  },
  {
    id: "metrics",
    name: "Метрики",
    color: "#3498db",
    tasks: [
      { id: "metrics-1", text: "Настроить Яндекс.Метрику", done: false },
      { id: "metrics-2", text: "Настроить Google Analytics", done: false },
      { id: "metrics-3", text: "Настроить цели конверсий", done: false },
      { id: "metrics-4", text: "Проверить работу счётчиков", done: false },
      { id: "metrics-5", text: "Настроить вебвизор", done: false },
    ],
  },
  {
    id: "purchase",
    name: "Закупки",
    color: "#9b59b6",
    tasks: [
      { id: "purchase-1", text: "Написать письмо на закупку товара", done: false },
      { id: "purchase-2", text: "Согласовать цены с поставщиком", done: false },
      { id: "purchase-3", text: "Оформить договор", done: false },
      { id: "purchase-4", text: "Подтвердить оплату", done: false },
      { id: "purchase-5", text: "Отследить отправку", done: false },
    ],
  },
  {
    id: "mailing",
    name: "Рассылки",
    color: "#e74c3c",
    tasks: [
      { id: "mailing-1", text: "Подготовить базу email для рассылки", done: false },
      { id: "mailing-2", text: "Написать текст рассылки", done: false },
      { id: "mailing-3", text: "Подготовить картинки/баннеры", done: false },
      { id: "mailing-4", text: "Протестировать письмо", done: false },
      { id: "mailing-5", text: "Запустить рассылку", done: false },
      { id: "mailing-6", text: "Проанализировать открытия/клики", done: false },
    ],
  },
  {
    id: "social",
    name: "Соцсети",
    color: "#f39c12",
    tasks: [
      { id: "social-1", text: "Подготовить контент для Instagram", done: false },
      { id: "social-2", text: "Подготовить контент для VK", done: false },
      { id: "social-3", text: "Подготовить контент для Telegram", done: false },
      { id: "social-4", text: "Запланировать публикации", done: false },
      { id: "social-5", text: "Настроить таргетированную рекламу", done: false },
    ],
  },
  {
    id: "content",
    name: "Контент",
    color: "#1abc9c",
    tasks: [
      { id: "content-1", text: "Обновить описания товаров", done: false },
      { id: "content-2", text: "Добавить новые фото продукции", done: false },
      { id: "content-3", text: "Написать статьи для блога", done: false },
      { id: "content-4", text: "Записать видео-обзоры", done: false },
    ],
  },
  {
    id: "tech",
    name: "Техническое",
    color: "#95a5a6",
    tasks: [
      { id: "tech-1", text: "Проверить SSL-сертификат", done: false },
      { id: "tech-2", text: "Проверить работу форм", done: false },
      { id: "tech-3", text: "Проверить корзину и оплату", done: false },
      { id: "tech-4", text: "Сделать бэкап сайта", done: false },
      { id: "tech-5", text: "Обновить плагины/зависимости", done: false },
    ],
  },
];

const STORAGE_KEY = "prokeratin-launch-tracker";

// ─── Стили ─────────────────────────────────────────────────────────────────
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #030d14 0%, #0a1929 100%)",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#8899aa",
    fontSize: "14px",
  },
  progress: {
    background: "#0a1929",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "30px",
    border: "1px solid #1a3a5c",
  },
  progressBar: {
    background: "#1a3a5c",
    borderRadius: "10px",
    height: "24px",
    overflow: "hidden",
    marginTop: "10px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #2ecc71, #27ae60)",
    transition: "width 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
  },
  categoriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },
  category: {
    background: "#0a1929",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #1a3a5c",
  },
  categoryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  categoryTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
  },
  categoryBadge: {
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#fff",
  },
  categoryProgress: {
    color: "#8899aa",
    fontSize: "14px",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "8px",
    background: "#0d1f35",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  taskItemHover: {
    background: "#132842",
  },
  taskItemDone: {
    opacity: 0.6,
  },
  checkbox: {
    width: "22px",
    height: "22px",
    borderRadius: "6px",
    border: "2px solid #3a5a7c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s ease",
  },
  checkboxChecked: {
    background: "#2ecc71",
    borderColor: "#2ecc71",
  },
  checkmark: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
  },
  taskText: {
    color: "#ccd6e0",
    fontSize: "14px",
    flex: 1,
  },
  taskTextDone: {
    textDecoration: "line-through",
    color: "#6a7a8a",
  },
  addTaskContainer: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },
  addTaskInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #1a3a5c",
    background: "#0d1f35",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  addTaskButton: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#2ecc71",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.2s ease",
  },
  actionsBar: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  actionButton: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease",
  },
  resetButton: {
    background: "#e74c3c",
    color: "#fff",
  },
  newLaunchButton: {
    background: "#3498db",
    color: "#fff",
  },
  backButton: {
    position: "fixed",
    top: "20px",
    left: "20px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#1a3a5c",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.2s ease",
    zIndex: 100,
  },
  deleteButton: {
    background: "transparent",
    border: "none",
    color: "#e74c3c",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px 8px",
    borderRadius: "4px",
    transition: "background 0.2s ease",
  },
};

// ─── Компонент таска ───────────────────────────────────────────────────────
function TaskItem({ task, categoryColor, onToggle, onDelete }) {
  const [hover, setHover] = useState(false);

  return (
    <li
      style={{
        ...styles.taskItem,
        ...(hover ? styles.taskItemHover : {}),
        ...(task.done ? styles.taskItemDone : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onToggle(task.id)}
    >
      <div
        style={{
          ...styles.checkbox,
          ...(task.done
            ? { ...styles.checkboxChecked, background: categoryColor, borderColor: categoryColor }
            : {}),
        }}
      >
        {task.done && <span style={styles.checkmark}>✓</span>}
      </div>
      <span
        style={{
          ...styles.taskText,
          ...(task.done ? styles.taskTextDone : {}),
        }}
      >
        {task.text}
      </span>
      {hover && !task.isDefault && (
        <button
          style={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          title="Удалить задачу"
        >
          ✕
        </button>
      )}
    </li>
  );
}

// ─── Компонент категории ───────────────────────────────────────────────────
function CategoryCard({ category, onToggleTask, onAddTask, onDeleteTask }) {
  const [newTask, setNewTask] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const completedCount = category.tasks.filter((t) => t.done).length;
  const totalCount = category.tasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(category.id, newTask.trim());
      setNewTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div style={styles.category}>
      <div style={styles.categoryHeader}>
        <div style={styles.categoryTitle}>
          <span
            style={{
              ...styles.categoryBadge,
              background: category.color,
            }}
          >
            {category.name}
          </span>
        </div>
        <span style={styles.categoryProgress}>
          {completedCount}/{totalCount} ({progress}%)
        </span>
      </div>

      <ul style={styles.taskList}>
        {category.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            categoryColor={category.color}
            onToggle={(taskId) => onToggleTask(category.id, taskId)}
            onDelete={(taskId) => onDeleteTask(category.id, taskId)}
          />
        ))}
      </ul>

      <div style={styles.addTaskContainer}>
        <input
          type="text"
          placeholder="Добавить задачу..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          style={{
            ...styles.addTaskInput,
            borderColor: inputFocused ? category.color : "#1a3a5c",
          }}
        />
        <button
          style={{
            ...styles.addTaskButton,
            background: category.color,
          }}
          onClick={handleAddTask}
        >
          +
        </button>
      </div>
    </div>
  );
}

// ─── Главный компонент ─────────────────────────────────────────────────────
export default function LaunchTracker({ onBack }) {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CATEGORIES;
      }
    }
    return DEFAULT_CATEGORIES;
  });

  // Сохраняем в localStorage при изменениях
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  // Общий прогресс
  const totalTasks = categories.reduce((sum, cat) => sum + cat.tasks.length, 0);
  const completedTasks = categories.reduce(
    (sum, cat) => sum + cat.tasks.filter((t) => t.done).length,
    0
  );
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Переключить статус задачи
  const handleToggleTask = (categoryId, taskId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              tasks: cat.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
              ),
            }
          : cat
      )
    );
  };

  // Добавить задачу
  const handleAddTask = (categoryId, text) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              tasks: [
                ...cat.tasks,
                {
                  id: `${categoryId}-${Date.now()}`,
                  text,
                  done: false,
                  isDefault: false,
                },
              ],
            }
          : cat
      )
    );
  };

  // Удалить задачу
  const handleDeleteTask = (categoryId, taskId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              tasks: cat.tasks.filter((task) => task.id !== taskId),
            }
          : cat
      )
    );
  };

  // Сбросить все отметки
  const handleReset = () => {
    if (window.confirm("Сбросить все отметки выполнения?")) {
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          tasks: cat.tasks.map((task) => ({ ...task, done: false })),
        }))
      );
    }
  };

  // Новый запуск (сброс + очистка пользовательских задач)
  const handleNewLaunch = () => {
    if (window.confirm("Начать новый запуск? Все отметки будут сброшены.")) {
      setCategories(DEFAULT_CATEGORIES);
    }
  };

  return (
    <div style={styles.container}>
      {onBack && (
        <button style={styles.backButton} onClick={onBack}>
          ← Назад к калькулятору
        </button>
      )}

      <div style={styles.header}>
        <h1 style={styles.title}>📋 Трекер запусков ProKeratin</h1>
        <p style={styles.subtitle}>
          Отслеживайте выполнение задач для успешного запуска
        </p>
      </div>

      <div style={styles.progress}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontSize: "16px", fontWeight: "bold" }}>
            Общий прогресс
          </span>
          <span style={{ color: "#2ecc71", fontSize: "18px", fontWeight: "bold" }}>
            {completedTasks} из {totalTasks} задач ({overallProgress}%)
          </span>
        </div>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${overallProgress}%`,
            }}
          >
            {overallProgress > 10 && `${overallProgress}%`}
          </div>
        </div>
      </div>

      <div style={styles.categoriesGrid}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      <div style={styles.actionsBar}>
        <button
          style={{ ...styles.actionButton, ...styles.resetButton }}
          onClick={handleReset}
        >
          🔄 Сбросить отметки
        </button>
        <button
          style={{ ...styles.actionButton, ...styles.newLaunchButton }}
          onClick={handleNewLaunch}
        >
          🚀 Новый запуск
        </button>
      </div>
    </div>
  );
}
