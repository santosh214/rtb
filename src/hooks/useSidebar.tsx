import { useState } from 'react';

// Custom hook for sidebar toggle state
const useSidebar = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
};

export default useSidebar;
