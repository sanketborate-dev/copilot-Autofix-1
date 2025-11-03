import ClientSideXSSBase from './client-side-xss.jsx'
import React from 'react';

export class ReactDomVulnerable extends ClientSideXSSBase {
    onSubmit(event) {
        this.setState({ submittedFormValue: this.state.formValue });
        event.preventDefault();
    }

    resultDisplay() {
        return (
            <div>
                <div className="result" dangerouslySetInnerHTML={{ __html: this.state.submittedFormValue }} />
                <div dangerouslySetInnerHTML={{ __html: this.props.genericInput }} />
            </div>);
    }


    discussion() {
        return (
            <div>
                This uses the property dangerouslySetInnerHTML to inject user input into the DOM.  This is similar to
                the use of the document DOM but uses React's capabilities to inject untrusted content.  The binding
                of the vulnerable value in this case is done indirectly from the base class state to a state
                value used by the child class.
            </div>
        );

    }
}

