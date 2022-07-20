import headerImg from "../img/Header.jpg";
import React, {Fragment} from "react";

export function Home() {
    return (
        <Fragment>
            <section>
                <img className="headerimg" src={headerImg}/>
            </section>


            <main>
                <section>
                    <div>
                        <ul>
                            <span>Команды:</span>
                            <li>/play</li>
                            <li>/skip</li>
                            <li>/queue</li>
                            <li>/shuffle</li>
                        </ul>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

