import { MDBContainer } from 'mdbreact';
import React from 'react';
import ClientSideXSSBase from './client-side-xss.jsx'
import SafeRenderFunction from './safe_render_func.jsx'
import VulnerableRenderFunction from './vulnerable_render_func.jsx'
import SafeRenderLambda from './safe_render_lambda.jsx'
import VulnerableRenderLambda from './vulnerable_render_lambda.jsx'


export default class Logical extends ClientSideXSSBase {


    constructor(props) {
        super(props);

        this.state = { ...this.state, displayQ: '2', show: false };

        this.onChangeLike = this.onChangeLike.bind(this);
    }

    onChangeLike(event) {
        this.setState({ like: event.target.value });
    }

    onChange(event) {
        switch (event.target.id) {
            case "injectable":
                super.onChange(event);
                break;

            case "quantity":
                this.setState({ displayQ: event.target.value });
                break;

            case "show":
                this.setState({ show: true });
                break;

            case 'hide':
                this.setState({ show: false });
                break;
        }
    }


    resultDisplay() {

        // Vulnerable inputs that are used in logic should not result in a vulnerable flow.

        if (this.state.show) {

            let gen = Array(parseInt(this.state.displayQ)).fill().map((_, index) => index + 1);

            let humans;
            let cats;

            humans = <iframe class="result" src="https://thispersondoesnotexist.com/" />
            cats = <iframe id="catframe" class="result" src="https://thiscatdoesnotexist.com/" style={{ width: "100%", height: "100%" }} />

            let extra = this.state.like == "cats" ? cats : this.state.like == "humans" ? humans : this.state.like == "both" ? [humans, cats] : null

            return (
                <>
                    {gen.map((x) => {
                        return (
                        <MDBContainer className="result">
                            <SafeRenderFunction injectable={this.state.formValue} iteration={x} />
                            <VulnerableRenderFunction injectable={this.state.formValue} iteration={x} />
                            <SafeRenderLambda injectable={this.state.formValue} iteration={x} />
                            <VulnerableRenderLambda injectable={this.state.formValue} iteration={x} />
                        </MDBContainer>
                        );
                    })}

                    {extra}
                </>
            );
        }
    }



    discussion() {
        return (
            <div>
                This component will use logic and call different types of renderers.  The use of untrusted inputs/outputs in
                logic executed in the renderer should not trigger a vulnerability result.  Untrusted inputs/outputs found
                in the return statement of the renderer should trigger vulnerability results if unsanitized.
                <div>
                    <br/>
                    Paste <code>&lt;img src="n.jpg" onerror="alert(1)" /&gt;</code> in the injectable value input
                    to demonstrate how this works.  Set the display quantity to cause several components to be created.
                </div>
            </div>
        );
    }


    renderInput() {
        return (
            <form onSubmit={this.onSubmit}>
                <div class="radio_display">
                    <div>
                        <input type="radio" id="hide" name="view" onChange={this.onChange} checked={!this.state.show} />
                        <label for="hide">Hide Components</label>
                    </div>
                    <div>
                        <input type="radio" id="show" name="view" onChange={this.onChange} />
                        <label for="show">Show Components</label>
                    </div>
                </div>
                <div>
                    <label>Injectable Value: </label>
                    <input id="injectable" type="text" value={this.state.formValue} onChange={this.onChange} />
                </div>
                <div>
                    <label>Display Quantity: </label>
                    <input id="quantity" type="text" value={this.state.displayQ} onChange={this.onChange} />
                </div>
                <div>
                    <label>In the box below, type "cats" if you like cats, "humans" if you like humans, or "both" if you like both. </label>
                    <br />
                    <input id="like" type="text" value={this.state.like} onChange={this.onChangeLike} />
                </div>
            </form>
        );
    }
}

