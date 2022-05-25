import React from 'react';

export const CredentialsContext = React.createContext();

const CONJURE_KEY = 'conjure';
const RESCUE_TIME_KEY = 'rescue_time';

export default function (props) {
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
