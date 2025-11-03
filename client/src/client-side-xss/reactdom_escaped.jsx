import React from 'react';
import { ReactDomVulnerable } from './reactdom_vulnerable';

export default class ReactDomEscaped extends ReactDomVulnerable {
    onSubmit(event) {
        this.setState({ submittedFormValue: encodeURI(this.state.formValue) });
        event.preventDefault();
    }

    resultDisplay() {
        return (
            <div>
                <div className="result" dangerouslySetInnerHTML={{ __html: this.state.submittedFormValue }} />
            </div>);
    }


    discussion() {
        return (
            <div>
                This uses the property dangerouslySetInnerHTML to inject user input into the DOM. The user input
                is escaped in this case, so the binding is not vulnerable even though the method of injecting
                the input into the DOM is generally not safe.  The binding of the vulnerable value in this case 
                is done indirectly from the base class state to a state value used by the child class.
            </div>
        );

    }
}

