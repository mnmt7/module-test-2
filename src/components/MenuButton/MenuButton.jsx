import Initials from "../Initials/Initials.jsx";
import classes from "./MenuButton.module.css";

export default function MenuButton({ group, onClick, isActive }) {
  const { name, color } = group;

  return (
    <li className={isActive ? classes.active : ""}>
      <button onClick={onClick} className={classes.menuButton}>
        <Initials name={name} backgroundColor={color} />
        <p className={classes.name}>{name}</p>
      </button>
    </li>
  );
}
