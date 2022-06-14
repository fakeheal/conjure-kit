// @flow
import { Button } from 'flowbite-react';
import React from 'react';
import EnterToken from '../Components/EnterToken';
import { CredentialsContext } from '../Providers/CredentialsProvider';

const GetStarted = () : React$Element<any> => {

  const credentials = React.useContext(CredentialsContext);

  const [personalAccessToken, setPersonalAccessToken] = React.useState('');
  const [rescueTimeApiToken, setRescueTimeApiToken] = React.useState('');


  const onConjureTokenButtonClicked = (e) => {
    e.preventDefault();
    credentials.conjure.set(personalAccessToken);
    setPersonalAccessToken('');
  }


  const onRescueTimeTokenButtonClicked = (e) => {
    e.preventDefault();
    credentials.rescueTime.set(rescueTimeApiToken);
    setRescueTimeApiToken('');
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

  if (!credentials.rescueTime.token) {
    return (
      <EnterToken
        value={rescueTimeApiToken}
        onButtonPressed={onRescueTimeTokenButtonClicked}
        buttonText="Continue with Setup"
        labelText="Enter Rescue Time Token"
        onInputChanged={setRescueTimeApiToken}
        placeholderText="resctm_*******" />
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <img
        alt="Mythic Quest: Huzzah"
        className="inline"
        src="https://64.media.tumblr.com/d50344f8706d8ae1d1a4c666b8a6acea/53f0db378312c183-71/s540x810/b0bff49f80a0027022f10374d8fc719cacdfa785.gifv" />


      <Button type="submit" onClick={onClearCredentialsButtonPressed}>
        Clear Credentials
      </Button>
    </div>
  )

};

export default GetStarted;
