// @flow
import React from 'react';

export const CredentialsContext = React.createContext<{
  conjure : {
    set : (value) => void,
    token : string
  },
  integrations : {
    rescueTime : {
      api : {
        set : (value) => void,
        token : string
      },
      store : {
        distracting : {
          set : (value) => void,
          id : string
        },
        productive : {
          set : (value) => void,
          id : string
        },
      }
    },
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
  integrations: {
    rescueTime: {
      api: {
        set: () => null,
        token: ''
      },
      store: {
        distracting: {
          set: () => null,
          id: ''
        },
        productive: {
          set: () => null,
          id: ''
        }
      }
    },
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
const RESCUE_TIME_API_TOKEN_KEY = 'rescueTimeApiToken';
const RESCUE_TIME_STORE_DISTRACTING_ID_KEY = 'rescueTimeStoreDistractingId';
const RESCUE_TIME_STORE_PRODUCTIVE_ID_KEY = 'rescueTimeStoreProductiveId';

const CredentialsProvider = (props) : React$Element<any> => {
  const [conjureToken, setConjureToken] = React.useState(localStorage.getItem(CONJURE_KEY) ?? '');
  const [timeEntryId, setTimeEntryId] = React.useState(localStorage.getItem(BILLABLE_TIME_ENTRY_ID_KEY) ?? '');
  const [rescueTimeApiToken, setRescueTimeApiToken] = React.useState(localStorage.getItem(RESCUE_TIME_API_TOKEN_KEY) ?? '');
  const [rescueTimeDistractingId, setRescueTimeDistractingId] = React.useState(localStorage.getItem(RESCUE_TIME_STORE_DISTRACTING_ID_KEY) ?? '');
  const [rescueTimeProductiveId, setRescueTimeProductiveId] = React.useState(localStorage.getItem(RESCUE_TIME_STORE_PRODUCTIVE_ID_KEY) ?? '');

  React.useEffect(() => {
    localStorage.setItem(CONJURE_KEY, conjureToken);
  }, [conjureToken]);

  React.useEffect(() => {
    localStorage.setItem(RESCUE_TIME_API_TOKEN_KEY, rescueTimeApiToken);
  }, [rescueTimeApiToken]);

  React.useEffect(() => {
    localStorage.setItem(RESCUE_TIME_STORE_DISTRACTING_ID_KEY, rescueTimeDistractingId);
  }, [rescueTimeDistractingId]);

  React.useEffect(() => {
    localStorage.setItem(RESCUE_TIME_STORE_PRODUCTIVE_ID_KEY, rescueTimeProductiveId);
  }, [rescueTimeProductiveId]);

  React.useEffect(() => {
    localStorage.setItem(BILLABLE_TIME_ENTRY_ID_KEY, timeEntryId);
  }, [timeEntryId]);


  return (
    <CredentialsContext.Provider value={{
      conjure: {
        set: setConjureToken,
        token: conjureToken
      },
      integrations: {
        rescueTime: {
          api: {
            set: setRescueTimeApiToken,
            token: rescueTimeApiToken
          },
          store: {
            distracting: {
              set: setRescueTimeDistractingId,
              id: rescueTimeDistractingId
            },
            productive: {
              set: setRescueTimeProductiveId,
              id: rescueTimeProductiveId
            }
          }
        },
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
