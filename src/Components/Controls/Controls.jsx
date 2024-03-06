import React, { useState } from "react";
import Button, { SelectOption } from "./../Button/Button";
import styles from "../../App.module.css";
import Modal from "./../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../../slices/todoSlice";
export default function Controls() {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const dispatch = useDispatch();

  function updateFilter(e) {
    dispatch(updateFilterStatus(e.target.value));
  }

  return (
    <div className={styles.appHeader}>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        type={"button"}
        variant={"primary"}
      >
        Add Task
      </Button>
      <SelectOption id="filter" value={filterStatus} onChange={updateFilter}>
        <option value="all">All</option>
        <option value="Complete">Complete</option>
        <option value="Incomplete">Incomplete</option>
      </SelectOption>
      <Modal type={"add"} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
