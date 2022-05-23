import { Card, Badge } from 'flowbite-react';
import rescueTimeLogo from '../assets/images/rescuetime.png';
import traktTvLogo from '../assets/images/trakttv.png';

export default function () {
  return (
    <div className="my-4">
      <Card horizontal={false} className="md:max-w-full mb-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white flex justify-between">
          <div className="flex items-center">
            <h5 className="mr-2"> Rescue Time</h5>
            <Badge color="pink">in progress</Badge>
          </div>
          <img src={rescueTimeLogo} alt="Rescue Time Logo" className="w-14" />
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          RescueTime provides personal time management and productivity software that shows you how you spend your time
          and gives you tools to help build habits.
        </p>
      </Card>
      <Card horizontal={false} className="md:max-w-full mb-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white flex justify-between">
          <div className="flex items-center">
            <h5 className="mr-2"> Trakt.tv</h5>
            <Badge color="pink">in progress</Badge>
          </div>
          <img src={traktTvLogo} alt="Trakt.tv Logo" className="w-14" />
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          TV Show Tracker is the best way to manage your TV shows & movies on phone or tablet - seasons, details, casts
          and much more!
        </p>
      </Card>
    </div>
  )
}
