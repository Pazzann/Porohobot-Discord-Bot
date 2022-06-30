
module.exports.User = class {
    constructor(interaction) {
        this.userName = interaction.member.user.tag;
        this.userId = interaction.member.user.id;

        //dick game part
        this.DickGame ={
            userDickLength: 5,
            timesCalled: 0,
            goodTries: 0,
            badTries: 0,
            totalGrowth: 0,
            totalDownGrade: 0
        }

    }
}