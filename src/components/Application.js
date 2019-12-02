import React from "react";

import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
import useApplicationData from "hooks/useApplicationData.js"
const { getAppointmentsForDay, getInterview, getInterviewersForDay } = require("../helpers/selectors.js");

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const apps = getAppointmentsForDay(state, state.day);
  // console.log(apps);
  const interviewers = getInterviewersForDay(state, state.day)
  const appointmentComponents = apps.map(appointment => {
    return (
      <Appointment 
        key={appointment.id}
        {...appointment} 
        interview={getInterview(state, appointment.interview)} 
        interviewers={interviewers} 
        bookInterview={bookInterview} 
        cancelInterview={cancelInterview}/>
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentComponents}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
