import ClientSideXSSBase from './client-side-xss.jsx'
import React from 'react';

export class QueryParams extends ClientSideXSSBase {
    onSubmit(event) {
        this.setState({ submittedFormValue: this.state.formValue });
        event.preventDefault();
    }

    renderInput() {
        return (

            <div>
                {window.location.search}
            </div>

        );
    }

    componentDidMount() {
        var split = window.location.search.slice(1).split("&");
        var stateContents = "";

        split.forEach((val) => stateContents = stateContents + "<div>" + decodeURIComponent(val) + "</div>")
        this.setState({ submittedFormValue: stateContents });
    }

    resultDisplay() {
        return (
            <div>
                <div className="result" dangerouslySetInnerHTML={{ __html: this.state.submittedFormValue }} />
                <div dangerouslySetInnerHTML={{ __html: this.props.genericInput }} />
            </div>
        );
    }


    discussion() {
        return (
            <div>
                This uses the property dangerouslySetInnerHTML to inject query parameter values into the DOM.  Set the URL
                query parameter to "&lt;div onmouseover=&quot;alert('hi');&quot;&gt;test&lt;/div&gt;"

            </div>
        );

    }
}

