import React from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import OnlineStatusMock from './OnlineStatusMock';
import './App.css';

/* 
Feel free to edit this all. If you don't need the HoC, go remove it. 
If you wish to save the state somewhere else, go for it. 
Just keep rendering <OnlineStatusMock /> 
*/

const withOnlineStatus = WrappedComponent =>
  class WithOnlineStatus extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isOnline: false };
      this.quickDisconnectMS = 2000;
      this.lastTimeOffline = null;
      this.offlineTimer = null;
    }

    setOffline = () => {
      this.offlineTimer = null;
      // Since offline notifications are deferred, we have to check duplication right before setState too, 
      // because we cannot know isOnline state in future
      if (!this.state.isOnline) return; // Skip duplications
      this.setState({ isOnline: false });
    }

    onIsOnlineChange = nextIsOnline => {
      const { isOnline } = this.state;
      const now = Date.now();
      if (nextIsOnline && this.lastTimeOffline && now - this.lastTimeOffline < this.quickDisconnectMS) {
        // Quick disconnect happened
        clearTimeout(this.offlineTimer) // Cancel deferred offline notification
        this.offlineTimer = null;
        return; // Skip, because it's already online
      }
      if (nextIsOnline && !isOnline) {
        this.setState({ isOnline: true }); // Switch to online, skipping duplications
      } else if (!nextIsOnline && isOnline) {
        if (this.offlineTimer) clearTimeout(this.offlineTimer); // Clear previous deferred offline switch, if exists
        this.offlineTimer = setTimeout(this.setOffline, this.quickDisconnectMS); // Set new deferred switch to offline
        this.lastTimeOffline = now;
      }
    }

    render() {
      return (
        <>
          <OnlineStatusMock onIsOnlineChange={this.onIsOnlineChange} />
          <WrappedComponent {...this.props} isOnline={this.state.isOnline} />
        </>
      );
    }
  };

class App extends React.Component {
  componentDidUpdate() {
    NotificationManager.info(this.props.isOnline ? 'Online' : 'Offline');
  }

  render() {
    const { isOnline } = this.props;
    return (
      <>
        <div className={isOnline ? 'online' : 'offline'}>
          {isOnline ? 'Online' : 'Offline'}
          <NotificationContainer />
        </div>
      </>
    );
  }
}

export default withOnlineStatus(App);
