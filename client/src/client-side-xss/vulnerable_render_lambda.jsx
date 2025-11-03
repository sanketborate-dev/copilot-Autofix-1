
import { MDBCard, MDBCardTitle, MDBCardText } from "mdbreact";


let VulnerableRenderLambda = (props) => {
    return (
        <MDBCard className="card-body">
            <MDBCardTitle>VulnerableRenderFunction Output {props.iteration}</MDBCardTitle>
            <MDBCardText>
                --&gt;<div dangerouslySetInnerHTML={{ __html: props.injectable }} />&lt;--
            </MDBCardText>
        </MDBCard>
    );
}

export default VulnerableRenderLambda;