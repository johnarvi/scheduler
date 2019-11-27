import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
const { getAppointmentsForDay, getInterview } = require("../helpers/selectors.js");
const axios = require("axios");

export default function Application(props) {

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // axios doesnt not need another promise. resolve as it already is a promise
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(([days, appointments, interviewers]) => {
      setState(prev => {
        return ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data})
      });
    });
    }, []);

    console.log(setState);
    const apps = getAppointmentsForDay(state, state.day);
    console.log(apps);
    const appointmentComponents = apps.map(appointment => {
      const interview = getInterview(state, appointment.interview);
      return (
        <Appointment key={appointment.id} {...appointment} interview={interview} />
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
        {/* {console.log(state.interviewers)} */}
        {appointmentComponents}
        {/* <Appointment key="last" time="5pm" /> */}
      </section>
    </main>
  );
};
