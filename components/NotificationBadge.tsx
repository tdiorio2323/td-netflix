import React from 'react';
import { useNotifications } from './NotificationProvider';

export const NotificationBadge: React.FC = () => {
  const { notifications } = useNotifications();
  const count = notifications.length;
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
      {count}
    </span>
  );
};
