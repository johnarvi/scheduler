//import Appointment from "components/Appointment"
// how to call the above in other files

import React from "react";
import useVisualMode from "hooks/useVisualMode.js"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";


import "components/Appointment/styles.scss";
// import Button from "components/Button";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "Are you sure you would like to delete?";
  console.log("props.interview", props.interview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  console.log("---------------------App Props", props);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
    
  };

  function deleteApp () {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY))
  };
  
  return (
  <article className="appointment">
    <Header time = {props.time}/>
    {mode === EMPTY && <Empty onAdd={ () => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview && props.interview.student}
        interviewer={props.interview && props.interview.interviewer}
        onDelete = {() => transition(CONFIRM)}
        // onEdit = {editApp}
      />
    )}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave = {save}
      />
    )}
       {mode === SAVING && (
      <Status
        message = {SAVING}
      />
    )}
      {mode === DELETING && (
      <Status
        message = {DELETING}
      />
    )}
        {mode === CONFIRM && (
      <Confirm
        message = {CONFIRM}
        onCancel = {() => back()}
        onConfirm = {deleteApp}
      />
    )}
    
  </article>
  );
}
