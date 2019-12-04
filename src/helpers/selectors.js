/**
 * getAppointmentsForDay - returns an array of interviews for a day
 * @param {object} state 
 * @param {string} day 
 */
export function getAppointmentsForDay(state, day){
  if (state.days.length < 1) {
    return [];
  }
  const dayAppointments = state.days.find(obj => obj.name === day)
  return (!dayAppointments || dayAppointments.appointments.length < 1 ) ? [] : dayAppointments.appointments.map(appID => appID = state.appointments[appID]);
}


/**
 * getInterview - returns an interview slot
 * @param {object} state 
 * @param {object} interview 
 */

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewSelect = {};
  const interviewerID = interview.interviewer;
  interviewSelect.student = interview.student;
  interviewSelect.interviewer = state.interviewers[interviewerID];
  return interviewSelect;
}

/**
 * getInterviewersForDay - returns an array of interviewers woking on a specific day
 * @param {object} state 
 * @param {string} day 
 */

export function getInterviewersForDay(state, day){
  if (state.days.length < 1) {
    return [];
  }
  const interviews = state.days.find(obj => obj.name === day);
  return (!interviews || interviews.interviewers.length < 1 ) ? [] : interviews.interviewers.map(ID => ID = state.interviewers[ID]).filter((e, i, arr) => arr.indexOf(e) === i);
}
