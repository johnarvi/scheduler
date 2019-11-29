import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
// import { cloneWithoutLoc } from "@babel/types";
const { getAppointmentsForDay, getInterview, getInterviewersForDay } = require("../helpers/selectors.js");
const axios = require("axios");

export default function Application(props) {

  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put("/api/appointments/" + id, {interview})
      .then(() => setState({...state, appointments}))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete("/api/appointments/" + id)
      .then(() => setState({...state, appointments}))
  }

  // returns the appointment component for the day
  const apps = getAppointmentsForDay(state, state.day);
  console.log(apps);
  const appointmentComponents = apps.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day)
    return (
      <Appointment 
        key={appointment.id}
        {...appointment} 
        interview={interview} 
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
