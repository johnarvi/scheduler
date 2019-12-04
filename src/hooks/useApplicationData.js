import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

/**
 * useApplicationData - uses a reducer with a dispatch to change the day, days, appointments and interviewers based on user selection
 */
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

  /**
   * bookInterview - makes a put request to update the data and add an interview 
   * @param {number} id 
   * @param {object} interview 
   */
  function bookInterview(id, interview) {
    return axios.put("/api/appointments/" + id, {interview})
      .then(() => dispatch({type: SET_INTERVIEW, id, interview}))
  }
  /**
   * cancelInterview - makes a delete request to update the data and set the interview slot to null
   * @param {number} id 
   */
  function cancelInterview(id) {
    return axios.delete("/api/appointments/" + id)
      .then(() => dispatch({type: SET_INTERVIEW, id, interview: null}))
      
  }

  return { state, setDay, bookInterview, cancelInterview }
}
