// @flow
import { Card, Badge } from 'flowbite-react';

const Tools = () : React$Element<any> => {
  return (
    <div className="my-4">
      <Card horizontal={false} className="md:max-w-full mb-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white flex justify-between">
          <div className="flex items-center">
            <h5 className="mr-2"> Billable Time Tracking</h5>
            <Badge color="green">completed</Badge>
          </div>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Using <strong
          className="text-indigo-600">Conjure</strong>'s <strong>Time entry</strong> measurement track time you spend on
          tasks for clients and easily create reports.
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/fakeheal/conjure-kit#billable-time-tracking-preview"
               className="border-b text-gray-800 font-bold">How to use</a>
            <a href="https://i.imgur.com/q3uFEJd.png" className="border-b text-gray-800 font-bold">Preview</a>
          </div>
        </p>
      </Card>

    </div>
  )
}

export default Tools;
