import React from 'react';
import Button from 'react-bootstrap/Button';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

export class RemoteUnsafe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        fetch('http://localhost:9000/inject')
            .then(response => response.text())
            .then(body => this.setState({ injected: body }))
            .catch(this.setState({ injected: "Unable to reach remote service." }));
    }

    render() {

        return (
            <MDBCard className="card-body">
                <MDBCardTitle>Unsafe Injection of Remote Data</MDBCardTitle>
                <MDBCardText>Click button to unsafely inject content from "{this.props.src}"</MDBCardText>

                <Button onClick={this.onClick}>ClickMe</Button>
                <div className="result" dangerouslySetInnerHTML={{ __html: this.state.injected }} />
                <div dangerouslySetInnerHTML={{__html: this.props.genericInput}} />
            </MDBCard>
        );
    }


}


