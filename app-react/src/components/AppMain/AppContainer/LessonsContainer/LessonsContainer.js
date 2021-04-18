import style from "./LessonsContainer.module.css";

import assignmentWhite from "../../../../images/assignment-white.svg";

const lessonsContainer = props => {
  return (
    <section className={style.lessonsContainer}>
      <div className={style.lessonsContainerHeader}>
        <img alt="assignment icon" src={assignmentWhite} />
        <h2>Lessons</h2>
        <span className={style.lessonsCount}></span>
      </div>
      <div className={style.lessons}></div>
    </section>
  );
};

export default lessonsContainer;
