import { Label, Button, TextInput } from 'flowbite-react';
import React from 'react';
import { CredentialsContext } from '../Providers/CredentialsProvider';

const GetStarted = () => {

  const credentials = React.useContext(CredentialsContext);

  const [personalAccessToken, setPersonalAccessToken] = React.useState('');
  const [rescueTimeApiToken, setRescueTimeApiToken] = React.useState('');


  const onConjureTokenButtonClicked = (e) => {
    e.preventDefault();
    credentials.conjure.set(personalAccessToken);
  }

  const onRescueTimeTokenButtonClicked = (e) => {
    e.preventDefault();
    credentials.rescueTime.set(rescueTimeApiToken);
  }

  const onClearCredentialsButtonPressed = e => {
    e.preventDefault();
    credentials.rescueTime.set('');
    credentials.conjure.set('');
  }

  if (!credentials.conjure.token) {
    return (
      <form className="flex flex-col gap-4">
        <div>
          <Label
            className="mb-2 block"
            htmlFor="personal-access-token"
          >
            Your Personal Access Token
          </Label>
          <TextInput
            id="personal-access-token"
            type="text"
            placeholder="cnjrp_*****************"
            required={true}
            shadow={true}
            onChange={event => setPersonalAccessToken(event.target.value)}
          />
        </div>
        <Button type="submit" onClick={onConjureTokenButtonClicked}>
          Continue with setup
        </Button>
      </form>
    );
  }

  if (!credentials.rescueTime.token) {
    return (
      <form className="flex flex-col gap-4">
        <div>
          <Label
            className="mb-2 block"
            htmlFor="personal-access-token"
          >
            Rescue Time API Token
          </Label>
          <TextInput
            id="personal-access-token"
            type="text"
            placeholder="rsctim_*****************"
            required={true}
            shadow={true}
            onChange={event => setRescueTimeApiToken(event.target.value)}
          />
        </div>
        <Button type="submit" onClick={onRescueTimeTokenButtonClicked}>
          Continue with setup
        </Button>
      </form>
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
