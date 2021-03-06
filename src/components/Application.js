import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { 
  getAppointmentsForDay, 
  getInterview, 
  getInterviewersForDay 
} from "helpers/selectors";
import "components/Application";
import "components/Application.scss";
import { useApplicationData } from "hooks/useApplicationData"



export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    setDays
  } = useApplicationData();


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);


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
          {
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          }
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          dailyAppointments && dailyAppointments.map((appointment) => {
            let interview = getInterview(state, appointment.interview);

            return (
              <Appointment
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
                interviewers={dailyInterviewers}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
                setDays={setDays}
              />
            )
          })
        }
        <Appointment
                key={"last"}
                time={"5pm"}
              />
      </section>
    </main>
  );
}
