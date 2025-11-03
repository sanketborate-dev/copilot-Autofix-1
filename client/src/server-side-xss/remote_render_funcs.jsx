import React from 'react';



export function UnsafeRenderFunc(props) {
    return (
        <div>
            Unsafe: <div className="result" dangerouslySetInnerHTML={{ __html: props.val }} />
            <div dangerouslySetInnerHTML={{__html: props.genericInput}}/>
        </div>
    );
}


export function SafeRenderFunc(props) {
    return (

        <div>
            Safe: <div className="result">{props.val}</div>
        </div>
    );
}

