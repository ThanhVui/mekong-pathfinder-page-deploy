import { LanguageProvider } from './context/LanguageContext';
import Page from './pages/Pages';

function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}

export default App;
