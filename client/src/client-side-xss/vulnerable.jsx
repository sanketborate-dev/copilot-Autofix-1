import React from 'react';
import ClientSideXSSBase from './client-side-xss.jsx'

export class Vulnerable extends ClientSideXSSBase
{
    onSubmit (event)
    {
        document.getElementById('targetDiv').innerHTML = this.state.formValue;
        event.preventDefault();
    }

    discussion()
    {
        return (
            <div>
                Uses the document DOM to bypass React completely to set the innerHTML value of
                an element.  This directly edits the DOM to add potentially malicious elements.
                The input is managed by React via binding <code>onChange</code> to the text input.  The
                injection occurs on submit when the values in the state are assigned directly
                into the DOM.
            </div>
        );
    }

}

