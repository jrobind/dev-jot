import style from "./CreateLesson.module.css";

import addBoxBlack from "../../../../images/add_box-black.svg";

import FormLesson from "./FormLesson/FormLesson";

const createLesson = props => {
  return (
    <section className={style.createLessonContainer}>
      <div className={style.createLesson}>
        <div className={style.createLessonContainerHeader}>
          <img alt="add icon" src={addBoxBlack} />
          <h2>New Lesson</h2>
          <button
            className={[style.createLessonClear, style.button].join(" ")}
            hidden
          >
            Clear
          </button>
        </div>

        <FormLesson></FormLesson>
      </div>
    </section>
  );
};

export default createLesson;
