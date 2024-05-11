import { useState, useEffect, useRef } from "react";

import Modal from "../Modal/Modal";
import MenuButton from "../MenuButton/MenuButton";
import classes from "./Menu.module.css";
import { generateId } from "../../utils/uid";

let isInitial = true;

export default function Menu({
  onGroupSelection,
  activeGroup,
  setActiveGroup,
}) {
  const [groups, setGroups] = useState([]);
  const modal = useRef();

  useEffect(() => {
    const newGroups = localStorage.getItem("groups");
    if (newGroups) {
      const newGroupsObj = JSON.parse(newGroups);
      setGroups(newGroupsObj);
    }
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const handleAddGroup = (group) => {
    group.id = generateId();
    setGroups((prevGroups) => [...prevGroups, group]);
    setTimeout(() => {
      setActiveGroup(group.id);
    });
  };

  return (
    <div className={classes.menuContainer}>
      <Modal ref={modal} onAddGroup={handleAddGroup} />
      <header className={classes.menuHeader}>Pocket Notes</header>
      <menu className={classes.menu}>
        {groups.map((group) => (
          <MenuButton
            key={group.id}
            group={group}
            onClick={() => onGroupSelection(group.id)}
            isActive={activeGroup === group.id}
          />
        ))}
      </menu>
      <button
        className={classes.addGroupBtn}
        onClick={() => modal.current?.open()}
      >
        +
      </button>
    </div>
  );
}
