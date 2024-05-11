import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const COLORS = [
  {
    color: "#B38BFA",
    id: 0,
  },
  {
    color: "#FF79F2",
    id: 1,
  },
  {
    color: "#43E6FC",
    id: 2,
  },
  {
    color: "#F19576",
    id: 3,
  },
  {
    color: "#0047FF",
    id: 4,
  },
  {
    color: "#6691FF",
    id: 5,
  },
];

const Modal = forwardRef(function ({ onAddGroup }, ref) {
  const [group, setGroup] = useState({
    name: "",
    color: null,
  });

  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  const handleChange = (identifier, value) => {
    setGroup((prevGroup) => ({ ...prevGroup, [identifier]: value }));
  };

  const handleCreateGroup = () => {
    if (!group.name || !group.color) {
      return;
    }

    onAddGroup(group);
    setGroup({
      name: "",
      color: null,
    });
    dialog.current.close();
  };

  return createPortal(
    <dialog
      ref={dialog}
      className={classes.createModal}
      onClick={() => dialog.current.close()}
    >
      <div
        className={classes.container}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className={classes.heading}>Create New Group</h2>
        <p>
          <label htmlFor="groupName">Group Name</label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={group.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter group name"
            className={classes.input}
          />
        </p>

        <div className={classes.colorsContainer}>
          <label>Choose colour</label>
          <div className={classes.colors}>
            {COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => handleChange("color", color.color)}
                style={{
                  backgroundColor: color.color,
                }}
                className={`${classes.color} ${
                  color.color === group.color ? classes.selectedColor : ""
                }`}
              />
            ))}
          </div>
        </div>

        <button onClick={handleCreateGroup} className={classes.createBtn}>
          Create
        </button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
