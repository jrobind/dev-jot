import styled from "styled-components";

const StyledFormLesson = styled.form`
    display: flex;
    flex-direction: column;
`;

const StyledCreateLessonTitleContainer = styled.div`
    display: flex;
    input {
        margin-bottom: 20px;
        padding: 12px;
        border: 1px solid #ccc;
        &::placeholder {
            font-style: italic;
            font-size: 14px;
        }
    }

    button {
        margin-bottom: 20px;
        padding: 12px;
        border: 1px solid #ccc;
    }
`;

const StyledEditor = styled.div`
    width: 100%;
    background: white;
    height: calc(100vh - 360px);
    overflow: visible;
`;

const StyledButton = styled.button`
    color: white;
    background: var(--main-b-color);
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    font: inherit;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05), 0 3px 6px 0 rgba(0, 0, 0, 0.05);

    margin-top: 20px;
    max-width: 150px;
    padding: 10px 12px;
    border-radius: 3px;
    background: var(--tertiary-b-color);
    color: black;
    letter-spacing: 1px;
    font-size: 14px;
    white-space: nowrap;
    box-shadow: inset 0 0 0 0 #ffee93;
    transition: ease-out 0.3s;
    outline: none;
    position: relative;

    &:hover {
        box-shadow: inset 150px 0 0 0 #ffee93;
        color: black;
        cursor: pointer;
    }
`;

const StyledTagSelectors = styled.div`
    margin-top: -20px;
    display: flex;
    justify-content: center;
    visibility: visible;
    opacity: 1;
    transition: opacity 1s linear;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 1s, opacity 1s linear;
`;

const FormLesson = props => {
    return (
        <StyledFormLesson>
            <StyledCreateLessonTitleContainer>
                <input type="text" placeholder="Lesson title" required />
                <button id="addTag" type="button">
                    Tags
                </button>
            </StyledCreateLessonTitleContainer>
            <StyledTagSelectors></StyledTagSelectors>
            <StyledEditor id="editor"></StyledEditor>
            <StyledButton id="submit" type="submit">
                ADD LESSON
            </StyledButton>
        </StyledFormLesson>
    );
};

export default FormLesson;
