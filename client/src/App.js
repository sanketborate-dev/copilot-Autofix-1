import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { MDBBox, MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
// TODO: 
// The exact extension of the import should not be needed.  Remove to test
// that includes are recognized.
import { Vulnerable } from './client-side-xss/vulnerable.jsx';
import { ReactDomVulnerable } from './client-side-xss/reactdom_vulnerable.jsx';
import { Safe } from './client-side-xss/safe.jsx';
import { Href } from './client-side-xss/href.jsx';
import { QueryParams } from './client-side-xss/queryparams.jsx';
import {
  EmbeddedRenderingFunc,
  EmbeddedRenderingClass,
  EmbeddedDerivedRenderingClassWithoutCtor,
  EmbeddedDerivedRenderingClassWithCtor 
} from './client-side-xss/embedded.jsx';
import { RemoteUnsafe } from './server-side-xss/remote_unsafe.jsx';
import { RemoteSafe } from './server-side-xss/remote_safe.jsx';
import { UnsafeRenderFunc, SafeRenderFunc } from "./server-side-xss/remote_render_funcs.jsx";
import Logical from "./client-side-xss/logical.jsx"
import ReactDomEscaped from "./client-side-xss/reactdom_escaped"

const serverMsg = "Server is unavailable.  (Did you start the api project?)";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchData = this.fetchData.bind(this);
  }

  fetchEval(event) {
    fetch('http://localhost:9000/inject/eval')
      .then(response => response.text())
      .catch(() => alert(serverMsg))
      .then(body => eval(body));

  }

  fetchData(event) {
    fetch('http://localhost:9000/inject')
      .then(response => response.text())
      .catch(() => serverMsg)
      .then(body => this.setState({ injected: body }));
  }


  render() {
    return (

      <div>
        <MDBBox className="pageHeader"><h1><b>Examples for Vulnerabilities and Data Flows using React</b></h1></MDBBox>

        <MDBContainer>

          <MDBCard className="card-body">
            <MDBCardTitle>Generic Input</MDBCardTitle>
            <MDBCardText>
              Place a value in the input below.  The state of it is maintained in the root
              component and passed through props to contained components.  The value is rendered in
              the contained components without sanitization.  This will demonstrate data flows to
              potentially vulnerable inputs.
            <div>
                <textarea style={{ width: "100%" }} onChange={(event) => this.setState({ genericInput: event.target.value })} />
              </div>
            </MDBCardText>

          </MDBCard>

          <MDBCard className="card-body" >
            <MDBCardTitle>DOM Injection Tests</MDBCardTitle>
            <MDBCardText>
              This type of vulnerability takes an input from the user that could be the definition
              of an element.
            </MDBCardText>
            <MDBCardText>Try pasting "&lt;div onmouseover="alert('hi');"&gt;test&lt;/div&gt;" in each value box,
            submit, then mouse-over the result box.</MDBCardText>

            <Vulnerable headerText="Vulnerable Component (Document DOM Write)" genericInput={this.state.genericInput} />
            <ReactDomVulnerable headerText="Vulnerable Component (React DOM Write)" genericInput={this.state.genericInput} />
            <ReactDomEscaped headerText="Vulnerable Component with Escaping (Not Vulnerable)" genericInput={this.state.genericInput} />
            <Safe headerText="Safe React Component" genericInput={this.state.genericInput} />
          </MDBCard>



          <MDBCard className="card-body">
            <MDBCardTitle>Other Client Injection Tests</MDBCardTitle>
            <Href headerText="Anchor href Injection" genericInput={this.state.genericInput} />
            <QueryParams headerText="Script Injection via Query Parameters" genericInput={this.state.genericInput} />
            <Logical headerText="React Components Using Inputs in Render Logic" genericInput={this.state.genericInput} />
          </MDBCard>


          {
            // No inputs on the "embedded" components but each is embedding a script unsafely.  This is primarly to test data flow.
            // Vulnerable flows would not be expected to be found for these components.
          }
          <MDBCard className="card-body">
            <MDBCardTitle>Embedded Script Tests</MDBCardTitle>
            <MDBCardText>
              These are included for data flow testing purposes only.  Scripts are injected from
              embedded strings, so it is unlikely these would be considered as vulnerabilities due to
              no source data.
            </MDBCardText>

            <EmbeddedRenderingFunc genericInput={this.state.genericInput} />
            <EmbeddedRenderingClass script={"alert('embedded script for a component derived from React.Component');"} genericInput={this.state.genericInput} />
            <EmbeddedDerivedRenderingClassWithCtor script={"alert('embedded script for a component derived from EmbeddedRenderingClass');"} genericInput={this.state.genericInput} />
            <EmbeddedDerivedRenderingClassWithoutCtor script={"alert('embedded script for a component derived from EmbeddedRenderingClass (no ctor)');"} genericInput={this.state.genericInput} />
          </MDBCard>


          <MDBCard className="card-body">

            <MDBCardTitle>Remote Script Injection Tests</MDBCardTitle>
            <MDBCardText>
              These show script data retrieved from a remote server and injected into the DOM.
            </MDBCardText>

            <RemoteUnsafe src="http://localhost:9000/inject" genericInput={this.state.genericInput} />
            <RemoteSafe src="http://localhost:9000/inject" genericInput={this.state.genericInput} />

            <MDBCard className="card-body">
              <MDBCardTitle>Render Element Retrieved from Remote Source</MDBCardTitle>
              <MDBCardText>
                This is rendered as a function.  Click the button to inject remote content.
              </MDBCardText>
              <Button onClick={this.fetchData.bind(this)}>ClickMe!!!</Button>
              <SafeRenderFunc val={this.state.injected} genericInput={this.state.genericInput} />
              <UnsafeRenderFunc val={this.state.injected} genericInput={this.state.genericInput} />
            </MDBCard>

            <MDBCard className="card-body">
              <MDBCardTitle>"eval()" Script Retrieved from Remote Source</MDBCardTitle>
              <MDBCardText>
                Click the button to retrieve and run a script from a remote source.
              </MDBCardText>
              <Button onClick={this.fetchEval.bind(this)}>ClickMe!!!</Button>
            </MDBCard>

          </MDBCard>





        </MDBContainer>
      </div>

    );
  }
}

export default App;
