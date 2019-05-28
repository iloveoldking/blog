import React from 'react';
import styles from './UserLayout.less';

class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}

export default UserLayout;
