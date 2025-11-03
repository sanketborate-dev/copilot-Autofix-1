
import { MDBCard, MDBCardTitle, MDBCardText } from "mdbreact";


let SafeRenderLambda = (props) =>
{

    return (
          <MDBCard className="card-body">
            <MDBCardTitle>SafeRenderLambda Output {props.iteration}</MDBCardTitle>
            <MDBCardText>
                --&gt;{props.injectable}&lt;--
            </MDBCardText>
          </MDBCard>
    );


}

export default SafeRenderLambda;
