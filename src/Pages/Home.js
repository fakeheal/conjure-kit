// @flow
import { Link } from 'react-router-dom';

const Home = () : React$Element<any> => {
  return (
    <div className="flex flex-col items-center pt-14">
      <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
          Conjure Kit
        </h1>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
          Synchronize data to your <strong className="text-indigo-500">Conjure</strong> account from services like <a
          href="https://rescuetime.com" className="border-b text-gray-800 font-bold">Rescue Time</a>, <a
          href="https://trak.tv" className="border-b text-gray-800 font-bold">trakt.tv</a>.
          <br/>
          <br/>
          Additionally, there are <a href="/tools" className="border-b text-gray-800 font-bold">Tools</a> that are built on top of <strong className="text-indigo-500">Conjure</strong>.
        </p>
      </div>
      <div className="flex justify-center items-center">

        <Link to="/get-started">
          <button
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-lg lg:font-bold  rounded text-white px-4 sm:px-4 border border-indigo-700 py-2 sm:py-2 text-sm">
            Get Started
          </button>
        </Link>
        <Link to="/integrations">
          <button
            className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-lg lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-4 py-2 sm:py-2 text-sm">
            Integrations
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home;
