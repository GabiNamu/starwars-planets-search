import { useState } from 'react';

function useHandleChange(initialState) {
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  return (
    {
      handleChange, state, setState,
    }
  );
}

export default useHandleChange;
