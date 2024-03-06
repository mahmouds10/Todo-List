import { useSelector } from "react-redux";
import styles from "./AppContent.module.css";
import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { motion } from "framer-motion";

export default function AppContent() {
  const container = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
  };

  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = todoList.filter((todo) => {
    if (filterStatus === "all") {
      return true;
    }
    return todo.status === filterStatus;
  });

  return (
    <motion.div
      className={styles.contentWrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {filteredTodoList.length > 0 ? (
        filteredTodoList.map((todo) => (
          // <motion.div

          //   key={todo.id}
          //   variants={child}
          //   className={styles.todoItemWrapper}
          //   exit={{ y: 20, opacity: 0 }}
          // >
          <TodoItem todo={todo} />
          // </motion.div>
        ))
      ) : (
        <motion.p variants={child} className={styles.emptyText}>
          No Tasks.
        </motion.p>
      )}
    </motion.div>
  );
}
