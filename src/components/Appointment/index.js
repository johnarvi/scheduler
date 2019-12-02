//import Appointment from "components/Appointment"
// how to call the above in other files

import React from "react";
import useVisualMode from "hooks/useVisualMode.js";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


import "components/Appointment/styles.scss";
// import Button from "components/Button";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "Are you sure you would like to delete?";
  const EDIT = "EDIT";
  const ERROR_DELETE = "Could not delete appointment";
  const ERROR_SAVE = "Could not save appointment";
  const ERROR_APPOINTMENT = "Please fill in the student name and select an interviewer";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    if (!name || !interviewer) {
      transition(ERROR_APPOINTMENT)
    } else {
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    }
    
  };

  function deleteApp () {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
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
        onEdit = {() => transition(EDIT)}
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
    {mode === EDIT && (
      <Form
        name = {props.interview && props.interview.student}
        interviewer={props.interview.interviewer && props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave = {save}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
        message = {ERROR_DELETE}
        onClose={() => back()}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error
        message = {ERROR_SAVE}
        onClose={() => back()}
      />
    )}
    {mode === ERROR_APPOINTMENT && (
      <Error
        message = {ERROR_APPOINTMENT}
        onClose={() => back()}
      />
    )}
  </article>
  );
}
