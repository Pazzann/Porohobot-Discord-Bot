import React, {Fragment} from "react";
import TextImg from "../components/simpleText_Img";
import NewsImg from "../img/news.svg";
import {Paragraph} from "../components/paragraph";

export function Home() {
    let news: string = `Публікуйте новини з телеграм каналів до вибранних каналів! Більше у dashboard...`;
    let music: string = `Прослуховувайте найкращі українські хіти! Подрібніше про плейлійсти у підрозділі зліва...`;
    return (
        <Fragment>
            <main>
                <section>
                    <TextImg imgid="news" img={NewsImg} paragraph={<Paragraph title="НОВИНИ!" text={news} />} />
                    <TextImg imgid="music" img={NewsImg} paragraph={<Paragraph title="МУЗИКА!" text={music} />} />
                </section>
            </main>
        </Fragment>
    )
}

