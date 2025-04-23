
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure the document has the class setup ready for dark mode
document.documentElement.classList.add('light');

createRoot(document.getElementById("root")!).render(<App />);
