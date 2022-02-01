import React from "react";

import 'components/InterviewerListItem.scss';
import classNames from "classnames";

export default function InterviewerListItem(props) {
  
  const { name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  function isSelected () {
    return (selected && name)
  }

  const nameSelected = isSelected();
  return (
  <li 
    onClick={setInterviewer}
    className={interviewerClass}
  >
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {nameSelected}
</li>
  )
}