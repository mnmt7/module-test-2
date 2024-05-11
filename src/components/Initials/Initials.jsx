import classes from "./Initials.module.css";

export default function Initials({ name, backgroundColor }) {
  const nameArr = name.split(" ");
  const initials =
    nameArr[0].at(0).toUpperCase() +
    (nameArr.length > 1 ? nameArr[1].at(0).toUpperCase() : "");

  return (
    <div style={{ backgroundColor }} className={classes.initials}>
      {initials}
    </div>
  );
}
