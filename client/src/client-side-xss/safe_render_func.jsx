
import { MDBCard, MDBCardTitle, MDBCardText } from "mdbreact";


export default function SafeRenderFunction(props)
{

    return (
          <MDBCard className="card-body">
            <MDBCardTitle>SafeRenderFunction Output {props.iteration}</MDBCardTitle>
            <MDBCardText>
                --&gt;{props.injectable}&lt;--
            </MDBCardText>
          </MDBCard>
    );


}