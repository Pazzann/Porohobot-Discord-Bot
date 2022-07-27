import React, {Fragment} from "react";
//components
import TextImg from "../components/simpleText_Img";
import {Paragraph} from "../components/paragraph";
//images
import NewsImg from "../img/discord_news.png";
import MusicImg from "../img/discord_music.png";

export function Home() {
    let news: string = `Публікуйте новини з телеграм каналів до вибранних каналів! Більше у dashboard...`;
    let music: string = `Прослуховувайте найкращі українські хіти! Подрібніше про плейлійсти у підрозділі зліва...`;
    let game: string = `Гра в найбільший маленький друг серед серверами, спробуйте...`;
    let another: string = `Та інші команди про які ви дізнаєтесь через /help ...`;
    return (
        <Fragment>
            <main>
                <section>
                    <TextImg imgid="news" img={NewsImg} paragraph={<Paragraph title="НОВИНИ!" text={news}/>}/>
                    <TextImg imgid="music" img={MusicImg} paragraph={<Paragraph title="МУЗИКА!" text={music}/>}/>
                    <TextImg imgid="game" img={NewsImg} paragraph={<Paragraph title="ДИВНА ГРА..." text={game}/>}/>
                    <TextImg imgid="another" img={NewsImg} paragraph={<Paragraph title="ІНШЕ" text={another}/>}/>
                </section>
            </main>
        </Fragment>
    )
}

