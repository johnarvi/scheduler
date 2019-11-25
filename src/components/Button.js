import React from "react";
import classnames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   // classnames library - if value (key) = true then apply the values (coressponding to the key value pair)
   const buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });

   // adds an onClick and a disabled prop to the Button component.
   return (
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
 }
 
