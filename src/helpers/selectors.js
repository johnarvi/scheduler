export function getAppointmentsForDay(state, day){
  if (state.days.length < 1) {
    return [];
  }
  const dayAppointments = state.days.find(obj => obj.name === day)
  return (!dayAppointments || dayAppointments.appointments.length < 1 ) ? [] : dayAppointments.appointments.map(appID => appID = state.appointments[appID]);
}


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


export function getInterviewersForDay(state, day){
  if (state.days.length < 1) {
    return [];
  }
  const interviews = state.days.find(obj => obj.name === day);
  return (!interviews || interviews.interviewers.length < 1 ) ? [] : interviews.interviewers.map(ID => ID = state.interviewers[ID]).filter((e, i, arr) => arr.indexOf(e) === i);
}
