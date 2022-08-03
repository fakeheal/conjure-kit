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
  },
  tools : {
    billableTimeTracking : {
      set : (value) => void,
      id : string,
    }
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
  tools: {
    billableTimeTracking: {
      set: () => null,
      id: '',
    }
  }
});

const CONJURE_KEY = 'conjure';
const BILLABLE_TIME_ENTRY_ID_KEY = 'billableTimeTrackingTimeEntryId';
const RESCUE_TIME_KEY = 'rescue_time';

const CredentialsProvider = (props) : React$Element<any> => {
  const [conjureToken, setConjureToken] = React.useState(localStorage.getItem(CONJURE_KEY) ?? '');
  const [timeEntryId, setTimeEntryId] = React.useState(localStorage.getItem(BILLABLE_TIME_ENTRY_ID_KEY) ?? '');
  const [rescueTimeToken, setRescueTimeToken] = React.useState(localStorage.getItem(RESCUE_TIME_KEY) ?? '');

  React.useEffect(() => {
    localStorage.setItem(CONJURE_KEY, conjureToken);
  }, [conjureToken]);

  React.useEffect(() => {
    localStorage.setItem(RESCUE_TIME_KEY, rescueTimeToken);
  }, [rescueTimeToken]);

  React.useEffect(() => {
    localStorage.setItem(BILLABLE_TIME_ENTRY_ID_KEY, timeEntryId);
  }, [timeEntryId]);


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
      tools: {
        billableTimeTracking: {
          set: setTimeEntryId,
          id: timeEntryId,
        }
      }
    }}>
      {props.children}
    </CredentialsContext.Provider>
  )
}

export default CredentialsProvider;
