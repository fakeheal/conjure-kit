// @flow

import { Spinner, Alert, Button, TextInput } from 'flowbite-react';
import moment from 'moment';
import React from 'react';
import { Navigate } from 'react-router-dom';
import EnterToken from '../../Components/EnterToken';
import useTimeEntry from '../../hooks/useTimeEntry';
import { CredentialsContext } from '../../Providers/CredentialsProvider';

const HTML_DATETIME_INPUT_FORMAT = 'yyyy-MM-DDThh:mm';

const FIELD_TASK = 'Task';
const FIELD_LABEL = 'Label';
const FIELD_PROJECT = 'Project';
const FIELD_CLIENT = 'Client';
const FIELD_HOURLY_RATE = 'Rate';
const FIELD_IS_BILLABLE = 'Billable?';

const processMeasurements = (records) => {
  if (!records || records.length === 0) {
    return [];
  }

  const items = [];

  const customFieldsIds = {
    [FIELD_TASK]: records[0].measure.fields.find(field => field.name === FIELD_TASK).id,
    [FIELD_LABEL]: records[0].measure.fields.find(field => field.name === FIELD_LABEL).id,
    [FIELD_PROJECT]: records[0].measure.fields.find(field => field.name === FIELD_PROJECT).id,
    [FIELD_CLIENT]: records[0].measure.fields.find(field => field.name === FIELD_CLIENT).id,
    [FIELD_HOURLY_RATE]: records[0].measure.fields.find(field => field.name === FIELD_HOURLY_RATE).id,
    [FIELD_IS_BILLABLE]: records[0].measure.fields.find(field => field.name === FIELD_IS_BILLABLE).id,
  };

  if (Object.values(customFieldsIds).filter((i) => i).length !== 6) {
    throw new Error("This measurement is not setup properly.");
  }

  for (let i = 0; i < records.length; i++) {
    let isBillable = records[i].values[customFieldsIds[FIELD_IS_BILLABLE]];
    let duration = records[i].values.duration;
    let hourlyRate = records[i].values[customFieldsIds[FIELD_HOURLY_RATE]];
    items.push({
      id: records[i].id,
      start: records[i].timestampRelative,
      task: records[i].values[customFieldsIds[FIELD_TASK]],
      label: records[i].values[customFieldsIds[FIELD_LABEL]],
      project: records[i].values[customFieldsIds[FIELD_PROJECT]],
      client: records[i].values[customFieldsIds[FIELD_CLIENT]],
      hourlyRate,
      isBillable,
      duration: new Date(duration * 1000).toISOString().slice(11, 19),
      total: isBillable ? (Math.round(duration * (hourlyRate / 60 / 60) * 100) / 100) : 0
    });
  }

  return items;
};

const getTotal = (items) => items.reduce((acc, item) => acc + item.total, 0);

const BillableTimeTracking = () : React$Element<any> => {
  const credentials = React.useContext(CredentialsContext);
  const [timeEntryId, setTimeEntryId] = React.useState('');
  const [setupError, setSetupError] = React.useState('');
  const [measurements, setMeasurements] = React.useState([]);
  const [startDate, setStartDate] = React.useState(
    moment().startOf('month').startOf('day')
  );
  const [endDate, setEndDate] = React.useState(moment().endOf('month').endOf('day'));

  const { data, isFetching } = useTimeEntry(
    credentials.tools.billableTimeTracking.id,
    startDate.toISOString(),
    endDate.toISOString(),
    credentials.conjure.token
  );

  const onRemoveMeasurementIdPressed = () => {
    credentials.tools.billableTimeTracking.set('');
  }

  React.useEffect(() => {
    setSetupError('');
    try {
      setMeasurements(processMeasurements(data));
    } catch (e) {
      setMeasurements([]);
      setSetupError(e.message);
    }
  }, [data])

  const SetupError = () => (
    <div className="mt-4">
      <Alert color="red">
          <span>
            <div className="text-lg font-bold">
              Setup Error
            </div>
            Measurement is not setup properly. It must have <strong>all</strong> of the following custom fields:
            <ul className="list-disc ml-4">
              <li>Task</li>
              <li>Label</li>
              <li>Project</li>
              <li>Client</li>
              <li>Rate</li>
              <li>Billable?</li>
            </ul>
            <strong>Names must be exactly as written above.</strong>
          </span>
      </Alert>
    </div>
  )

  const onSetTimeEntryIdButtonPressed = (e) => {
    e.preventDefault();
    credentials.tools.billableTimeTracking.set(timeEntryId);
    setTimeEntryId('');
  }

  if (!credentials.conjure.token) {
    return <Navigate to="/get-started" />
  }

  if (!credentials.tools.billableTimeTracking.id) {
    return (
      <EnterToken
        value={timeEntryId}
        placeholderText="meas_*********"
        labelText="Enter your Time Entry Measurement ID"
        onButtonPressed={onSetTimeEntryIdButtonPressed}
        onInputChanged={setTimeEntryId}
        buttonText="Continue with setup"
      />
    );
  }

  return (
    <div className="flex flex-col pt-4">
      <h2 className="text-lg font-bold">
        Billable Time Tracking
        {isFetching && (
          <Spinner aria-label="Default status example" className="ml-2" />
        )}
      </h2>

      <div className="flex mt-4 gap-4">
        <TextInput
          id="startDate"
          type="datetime-local"
          placeholder="Enter start date & time..."
          value={startDate.format(HTML_DATETIME_INPUT_FORMAT)}
          onChange={({ target }) => setStartDate(moment(target.value))}
          required={true}
        />
        <TextInput
          id="endDate"
          type="datetime-local"
          placeholder="Enter end date & time..."
          onChange={({ target }) => setEndDate(moment(target.value))}
          value={endDate.format(HTML_DATETIME_INPUT_FORMAT)}
          required={true}
        />
      </div>

      {setupError && <SetupError />}
      <div className="overflow-x-auto relative mt-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs bg-gray-50">
          <tr>
            <th scope="col" className="py-2 px-3">
              Started
            </th>
            <th scope="col" className="py-2 px-3">
              Task
            </th>
            <th scope="col" className="py-2 px-3 text-right">
              Label
            </th>
            <th scope="col" className="py-2 px-3 text-right">
              Project
            </th>
            <th scope="col" className="py-2 px-3 text-right">
              Client
            </th>
            <th scope="col" className="py-2 px-3 text-right">
              Duration
            </th>
            <th scope="col" className="py-2 px-3 text-right">
              Total ($)
            </th>
          </tr>
          </thead>
          <tbody>

          {
            measurements.length === 0 ? (
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
                  measurements.map(measurement => (
                    <tr className="bg-white border-b text-gray-800" key={measurement.id}>
                      <th scope="row" className="py-2 px-3 font-medium whitespace-nowrap">
                        {measurement.start}
                      </th> <th scope="row" className="py-2 px-3 font-medium">
                        {measurement.task}
                      </th>
                      <td className="py-2 px-3 text-right">
                        <span className="py-1 px-2 rounded bg-green-50">{measurement.label}</span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {measurement.project}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <strong>{measurement.client}</strong>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {measurement.duration}
                      </td>
                      <td className="py-2 px-3 text-right">
                        {measurement.total.toFixed(2)}
                      </td>
                    </tr>
                  ))
                }
                <tr>
                  <td colSpan={6} className="text-lg text-right py-2 px-3">
                    <span className="text-gray-400">
                      Total: {' '}
                    </span>
                    <span className="font-bold">
                      {getTotal(measurements)}
                    </span>
                  </td>
                </tr>
              </>
            )
          }
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center flex-col">
        <Button type="submit" onClick={onRemoveMeasurementIdPressed} pill size={"xs"} color="alternative">
          Clear Measurement ID
        </Button>
      </div>
    </div>
  )
}

export default BillableTimeTracking;
