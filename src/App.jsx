import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './router';

/**
 * App — root component.
 * Wraps the entire app in ThemeProvider and renders centralized routes.
 */
function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
