import React from 'react';

/* don't edit this */

export default ({ onIsOnlineChange }) => (
  <div>
    <button className="controlBtn" onClick={() => onIsOnlineChange(true)}>
      Online
    </button>
    <button className="controlBtn" onClick={() => onIsOnlineChange(false)}>
      Offline
    </button>
  </div>
);
