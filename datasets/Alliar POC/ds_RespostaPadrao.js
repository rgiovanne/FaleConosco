
function createDataset(fields, constraints, sortFields) {
	var codOcorrencia ='';
	
	if (constraints != null) {
		for(var i in constraints) {
			log.info("=====ds_RespostaPadrao: "+constraints[i].fieldName +" - "+constraints[i].initialValue);
			if(constraints[i].fieldName == 'Ocorrencia'){
				codOcorrencia = constraints[i].initialValue;
				continue;
			}
			
		}
	}
	//codOcorrencia = '000115';
	log.info("Ocorrencia: " + codOcorrencia);
	//grupo = 'SAC_APF_00201SP0002'
	var c5 = DatasetFactory.createConstraint("ocorrencia", "%"+codOcorrencia+"%", "%"+codOcorrencia+"%", ConstraintType.MUST);
    c5.setLikeSearch(true);
    var constraints   = new Array(c5);
    var dataset = DatasetFactory.getDataset("RespostaPadrao_FaleConosco", null, constraints, null);
    
    return dataset;
	
}