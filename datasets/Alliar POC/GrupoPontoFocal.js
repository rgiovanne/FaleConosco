
function createDataset(fields, constraints, sortFields) {
	var grupo ='';
	if (constraints != null) {
		for(var i in constraints) {
			log.info("=====ds_GrupoPontoFocal: "+constraints[i].fieldName +" - "+constraints[i].initialValue);
			if(constraints[i].fieldName == 'Grupo'){
				grupo = constraints[i].initialValue;
				continue;
			}
			
		}
	}
	log.info("GRUPO: " + grupo);
	//grupo = 'SAC_APF_00201SP0002'
	var c5 = DatasetFactory.createConstraint("groupPK.groupId", "%"+grupo+"%", "%"+grupo+"%", ConstraintType.MUST);
    c5.setLikeSearch(true);
    var constraints   = new Array(c5);
    var dataset = DatasetFactory.getDataset("group", null, constraints, null);
    
    return dataset;

}