import React from "react";
import 'components/DayListItem.scss';
import classNames from "classnames";
import { useApplicationData } from "hooks/useApplicationData";

export default function DayListItem(props) {

  const { formatSpots } = useApplicationData();

  const spotsLeft = formatSpots(props.spots)

  const dayClass = classNames({
    "day-list__item": props.name,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })
  
  return (
    <li className={dayClass} data-testid={props.name}
    onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotsLeft}</h3>
    </li>
  );
}