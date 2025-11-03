
import { MDBCard, MDBCardTitle, MDBCardText } from "mdbreact";


export default function VulnerableRenderFunction(props) {
    return (
        <MDBCard className="card-body">
            <MDBCardTitle>VulnerableRenderFunction Output {props.iteration}</MDBCardTitle>
            <MDBCardText>
                --&gt;<div dangerouslySetInnerHTML={{ __html: props.injectable }} />&lt;--
            </MDBCardText>
        </MDBCard>
    );


}