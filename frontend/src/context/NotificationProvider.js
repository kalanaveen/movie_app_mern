import React, { createContext } from 'react';

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const updateNotification = () => {};

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      <div className="fixed left-1/2 -translate-x-1/2 top-24 ">
        <div className="shadow-md shadow-gray-400 rounded bg-red-400 bounce-custom">
          <p className="text-white px-4 py-2 font-semibold">
            something Went Wrong
          </p>
        </div>
      </div>
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
