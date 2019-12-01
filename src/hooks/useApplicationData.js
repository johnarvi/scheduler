import { useEffect, useReducer } from "react";
const axios = require("axios");

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {

    case SET_DAY:
      return { ...state, day: action.day }

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW: {
      const { id, interview } = action;

      return {
        ...state,
        appointments: {
          ...state.appointments,
          [id]: {
            ...state.appointments[action.id],
            interview: action.interview ? {...interview} : null
          } 
        }
      }
    }  
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {

  const setDay = day => dispatch({ type: SET_DAY, day });
  const [state, dispatch] = useReducer(reducer, {
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
      dispatch({type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data})
      })
  }, []);

  function bookInterview(id, interview) {
    return axios.put("/api/appointments/" + id, {interview})
      .then(() => dispatch({type: SET_INTERVIEW, id, interview}))
      .then(() => spotsRemaining(state.appointments))
  }

  function cancelInterview(id) {
    return axios.delete("/api/appointments/" + id)
      .then(() => dispatch({type: SET_INTERVIEW, id, interview: null}))
      .then(() => spotsRemaining(state.appointments))
  }

  function spotsRemaining(apptObj) {
    const appointments = Object.keys(apptObj);
    const spotsFilled = appointments.filter(appointment => apptObj[appointment].interview !== null);

    return (spotsFilled && (spotsFilled.length <= 5 || spotsFilled.length >= 0)) ? 5 - spotsFilled.length : "Error";
  }
  return { state, setDay, bookInterview, cancelInterview, spotsRemaining }
}



















// // const setDay = day => setState({ ...state, day });
// // const [state, setState] = useState({
// //   day: "Monday",
// //   days: [],
// //   appointments: {},
// //   interviewers: {}
// // });

// function bookInterview(id, interview) {
//   const appointment = {
//     ...state.appointments[id],
//     interview: { ...interview }
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
//   return axios.put("/api/appointments/" + id, {interview})
//     .then(() => setState({...state, appointments}))
// }

// function cancelInterview(id) {
//   const appointment = {
//     ...state.appointments[id],
//     interview: null
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
  
//   return axios.delete("/api/appointments/" + id)
//   .then(() => setState({...state, appointments}))
// }
// return { state, setDay, bookInterview, cancelInterview}
// }
