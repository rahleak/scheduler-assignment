import React from "react";
import { PropTypes } from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  const { interviewers, onChange, interviewer, value } = props;

  function listOfInterviewers () {
    
    return (
      <ul className="interviewers__list">
        {interviewers.map((item) => <InterviewerListItem 
        key={item.id}
        name={item.name}
        avatar={item.avatar} 
        selected={item.id === value}
        setInterviewer={() => onChange(item.id)}  
        interviewer={interviewer}
        />)}
      </ul>
    );
  }

   let items = listOfInterviewers();
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    {items}
  </section>
  )
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
