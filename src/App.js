import { useState } from 'react'
import Hero from './components/Hero'
import Main from './components/Main';

function App() {
  const [theme, setTheme] = useState(true)

  const toggleLightMode = () => setTheme(!theme);

  return (
    <div data-theme={theme ? "light" : "dark"} className="App">
      <Hero theme={theme} />
      <Main theme={theme} toggleTheme={toggleLightMode} />
    </div>
  );
}

export default App;
