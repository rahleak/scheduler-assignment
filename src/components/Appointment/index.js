import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import { useVisualMode } from "hooks/useVisualMode";
import 'components/Appointment/styles.scss'


export default function Appointment(props) {
const { time, interview, interviewers, bookInterview, id, cancelInterview, setDays } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE  = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  

const { mode, transition, back } = useVisualMode(
  interview ? SHOW : EMPTY
);

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer: interviewer
  };

  transition(SAVING);

  bookInterview(id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((err) => {
      console.error(err)
      transition(ERROR_SAVE)
    })
};

function removeInterview() {
  // const replace = true
  transition(DELETING)
  cancelInterview(id)
  .then(() => {
    transition(EMPTY)
    setDays()
  })
  .catch((err) => {
    console.error(err)
    transition(ERROR_DELETE)
  })
}


// function editInterview() {
//   transition
// }

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          />
          )}
      {mode === CREATE && (
        <Form
        interviewers={interviewers}
        onCancel={back}
        onSave={save}
        interview={interview}
        />
        )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === CONFIRM && (
        <Confirm 
        message={"Delete the appointment?"}
        onCancel={back}
        onConfirm={() => {
          removeInterview()
          setDays()
        }}
        />
      )}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === EDIT && (
        <Form 
        student={interview.student}
        interviewers={interviewers}
        interview={interview}
        onSave={save}
        onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message={"Could not create appointment"}
          onClose={() => back(EMPTY)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message={"Could not delete appointment"}
          onClose={() => transition(SHOW)}
        />
      )}
    </article>
  )
}