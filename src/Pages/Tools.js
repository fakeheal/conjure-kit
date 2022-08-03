// @flow
import { Card, Badge } from 'flowbite-react';

const Tools = () : React$Element<any> => {
  return (
    <div className="my-4">
      <Card horizontal={false} className="md:max-w-full mb-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white flex justify-between">
          <div className="flex items-center">
            <h5 className="mr-2"> Billable Time Tracking</h5>
            <Badge color="pink">in progress</Badge>
          </div>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Using <strong
          className="text-indigo-600">Conjure</strong>'s <strong>Time entry</strong> measurement track time you spend on
          tasks for clients and easily create reports.
        </p>
      </Card>

    </div>
  )
}

export default Tools;
