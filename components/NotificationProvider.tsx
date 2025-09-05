import React, { createContext, useContext, useEffect, useState } from 'react';
import { NotificationEvent, notificationService } from '../services/notificationService';
import { NotificationToast } from './NotificationToast';

interface NotificationContextValue {
  notifications: NotificationEvent[];
}

const NotificationContext = createContext<NotificationContextValue>({ notifications: [] });

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationEvent[]>(() => notificationService.getPersisted());

  useEffect(() => {
    notificationService.connect();
    notificationService.subscribe((n) => {
      setNotifications((prev) => [...prev, n]);
    });
  }, []);

  const latest = notifications[notifications.length - 1];

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
      <NotificationToast notification={latest} />
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
