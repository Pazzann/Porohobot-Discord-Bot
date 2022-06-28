module.exports.MsgReading = function(message)
{
  
    
    let msgLow = message.content.toLowerCase();
    
    if(!message.author.bot)
    {

        if (msgLow.includes("слава україні")||msgLow.includes("слава украине")){
            message.reply({
                content: 'Героям Слава!'
            });
            checkcheer = true;
        }else if((msgLow.includes("слава нації")||msgLow.includes("слава нации"))){
            message.reply({
                content: 'Смерть Ворогам!'
            });
            
            
        }else if(msgLow =="украина"||msgLow=="україна"){
            message.reply({
                content: 'Понад Усе!'
            });
        }
        if(message.author.username === "shelestunovil")
        {
            message.react('🤡')
            //message.member.timeout(60 * 1000, 'HIHI HAHA'); //mute for 1 minute
            
        }
    }

}