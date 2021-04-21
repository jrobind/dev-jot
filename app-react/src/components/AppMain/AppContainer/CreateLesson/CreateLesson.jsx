import styled from "styled-components";

import addBoxBlack from "../../../../images/add_box-black.svg";

import FormLesson from "./FormLesson/FormLesson";

const StyledCreateLessonContainer = styled.section`
    padding: 15px 50px 15px 45px;
`;

const StyledCreateLesson = styled.div`
    width: 100%;
`;

const StyledCreateLessonContainerHeader = styled.div`
    display: flex;

    button {
        margin-left: auto;
        min-width: 70px;
        max-height: 39px;

        color: white;
        background: var(--main-b-color);
        padding: 5px 10px;
        border: none;
        cursor: pointer;
        font: inherit;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05), 0 3px 6px 0 rgba(0, 0, 0, 0.05);
    }
`;

const createLesson = props => {
    return (
        <StyledCreateLessonContainer>
            <StyledCreateLesson>
                <StyledCreateLessonContainerHeader>
                    <img alt="add icon" src={addBoxBlack} />
                    <h2>New Lesson</h2>
                    <button hidden>Clear</button>
                </StyledCreateLessonContainerHeader>

                <FormLesson />
            </StyledCreateLesson>
        </StyledCreateLessonContainer>
    );
};

export default createLesson;
