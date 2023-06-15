//@flow

import { Alert, Button } from 'flowbite-react';
import moment from 'moment';
import React from 'react';
import { Navigate } from 'react-router-dom';
import EnterToken from '../../Components/EnterToken';
import { CredentialsContext } from '../../Providers/CredentialsProvider';


const RESCUE_TIME_API_URL = 'http://localhost:8000?url=https://rescuetime.com/anapi/daily_summary_feed&restrict_begin=2023-06-10&restrict_end=2023-06-12&';

const RescueTime = () : React$Element<any> => {
  const credentials = React.useContext(CredentialsContext);

  const [startDate, setStartDate] = React.useState(
    moment().startOf('month').startOf('day')
  );
  const [endDate, setEndDate] = React.useState(moment().endOf('month').endOf('day'));

  const [rescueTimeApiKey, setRescueTimeApiKey] = React.useState(credentials.integrations.rescueTime.api.token);

  const [productiveTimeEntryId, setProductiveTimeEntryId] = React.useState('');
  const [distractingTimeEntryId, setDistractingTimeEntryId] = React.useState('');

  const [days, setDays] = React.useState([]);

  const [setupError, setSetupError] = React.useState('');


  const onRescueTimeTokenButtonPressed = (e) => {
    e.preventDefault();
    credentials.integrations.rescueTime.api.set(rescueTimeApiKey);
    setRescueTimeApiKey('');
  }

  const onClearRescueTimeApiKeyButtonPressed = e => {
    e.preventDefault();
    credentials.integrations.rescueTime.api.set('');
    setRescueTimeApiKey('');
  }

  const onSetProductiveTimeEntryIdButtonPressed = (e) => {
    e.preventDefault();
    credentials.integrations.rescueTime.store.productive.set(productiveTimeEntryId);
    setProductiveTimeEntryId('');
  }
  const onRemoveProductiveTimeEntryIdPressed = () => {
    credentials.integrations.rescueTime.store.productive.set('');
  }

  const onSetDistractingTimeEntryIdButtonPressed = (e) => {
    e.preventDefault();
    credentials.integrations.rescueTime.store.distracting.set(distractingTimeEntryId);
    setDistractingTimeEntryId('');
  }
  const onRemoveDistractingTimeEntryIdPressed = () => {
    credentials.integrations.rescueTime.store.distracting.set('');
  }

  React.useEffect(() => {
    if (!rescueTimeApiKey) {
      setDays([]);
    } else {
      fetch(RESCUE_TIME_API_URL + new URLSearchParams({ key: rescueTimeApiKey }), {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
        .then((response) => {
          return response.json();
        })
        .then(json => {
          if(json.error) {
            setSetupError('Unable to fetch data from Rescue Time. :( Check the provided API token again. If issue persists, open an issue on Github.')
            setDays([]);
          } else {
            setDays(json);
          }
        });
    }
  }, [rescueTimeApiKey]);

  if (!credentials.conjure.token) {
    return <Navigate to="/get-started" />
  }

  if (!credentials.integrations.rescueTime.api.token) {
    return (
      <div>
        <EnterToken
          value={rescueTimeApiKey}
          placeholderText="resc_*********"
          labelText="Enter your Rescue Time API key"
          onButtonPressed={onRescueTimeTokenButtonPressed}
          onInputChanged={setRescueTimeApiKey}
          buttonText="Continue with setup"
        />
        <div className="mt-4">
          <Alert color="blue">
          <span>
            <span className="font-medium">
              API Key
            </span>
            {' '} Login to the following page to request a new API key: {' '}
            <a href="https://www.rescuetime.com/anapi/manage" target="_blank"
               rel="noreferrer">https://www.rescuetime.com/anapi/manage</a>
          </span>
          </Alert>
        </div>
      </div>
    );
  }

  if (!credentials.integrations.rescueTime.store.distracting.id) {
    return (
      <EnterToken
        value={distractingTimeEntryId}
        placeholderText="meas_*******"
        labelText="Enter your Distracting Time Entry Measurement ID"
        onButtonPressed={onSetDistractingTimeEntryIdButtonPressed}
        onInputChanged={setDistractingTimeEntryId}
        buttonText="Continue with setup"
      />
    );
  }

  if (!credentials.integrations.rescueTime.store.productive.id) {
    return (
      <EnterToken
        value={productiveTimeEntryId}
        placeholderText="meas_*******"
        labelText="Enter your Productive Time Entry Measurement ID"
        onButtonPressed={onSetProductiveTimeEntryIdButtonPressed}
        onInputChanged={setProductiveTimeEntryId}
        buttonText="Continue with setup"
      />
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900">
        Rescue Time
      </h1>
      <p className="my-4">
        <strong>Conjure Kit</strong> updates all records in your set Time Entry Measurements for the past 2 weeks. If a
        record already
        exists, it will be overwritten with Rescue Time's current data for your account.
      </p>

      {setupError.length > 0 ? (
        <div className="mt-4">
          <Alert color="red">
                <span>
                  <div className="text-lg font-bold">
                    Setup Error
                  </div>
                  {setupError}
                </span>
          </Alert>
        </div>
      ): (
        <div className="overflow-x-auto relative mt-4 whitespace-nowrap">
          <table className="w-full text-sm text-left">
            <thead className="text-xs bg-gray-50">
            <tr>
              <th scope="col" className="py-2 px-3">
                Pulse
              </th>
              <th scope="col" className="py-2 px-3">
                Date
              </th>
              <th scope="col" className="py-2 px-3 text-right">
                Productive Time
              </th>
              <th scope="col" className="py-2 px-3 text-right">
                Distracting Time
              </th>
              <th scope="col" className="py-2 px-3 text-right">
                Neutral Time
              </th>
              <th scope="col" className="py-2 px-3 text-right">
                Total Time
              </th>
            </tr>
            </thead>
            <tbody>
            {
              days.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="bg-blue-100 p-4 font-bold text-center">
                      No records found.
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {
                    days.map(day => (
                      <tr className="bg-white border-b text-gray-800" key={day.id}>
                        <th scope="row" className="py-2 px-3 font-medium whitespace-nowrap">
                          {day.productivity_pulse}
                        </th>
                        <th scope="row" className="py-2 px-3 font-medium whitespace-nowrap">
                          {day.date}
                        </th>
                        <th scope="row" className="py-2 px-3 font-medium text-right text-green-600">
                          {day.all_productive_duration_formatted} <small>{day.all_productive_percentage}%</small>
                        </th>
                        <th scope="row" className="py-2 px-3 font-medium text-right text-red-700">
                          {day.all_distracting_duration_formatted} <small>{day.all_distracting_percentage}%</small>
                        </th>
                        <th scope="row" className="py-2 px-3 font-medium text-right">
                          {day.neutral_duration_formatted} <small>{day.all_distracting_percentage}%</small>
                        </th>
                        <th scope="row" className="py-2 px-3 font-medium text-right">
                          {day.total_duration_formatted}
                        </th>
                      </tr>
                    ))
                  }
                </>
              )
            }
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center gap-4">
        <Button type="submit" onClick={onClearRescueTimeApiKeyButtonPressed} pill size={"xs"} color="alternative">
          Clear RescueTime API Key
        </Button>
        <Button type="submit" onClick={onRemoveProductiveTimeEntryIdPressed} pill size={"xs"} color="alternative">
          Clear Productive Time Entry ID
        </Button>
        <Button type="submit" onClick={onRemoveDistractingTimeEntryIdPressed} pill size={"xs"} color="alternative">
          Clear Distracting Time Entry ID
        </Button>
      </div>
    </div>
  )
}

export default RescueTime;
