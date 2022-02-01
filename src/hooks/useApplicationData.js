import { useState, useEffect } from 'react';
import axios from "axios";

export function useApplicationData(params) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: []
  });

  const setDay = (day) => {
    setState(state => ({ ...state, day }));
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments: appointments
    });
    if (interview) {
      return (axios
        .put(`http://localhost:8001/api/appointments/${id}`, {
        interview
      })
        .then((res) => {
          console.log(res);
          setState({
            ...state,
            appointments: appointments,
            days: updateSpots(appointments)
          })
        }
        )
        
      )
    }
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      [id]: {
        ...state.appointments[id],
        interview: null
      }
    })
    if (id) {
      return axios
        .delete(`http://localhost:8001/api/appointments/${id}`)
        .then((res) => {
          console.log(res);
          setState({
            ...state,
            interview: null,
            days: updateSpots(appointments)
          })
        })
        
      }
    }

    function formatSpots(spots) {
      if (spots === 0) return  "no spots remaining";
      if (spots === 1) return `1 spot remaining`;
      if (spots > 1) return `${spots} spots remaining`;
    }

    function updateSpots(appointments) {
    //   // setState()
      const newDays = [...state.days]

      for (const day of newDays) {
        if (day.name === state.day) {
          let count = 0;
          for (const id of day.appointments) {
            if (!appointments[id].interview) {
              count ++
            }
          }
          day.spots = count
        }
      }
      return newDays;
    }

    useEffect(() => {

      Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")
      ]).then((all) => {
        const [days, appointments, interviewers] = all;
        setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
  
  
      })
    }, [state.day])

    return { state, setDay, bookInterview, cancelInterview, formatSpots }
}