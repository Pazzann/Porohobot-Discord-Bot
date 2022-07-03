module.exports.MsgReading = function(message)
{
  
    
    let msgLow = message.content.toLowerCase();
    
    if(!message.author.bot)
    {
        if (msgLow.includes("путин")||msgLow.includes("путін")){
            message.reply({
                content: 'Хуйло!'
            });
        }

        if (msgLow.includes("слава україні")||msgLow.includes("слава украине")){
            message.reply({
                content: '🇺🇦Героям Слава!'
            });
            checkcheer = true;
        }else if((msgLow.includes("слава нації")||msgLow.includes("слава нации"))){
            message.reply({
                content: '🇺🇦Смерть Ворогам!'
            });
            
            
        }else if(msgLow =="украина"||msgLow=="україна"){
            message.reply({
                content: '🇺🇦Понад Усе!'
            });
        }
        //shelestunovil
        if(message.author.id == "643027447058792479")
        {
            message.react('🤡')
        }
        //bfg
        if(message.author.id == "390561515054563328")
        {
            message.react('💪')
        }
        //leo
        if(message.author.id == "690911579532689429")
        {
            message.react('🤡')
        }
    }

}