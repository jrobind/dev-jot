import style from "./FormLesson.module.css";

const formLesson = props => {
  return (
    <form className={style.formLesson}>
      <div className={style.createLessonTitleContainer}>
        <input
          className={style.creatLessonInput}
          type="text"
          placeholder="Lesson title"
          required
        />
        <button
          className={[style.addTag, style.createLessonInput].join()}
          id="addTag"
          type="button"
        >
          Tags
        </button>
      </div>
      <div className={[style.tagSelectors, style.hidden].join(" ")}></div>
      <div id="editor"></div>
      <button className={style.button} id="submit" type="submit">
        ADD LESSON
      </button>
    </form>
  );
};

export default formLesson;
