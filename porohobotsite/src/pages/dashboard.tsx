import React, {Fragment, useEffect, useState} from "react";

async function getGuilds() {
    let request = await fetch('http://localhost:1234/api/guilds', {credentials: "include"});
    if (request.ok) return await request.json();
}

export function Dashboard() {
    function click(id: number){
        console.log(id);
    }
    let [guilds, setGuilds] = useState("");
    useEffect(() => {
        (async () => {
            let answer: string = "";
            const userGuilds = await getGuilds();
            console.log(userGuilds);
            let i = 0;
            for (let guild of userGuilds) {
                if(i===0){
                    answer+="<tr>";
                }
                if(!(guild[0].name.slice(0, 20)=== guild[0].name)){
                    guild[0].name = guild[0].name.slice(0, 20) + "...";
                }
                answer += (guild[1] === 0) ?
                    `<th class="columnUnJoined column main">
                        <img class="guildimg" src="https://cdn.discordapp.com/icons/${guild[0].id}/${guild[0].icon}.png?size=96">
                        <p class="guildtext">${guild[0].name}</p>
                     </th>`
                    :
                    `<th class="columnJoined column main">
                        <img class="guildimg" src="https://cdn.discordapp.com/icons/${guild[0].id}/${guild[0].icon}.png?size=96">
                        <p class="guildtext">${guild[0].name}</p>
                     </th>`
                if(i===5){
                    answer+="</tr>";
                    i = 0;
                }else{
                    i++;
                }

            }
            console.log(answer);
            setGuilds(answer);
        })();
    });


return (
    <Fragment>
        <table className="guildTable" dangerouslySetInnerHTML={{__html: guilds}}>

        </table>

    </Fragment>
);
}