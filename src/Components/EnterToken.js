// @flow
import { Label, TextInput, Button } from 'flowbite-react';
import React from 'react';

type Props = {
  value : string,
  onInputChanged : (value : string) => void,
  labelText : string,
  placeholderText : string,
  onButtonPressed : () => void,
  buttonText : string
}

const EnterToken = (
  {
    value,
    onInputChanged,
    labelText,
    placeholderText,
    onButtonPressed,
    buttonText
  } : Props
) : React$Element<any> => {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <Label
          className="mb-2 block"
          htmlFor="token"
        >
          {labelText}
        </Label>
        <TextInput
          id="token"
          type="text"
          placeholder={placeholderText}
          required={true}
          shadow={true}
          value={value}
          onChange={event => onInputChanged(event.target.value)}
        />
      </div>
      <Button type="submit" onClick={onButtonPressed}>
        {buttonText}
      </Button>
    </form>
  )
}

export default EnterToken;
