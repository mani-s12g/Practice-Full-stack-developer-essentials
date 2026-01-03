import { Box, Container, Typography } from '@mui/material';
import './App.css'
import useHabitStore from './store/store'

function App() {
  const store = useHabitStore()
  console.log("store", store);
  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" align="center">Habit Tracker</Typography>
        {/* forms */}
        {/* list */}
        {/* states */}
      </Box>
    </Container>
  )
}

export default App
