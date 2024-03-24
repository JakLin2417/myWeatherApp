import { getValue } from '@testing-library/user-event/dist/utils';
import './App.css';
import { WeatherApp } from './Components/WeatherApp/WeatherAppv1';
import { createContext,useState } from 'react';
export const ThemeContext = createContext(null);
function App() {
  const [theme,setTheme] = useState("Light");

  const toggleTheme = () => {
    setTheme((curr) =>(curr === 'Light' ? 'Dark' : 'Light'));
};
  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
      <div className="App" id={theme} >
      <WeatherApp/>
      <button className="togglebutton" onClick={()=>{toggleTheme()}}>
        {theme}
        </button>
      </div>
      </ThemeContext.Provider>
  );
}

export default App;
