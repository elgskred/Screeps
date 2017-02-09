//Soldier
module.exports = {
    run(creep){
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var flag = Game.getObjectById('571fc874a51212a07666d88f');
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else{
            creep.moveTo(flag);
        }
    }
};