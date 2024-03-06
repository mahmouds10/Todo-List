import modalStyle from "./Modal.module.css";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { addTodo, updateToDo } from "../../slices/todoSlice";
import { CiEdit } from "react-icons/ci";

import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

export default function Modal({ type, setModalOpen, modalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Incomplete");

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("Incomplete");
    }
  }, [modalOpen, type, todo]);

  function handelSubmit(e) {
    e.preventDefault();
    if (title === "") {
      document.getElementById("title").classList.add("empty-input");
    }
    if (title && status) {
      if (type === "add") {
        document.getElementById("title").classList.remove("empty-input");
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        setModalOpen(false);
        setTitle("");
        setStatus("Incomplete");
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateToDo({ ...todo, title, status }));
          setModalOpen(false);
        } else {
          toast.error("Please update the todo");
        }
      }
    }
  }
  return (
    <>
      {modalOpen ? (
        <div className={modalStyle.wrapper}>
          <div className={modalStyle.container}>
            <div
              onClick={() => {
                setModalOpen(false);
              }}
              className={modalStyle.closeButton}
            >
              <MdOutlineClose />
            </div>
            <form
              className={modalStyle.form}
              onSubmit={(e) => {
                handelSubmit(e);
              }}
            >
              <h1
                style={{ display: "flex", alignItems: "center" }}
                className={modalStyle.formTitle}
              >
                {type === "update" ? (
                  <CiEdit style={{ padding: "0px 4px", fontSize: "3rem" }} />
                ) : (
                  <IoIosAdd fontSize={"3rem"} />
                )}
                {type === "update" ? "Update" : "Add New"} Task
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  type="text"
                  id="status"
                >
                  <option value="Incomplete">Incomplete</option>
                  <option value="Complete">Complete</option>
                </select>
              </label>
              <div className={modalStyle.buttonContainer}>
                <Button type={"submit"} variant={"primary"}>
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setModalOpen(false);
                  }}
                  type={"button"}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
