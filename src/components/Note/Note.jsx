import classes from "./Note.module.css";

export default function Note({ note }) {
  const { content, postedDate } = note;

  const date = new Date(postedDate);

  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleDateString("en-IN", options);
  const formattedDateArr = formattedDate.split(", ");

  return (
    <li className={classes.note}>
      <p className={classes.content}>{content}</p>
      <p className={classes.date}>
        {formattedDateArr[0]} <span className={classes.dot}>•</span>
        {formattedDateArr[1].toUpperCase()}
      </p>
    </li>
  );
}
