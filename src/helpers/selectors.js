export function getAppointmentsForDay(state, day){
  if (state.days.length < 1) {
    return [];
  }
  const dayAppointments = state.days.find(obj => obj.name === day).appointments
  return (!dayAppointments || dayAppointments.length < 1 ) ? [] : dayAppointments.map(appID => appID = state.appointments[appID]);
}
