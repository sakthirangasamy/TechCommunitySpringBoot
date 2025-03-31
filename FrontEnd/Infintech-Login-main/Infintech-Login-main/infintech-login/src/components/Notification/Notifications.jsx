import React from 'react';
import '../../components/Global.css'
import avatar from '../../images/OIP.jpg';

const Notifications = () => {
  const notifications = [
    { id: 1, type: 'mention', user: 'Jane Smith', message: 'mentioned you in a post.', time: '2 mins ago', avatar: '/path/to/avatar1.jpg' },
    { id: 2, type: 'comment', user: 'Mike Johnson', message: 'commented on your project.', time: '10 mins ago', avatar: '/path/to/avatar2.jpg' },
    { id: 3, type: 'badge', user: 'System', message: 'You earned a "Community Helper" badge!', time: '1 day ago', avatar: '/path/to/badge-icon.png' },
    { id: 4, type: 'like', user: 'Sarah Lee', message: 'liked your post.', time: '3 hours ago', avatar: '/path/to/avatar3.jpg' },
    { id: 5, type: 'follow', user: 'David Kim', message: 'started following you.', time: '5 hours ago', avatar: '/path/to/avatar4.jpg' },
    { id: 6, type: 'mention', user: 'Jane Smith', message: 'mentioned you in a post.', time: '2 mins ago', avatar: '/path/to/avatar1.jpg' },
    { id: 7, type: 'comment', user: 'Mike Johnson', message: 'commented on your project.', time: '10 mins ago', avatar: '/path/to/avatar2.jpg' },
    { id: 8, type: 'badge', user: 'System', message: 'You earned a "Community Helper" badge!', time: '1 day ago', avatar: '/path/to/badge-icon.png' },
    { id: 9, type: 'like', user: 'Sarah Lee', message: 'liked your post.', time: '3 hours ago', avatar: '/path/to/avatar3.jpg' },
    { id: 10, type: 'follow', user: 'David Kim', message: 'started following you.', time: '5 hours ago', avatar: '/path/to/avatar4.jpg' }
  ];

  return (
    <section className="notifications">
      <h2 className="notifications__title">Notifications</h2>
      <ul className="notifications__list">
        {notifications.map((notification) => (
          <li key={notification.id} className={`notification__item notification__item--${notification.type}`}>
            <img src={avatar} alt={`${notification.user} avatar`} className="notification__avatar" />
            <div className="notification__content">
              <span className="notification__user">{notification.user}</span> {notification.message}
              <div className="notification__time">{notification.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Notifications;
