import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
const getAppointmentsForDay = require("/home/johnarvi/lighthouse/scheduler/src/helpers/selectors.js");
const axios = require("axios");

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Dudes",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "another dude",
      interviewer: {
        id: 5,
        name: "Sven Jones", 
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  }
];


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  // const appointments = getAppointmentsForDay(state, state.Day);
  const appointmentComponents = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
    ]).then((all) => {
      setState(prev => ({ days: all[0], appointments: all[1]}));
      console.log(all[0]);
      console.log(all[1]);
    
      // const [first, second ] = all;
    
      // console.log(first, second);
    });
    // axios
    //   .get("api/days").then((response) => {
        //setDays(response.data);
    // })
  }, []); 

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
