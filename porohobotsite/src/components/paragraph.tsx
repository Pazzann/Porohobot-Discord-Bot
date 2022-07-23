import {Fragment} from "react";


export function Paragraph(props: any){

    return (
        <Fragment>
            <h1 className="title main">{props.title}</h1>
            <p className="undertext additional">{props.text}</p>
        </Fragment>
    );
}