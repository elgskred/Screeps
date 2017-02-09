//Harvester
module.exports = {
	run(creep) {
		
		if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }
		
        if(creep.memory.building){
            var structPri1 = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return  (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
			var structPri2 = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTROLLER) && structure.progress < structure.progressTotal;
                    }
            });
			
			if(structPri1.length > 0){
			    console.log("Pri1 started");
				for (i = 0; i < structPri1.length; i++){
					if(creep.transfer(structPri1[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
							creep.moveTo(structPri1[i]);
						}
				}					
				
			}
			else if(structPri2.length > 0){
			    console.log("Pri2 started");
				if(creep.upgradeController(structPri2[0]) == ERR_NOT_IN_RANGE){
					creep.moveTo(structPri2[0]);
				}
			} 
        }else{
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
	}
}