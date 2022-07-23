import {Fragment} from "react";


export default function TextImg(props: any){


    return (
        <Fragment>
            <div className="textImg">
                <img id={props.imgid} className="img_" src={props.img}/>
                <div className="text_">{props.paragraph}</div>
            </div>
        </Fragment>
    );
}
