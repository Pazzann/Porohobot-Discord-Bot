

module.exports.DickDraw = function (length)
{
        let dick = "8";
        if (length >= 0){
            for (let i = 0; i < length; i++) {
                dick += "=";
            }
            return dick + "D";
        }else{
            length *= (-1);
            for (let i = 0; i < length; i++) {
                dick += "=";
            }
            return dick + "D🍑";
        }

}