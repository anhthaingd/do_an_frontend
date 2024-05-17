import React from "react";
import "../Css/machineTimeline.css";

const MachineTimeline = () => {
    const renderEvent = (event, defaultAttributes, styles) => {
      return (
        <div {...defaultAttributes} title={event.name} key={event.id}>
          <span className={styles.event_info}>{event.name}</span>
          <span className={styles.event_info}>
            {event.startTime.toLocaleTimeString()} - {event.endTime.toLocaleTimeString()}
          </span>
        </div>
      );
    };

  return (
    <div>
      <p>a</p>
      
    </div>
  );
};

export default MachineTimeline;
