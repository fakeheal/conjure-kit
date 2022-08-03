// @flow
import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import EnterToken from '../Components/EnterToken';
import { CredentialsContext } from '../Providers/CredentialsProvider';

const GetStarted = () : React$Element<any> => {

  const credentials = React.useContext(CredentialsContext);

  const [personalAccessToken, setPersonalAccessToken] = React.useState('');


  const onConjureTokenButtonClicked = (e) => {
    e.preventDefault();
    credentials.conjure.set(personalAccessToken);
    setPersonalAccessToken('');
  }

  const onClearCredentialsButtonPressed = e => {
    e.preventDefault();
    credentials.rescueTime.set('');
    credentials.conjure.set('');
  }

  if (!credentials.conjure.token) {
    return (
      <EnterToken
        value={personalAccessToken}
        placeholderText="cnjrp_*****************"
        labelText="Enter your Conjure Personal Access Token"
        onButtonPressed={onConjureTokenButtonClicked}
        onInputChanged={setPersonalAccessToken}
        buttonText="Continue with setup"
      />
    );
  }

  return (
    <div className="flex flex-col justify-between">
      <div>
        <Link to="/tools/billable-time-tracking">
          <button
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-lg lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-4 py-2 sm:py-2 text-sm">
            Tools: Billable Time Tracking
          </button>
        </Link>
      </div>

      <div className="mt-4">
        <Button type="submit" onClick={onClearCredentialsButtonPressed}>
          Clear Credentials
        </Button>
      </div>
    </div>
  )
};

export default GetStarted;
