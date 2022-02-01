export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;

  let filteredAppointment = days.filter(dayz => dayz.name === day);
  filteredAppointment = filteredAppointment[0]
  
  if(!filteredAppointment) {
    return [];
  }

  const { appointments: appArray } = filteredAppointment
  let arr = [];

  for (const id of appArray) {
    arr.push(appointments[id])
  }

  return arr;

}

export function getInterview(state, interview) {
  const { interviewers } = state;
  console.log(interview);


  if (interview) {
    const interviewerID = interview.interviewer && interview.interviewer.toString()
    const obj = {
      "student": interview.student,
      "interviewer": interviewers[interviewerID]
    };
    return obj;
  }

  return null;

}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;

  let filteredAppointment = days.filter(dayz => dayz.name === day);
  filteredAppointment = filteredAppointment[0]
  
  if(!filteredAppointment) {
    return [];
  }

  const { interviewers: appArray } = filteredAppointment
  let arr = [];

  for (const id of appArray) {
    arr.push(interviewers[id])
  }

  return arr;

}