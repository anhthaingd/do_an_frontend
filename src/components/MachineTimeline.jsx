import React from "react";
import TimeTable from "react-timetable-events";
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
      <TimeTable
        timeLabel="Machines"
        // renderEvent={renderEvent}
        events={{
          "MKT-WKS-0031": [
            {
              id: 1,
              name: "",
              type: "custom",
              startTime: new Date("2021-11-23T11:30:00"),
              endTime: new Date("2021-11-23T13:30:00"),
            },
            {
              id: 2,
              name: "",
              type: "custom",
              startTime: new Date("2021-11-23T13:31:00"),
              endTime: new Date("2021-11-23T14:30:00"),
            },
          ],
          "FILE-SRV-003": [
            {
              id: 1,
              name: "",
              type: "custom",
              startTime: new Date("2021-11-23T11:40:00"),
              endTime: new Date("2021-11-23T13:45:00"),
            },
          ],
        }}
        hoursInterval={{ from: 9, to: 18 }}
      />
      <p>a</p>
    </div>
  );
};

export default MachineTimeline;
