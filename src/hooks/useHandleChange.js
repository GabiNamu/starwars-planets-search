import { useState } from 'react';

const useHandleChange = (initialState, estado = state) => {
  const [state, setState] = useState(initialState);

  const handle = (event) => {
    setState({
      ...estado,
      [event.target.name]: event.target.value,
    });
  };

  return ({
    handle, state,
  });
};

export default useHandleChange;
