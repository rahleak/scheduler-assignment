import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { day, days, setDay } = props

  function parsedDays () {
    
    return (
      days.map((item) => <DayListItem 
        key={item.id}
        name={item.name}
        day={item.day} 
        spots={item.spots} 
        selected={item.name === day}
        setDay={setDay}  
      />
      )
    )
  }
   let items = parsedDays();

  return (
    <ul>
      {items}
    </ul>
  )
}