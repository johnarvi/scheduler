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


/*
// what the object returned should look like
{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}
*/

//interview: { student: "Chad Takahashi", interviewer: 2 } // info passed in