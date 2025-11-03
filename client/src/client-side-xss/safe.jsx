import React from 'react';
import ReactDOM from 'react-dom';
import ClientSideXSSBase from './client-side-xss.jsx'

export class Safe extends ClientSideXSSBase {
    onSubmit(event) {
        ReactDOM.hydrate(this.state.formValue, this.divRef.current);
        event.preventDefault();
    }

    discussion ()
    {
        return (
            
            <div>
            This component binds using React, which escapes the content.  
            Use the developer tools to view the results content and choose "Edit as HTML" to view the escaped content.
            </div>

            );
    }
}

