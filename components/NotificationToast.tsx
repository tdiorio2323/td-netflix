import React, { useEffect, useState } from 'react';
import { NotificationEvent } from '../services/notificationService';

interface Props {
  notification?: NotificationEvent;
}

export const NotificationToast: React.FC<Props> = ({ notification }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification || !visible) return null;

  const message =
    notification.type === 'new_comment'
      ? 'New comment received'
      : 'Your post got a new like';

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
};
