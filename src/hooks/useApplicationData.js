import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

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
  }

  function cancelInterview(id) {
    return axios.delete("/api/appointments/" + id)
      .then(() => dispatch({type: SET_INTERVIEW, id, interview: null}))
      
  }

  return { state, setDay, bookInterview, cancelInterview }
}
