import React, { useCallback, useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications"; // FIXME TS 2307
import "react-notifications/lib/notifications.css";
import OnlineStatusMock from "./OnlineStatusMock";
import "./App.css";

import useDebounce from "./hooks/useDebounce";

const ONLINE = "Online";
const OFFLINE = "Offline";

function App({ isOnline }) {
  const [status, setStatus] = useState(false); // false means OFFLINE
  const isEventDebounced = useDebounce(2000);

  const toggleStatus = useCallback(
    (newStatus) => {
      setStatus(newStatus);
    },
    [setStatus]
  );

  const createNotification = useCallback(
    (isOnline) => {
      NotificationManager.info(status ? ONLINE : OFFLINE);
    },
    [status]
  );

  useEffect(() => {
    isEventDebounced && createNotification(isOnline);
  }, [isEventDebounced, createNotification, isOnline]);

  return (
    <section role="main">
      <OnlineStatusMock
        onIsOnlineChange={(newStatus) => toggleStatus(newStatus)}
      />
      <section
        aria-label="Status Indicator"
        className={status ? ONLINE.toLowerCase() : OFFLINE.toLowerCase()}
      >
        <div aria-label="Status">{status ? ONLINE : OFFLINE}</div>
        <aside>
          <NotificationContainer />
        </aside>
      </section>
    </section>
  );
}

export default App;
