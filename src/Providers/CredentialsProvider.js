// @flow
import React from 'react';

export const CredentialsContext = React.createContext<{
  conjure : {
    set : (value) => void,
    token : string
  },
  rescueTime : {
    set : (value) => void,
    token : string
  }
}>({
  conjure: {
    set: () => null,
    token: ''
  },
  rescueTime: {
    set: () => null,
    token: ''
  },
});

const CONJURE_KEY = 'conjure';
const RESCUE_TIME_KEY = 'rescue_time';

const CredentialsProvider = (props) : React$Element<any> => {
  const [conjureToken, setConjureToken] = React.useState(localStorage.getItem(CONJURE_KEY) ?? '');
  const [rescueTimeToken, setRescueTimeToken] = React.useState(localStorage.getItem(RESCUE_TIME_KEY) ?? '');

  React.useEffect(() => {
    localStorage.setItem(CONJURE_KEY, conjureToken);
  }, [conjureToken]);

  React.useEffect(() => {
    localStorage.setItem(RESCUE_TIME_KEY, rescueTimeToken);
  }, [rescueTimeToken]);


  return (
    <CredentialsContext.Provider value={{
      conjure: {
        set: setConjureToken,
        token: conjureToken
      },
      rescueTime: {
        set: setRescueTimeToken,
        token: rescueTimeToken
      },
    }}>
      {props.children}
    </CredentialsContext.Provider>
  )
}

export default CredentialsProvider;
