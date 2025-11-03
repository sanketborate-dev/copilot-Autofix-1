import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";


export default class ClientSideXSSBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = { formValue: '' };

        this.onChange = this.onChange.bind(this);

        this.divRef = React.createRef();

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ formValue: event.target.value });
    }

    onSubmit(event) {

    }

    resultDisplay() {

        return (
            <div>
                <div className="result" ref={this.divRef} id='targetDiv'>&nbsp;</div>
                <div dangerouslySetInnerHTML={{ __html: this.props.genericInput }} />
            </div>);
    }

    discussion() {

    }

    renderInput() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Value: </label>
                <input type="text" value={this.state.formValue} onChange={this.onChange} />
                <input type="submit" value="Submit" />
            </form>
        );

    }

    render() {

        return (
            <MDBContainer>
                <MDBCard className="card-body">

                    <MDBCardTitle>{this.props.headerText}</MDBCardTitle>
                    <MDBCardText>{this.discussion()}</MDBCardText>

                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>Input</th>
                                <th>Result</th>
                            </tr>
                        </MDBTableHead>

                        <MDBTableBody>
                            <tr>
                                <td>
                                    {this.renderInput()}
                                </td>
                                <td>
                                    {this.resultDisplay()}
                                </td>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>

                </MDBCard>
            </MDBContainer>
        );
    }

}

