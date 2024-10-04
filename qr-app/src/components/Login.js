import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Login = () => {
  const { userType } = useParams();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg card-shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{userType.charAt(0).toUpperCase() + userType.slice(1)} Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input type="text" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center mt-6 text-sm">
          Don't have an account? <Link to="#" className="text-blue-500 hover:text-blue-800">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;