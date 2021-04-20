import styled from "styled-components";

import assignmentWhite from "../../../../images/assignment-white.svg";

const StyledLessonsContainer = styled.section`
    width: 35%;
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 100px);

    padding: 15px 45px;
    border-right: 1px solid rgba(0, 0, 0, 0.25);
    background: var(--secondary-b-color);
    flex-wrap: nowrap;
    max-height: calc(100vh - 110px);
    overflow-y: auto;
    flex-direction: column;
`;

const StyledLessonsContainerHeader = styled.div`
    margin-left: 5px 0;
    display: flex;
    color: white;
    font-size: 1.1rem;

    span {
        margin: 26px;
        font-size: 1.2rem;
        font-weight: bold;
        padding-top: 3px;
    }
`;

const StyledLessons = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

const LessonsContainer = props => {
    return (
        <StyledLessonsContainer>
            <StyledLessonsContainerHeader>
                <img alt="assignment icon" src={assignmentWhite} />
                <h2>Lessons</h2>
                <span></span>
            </StyledLessonsContainerHeader>
            <StyledLessons></StyledLessons>
        </StyledLessonsContainer>
    );
};

export default LessonsContainer;
