//import Appointment from "components/Appointment"
// how to call the above in other files

import React from "react";
import useVisualMode from "hooks/useVisualMode.js"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";

import "components/Appointment/styles.scss";
// import Button from "components/Button";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log('--------PROPS----------hit', props);

  return (
  <article className="appointment">
    <Header time = {props.time}/>
    {mode === EMPTY && <Empty onAdd={ () => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        // interviewers={getInterviewersByDay(props, state.day)}
        onCancel={ () => back() }
        // {props.interview.interviewer}
      />
    )}
  </article>
  );
}
