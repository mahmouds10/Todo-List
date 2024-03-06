import { format } from "date-fns";
import styles from "./TodoItem.module.css";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateToDo } from "../../slices/todoSlice";
import toast from "react-hot-toast";
import Modal from "./../Modal/Modal";
import CheckboxBtn from "../CheckboxBtn/CheckboxBtn";
import { motion } from "framer-motion";

export default function TodoItem({ todo }) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    if (todo.status === "Complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = (e) => {
    dispatch(deleteTodo(todo.id));
    toast("Deleted Successfully!", {
      icon: "🗑️",
    });
  };
  const hendelEdit = (e) => {
    setUpdateModalOpen(true);
  };

  function mergeClasses(classes) {
    return classes
      .filter((item) => item !== "")
      .join(" ")
      .trim();
  }

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateToDo({
        ...todo,
        status: checked ? "Incomplete" : "Complete",
      })
    );
  };

  return (
    <>
      <Modal
        todo={todo}
        type={"update"}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
      <motion.div variants={child} className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckboxBtn checked={checked} handelCheck={handleCheck} />
          <div className={styles.text}>
            <p
              className={mergeClasses([
                styles.todoText,
                todo.status === "Complete" ? styles.todoTextCompleted : "",
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), "p , dd/mm/yyyy")}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div onClick={handleDelete} className={styles.icon}>
            <MdDelete />
          </div>
          <div onClick={hendelEdit} className={styles.icon}>
            <MdEdit />
          </div>
        </div>
      </motion.div>
    </>
  );
}
