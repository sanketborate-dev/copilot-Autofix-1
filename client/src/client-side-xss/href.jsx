import React from 'react';
import ClientSideXSSBase from './client-side-xss.jsx'

export class Href extends ClientSideXSSBase {

    constructor(props) {
        super(props);
        this.state = {};

    }

    onSubmit(event) {
        this.setState({ href: this.state.formValue });
        event.preventDefault();
    }


    discussion() {
        return (
            <p>
                This changes the href on an anchor.  This can redirect to a potentially vulnerable site or execute
                a script in response to the user clicking the link.
                <p>
                    Try pasting "javascript: alert("hi");" in the box, click submit, then click the link.
                </p>
            </p>

        );
    }

    resultDisplay() {
        // Note there is no DOM injection here.  Future versions of React are supposedly going to
        // block this assignment.  For now, the value is not sanitized by the React framework.
        return (
            <div>
                <a className="result" href={this.state.href}>ClickMe</a>
                <div dangerouslySetInnerHTML={{ __html: this.props.genericInput }} />
            </div>);
    }
}

