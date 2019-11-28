import { useState } from "react";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition(newMode) { 
//     setMode(newMode);
//     setHistory(prevHistory => [...prevHistory, newMode]);
//   };

//   function back() {
//     if (history.length > 1) {
//       console.log(history);
//       setHistory(prevHistory => prevHistory.slice(0,1));
//       console.log(history);
//       setMode(history[history.length - 1]);
//     }
//   };

//   return { mode, transition, back };
// };

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setHistory(prev => (replace) ?  [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]);
  }
  function back() {
    if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, - 1)]);
  }

  return { mode: history[history.length - 1], transition, back };
}