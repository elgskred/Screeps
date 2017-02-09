var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var roleBuilder = require('builder');
var roleSoldier = require('soldier');
var topExits = [];

var spawn = [];
spawn[0] = Game.spawns.Spawn1.pos.x;
spawn[1] = Game.spawns.Spawn1.pos.y;

module.exports.loop = function () {

	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
		
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
	
	//Find exits top
	var exitsTop = Game.spawns.Spawn1.room.find(FIND_EXIT_TOP);
	console.log("Lenght: " +exitsTop[18]);
	
	for (i = 0; i < exitsTop.length; i++){
		var str = String(exitsTop[i]);
		topExits[i] = str.slice(str.lastIndexOf(" "),str.indexOf(","));
		//console.log("Exits "+topExits[i]);
	}


	for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyCapacityAvailable+' energy');
		var totalEnergy = Game.rooms[name].energyCapacityAvailable
    }
	
	var getController = Game.spawns.Spawn1.room.controller;
	var getExtensions = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return  (structure.structureType == STRUCTURE_EXTENSION);
                    }
            });

			
	console.log("Controller level: " +getController.level);	
	console.log("Extensions lenght " +getExtensions.length);	
		
		if (harvesters.length < 2){
			var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
			console.log('Spawning new harvester: ' + newName);
		}
		if (harvesters.length >= 2 && builders.length < 2){
			var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
			console.log('Spawning new builder: ' + newName);
		}

		if (harvesters.length >= 2 && builders.length >= 2 && upgraders.length < 1){
			var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
			console.log('Spawning new upgrader: ' + newName);
		}
		
		if (harvesters.length >= 2 && builders.length >= 2 && upgraders.length >= 1 && soldiers.length < 2){
			var newName = Game.spawns.Spawn1.createCreep([ATTACK,ATTACK,MOVE], undefined, {role: 'soldier'});
			console.log('Spawning new soldier: ' + newName);
		}


		
		
		
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'soldier'){
            roleSoldier.run(creep);
        }
    }
}