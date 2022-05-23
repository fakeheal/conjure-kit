import {Label, Checkbox, Button, TextInput} from 'flowbite-react';

export default function () {
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
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree">
          I understand that this app doesn't store any information outside my browser
        </Label>
      </div>
      <Button type="submit">
        Continue with setup
      </Button>
    </form>
  )
}
