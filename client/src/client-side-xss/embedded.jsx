import React from 'react';


function InnerElement(props) {
    const script = "<div onMouseOver=\"".concat(props.embeddedScript, "\">HOVER HERE TO INVOKE EMBEDDED SCRIPT</div>");

    return (
        <div>
            <div className="result" dangerouslySetInnerHTML={{ __html: script }} />
            <div dangerouslySetInnerHTML={{ __html: props.genericInput }} />
        </div>
    );
}


export function EmbeddedRenderingFunc(props) {

    // There should be flow from "script" to dangerouslySetInnerHtml
    const script = "alert('an embedded script is running');";

    return (
        <InnerElement embeddedScript={script} genericInput={props.genericInput} />
    );

}


export class EmbeddedRenderingClass extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.script = props.script;
    }

    render() {
        return (
            <InnerElement embeddedScript={this.script} genericInput={this.props.genericInput} />
        );

    }
}

export class EmbeddedDerivedRenderingClassWithCtor extends EmbeddedRenderingClass {
    constructor(props) {
        super(props);
        this.foo = props.script;
    }

    render() {
        return (
            <InnerElement embeddedScript={this.foo} genericInput={this.props.genericInput} />
        );

    }
}

export class EmbeddedDerivedRenderingClassWithoutCtor extends EmbeddedRenderingClass {

    render() {
        return (
            <InnerElement embeddedScript={this.script} genericInput={this.props.genericInput} />
        );

    }
}

