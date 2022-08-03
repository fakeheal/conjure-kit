<p align="center">
<img src="makeshift-logo.png" alt="Makeshift Logo" height='75'/>
</p>

# Conjure Kit

Allows users of [conjure.so](https://conjure.so) to connect and automize measurement synchronization between **
conjure.so** and:

- [Trakt.tv](https://trakt.tv)
- [Rescue Time](https://rescuetime.com)
- more...

## Tools

### Billable Time Tracking ([Preview](https://i.imgur.com/q3uFEJd.png))

#### Setup

1. Create `Time Entry` measurement and add the following custom fields to it:
    - Field Name: `Task`, type: `Single Line Text`
    - Field Name: `Label`, type: `Single Line Text`
    - Field Name: `Project`, type: `Single Line Text`
    - Field Name: `Client`, type: `Single Line Text`
    - Field Name: `Rate`, type: `Number` with `0.00` precision
    - Field Name: `Billable?`, type: `Checkbox`

2. Go to [Conjure Kit](https://conjure-kit.vercel.app/tools/billable-time-tracking) (or your self-hosted version of
   this app)
3. Enter your **conjure.so** token (Help: [How to get your personal access token](https://conjure.so/docs/api/getting-started))
4. Choose "**Tools: Billable Time Tracking**" from the "mini dashboard"
5. Enter your `Time Entry` measurement ID, created in step 1, _(tip: you can see it in the URL, when previewing the records of that measurement)_
6. Profit 👏

## Stack

- JS (React via CRA)
- Flowbite (UI)

