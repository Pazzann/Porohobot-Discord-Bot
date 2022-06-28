

module.exports.DickDraw = function (length)
{
        if (length >= 0){
            let dick = "8";

            for (let i = 0; i < length; i++) {
                dick += "=";
            }

            return dick + "D";
        }else{
            length *= (-1);
            let dick = "8";

            for (let i = 0; i < length; i++) {
                dick += "=";
            }

            return dick + "D🍑";
        }

}