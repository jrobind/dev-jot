import styled from "styled-components";

import LessonsContainer from "./LessonsContainer/LessonsContainer";
import CreateLesson from "./CreateLesson/CreateLesson";

const StyledAppContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AppContainer = props => {
    return (
        <StyledAppContainer>
            <LessonsContainer></LessonsContainer>
            <CreateLesson></CreateLesson>
        </StyledAppContainer>
    );
};

export default AppContainer;
