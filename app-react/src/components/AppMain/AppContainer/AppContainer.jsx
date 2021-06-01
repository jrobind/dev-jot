import Grid from '@material-ui/core/Grid';
import LessonsContainer from './LessonsContainer/LessonsContainer';
import CreateLesson from './CreateLesson/CreateLesson';

const AppContainer = () => (
  <Grid container>
    <Grid item xs={12} md={6} lg={6}>
      <LessonsContainer />
    </Grid>
    <Grid item xs={12} md={6} lg={6}>
      <CreateLesson />
    </Grid>
  </Grid>
);

export default AppContainer;
