import React from 'react';
import Button from 'react-bootstrap/Button';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";


export class RemoteSafe extends React.Component {

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
                <MDBCardTitle>Safe Injection of Remote Data</MDBCardTitle>
                <MDBCardText>Click button to <b>safely</b> inject content from "{this.props.src}"</MDBCardText>

                <Button onClick={this.onClick}>ClickMe</Button>
                <div className="result">{this.state.injected}</div>
            </MDBCard>
        );
    }


}


