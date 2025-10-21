import { LanguageProvider } from './context/LanguageContext';
import { ColorThemeProvider } from './context/ColorThemeContext';
import Page from './pages/Pages';

function App() {
  return (
    <ColorThemeProvider>
      <LanguageProvider>
        <Page />
      </LanguageProvider>
    </ColorThemeProvider>
  );
}

export default App;
