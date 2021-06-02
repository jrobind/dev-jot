import { Box } from '@material-ui/core';
import styled from 'styled-components';

import assignmentWhite from '../../../../images/assignment-white.svg';
import TextIcon from '../../../TextIcon/TextIcon';

const StyledLessonsContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: calc(100vh - 100px);
  background: var(--secondary-b-color);
  max-height: calc(100vh - 110px);
  overflow-y: auto;
`;

const StyledLessons = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

const LessonsContainer = () => (
  <StyledLessonsContainer>
    <Box pl={3} pt={3}>
      <TextIcon
        icon={assignmentWhite}
        description="assignment icon"
        text="Lessons"
      />
    </Box>
    <StyledLessons></StyledLessons>
  </StyledLessonsContainer>
);

export default LessonsContainer;
