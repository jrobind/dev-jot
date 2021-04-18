import style from "./AppContainer.module.css";

import LessonsContainer from "./LessonsContainer/LessonsContainer";
import CreateLesson from "./CreateLesson/CreateLesson";

const appContainer = props => {
  return (
    <div className={style.appContainer}>
      <LessonsContainer></LessonsContainer>
      <CreateLesson></CreateLesson>
    </div>
  );
};

export default appContainer;
