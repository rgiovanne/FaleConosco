
function createDataset(fields, constraints, sortFields) {
	log.info(" %%Inicio dataset Dinamico Faleconosco %%");
	var dataset = DatasetBuilder.newDataset();
	
	/*dataset.addColumn("Codigo");
	dataset.addColumn("Nome");
	dataset.addColumn("TESTE");
	*/
	var fields = new Array();
	var where = ""; 
	var branch = "";
	var tabela = "SUX";
	
	log.info("========================fields.length "+fields.length);
	
	if (constraints != null) {
		for(var i in constraints) {
			log.info("=====ds_centro_custo: "+constraints[i].fieldName +" - "+constraints[i].initialValue);
			if(constraints[i].fieldName == 'UX_XTPATEN' && constraints[i].initialValue != ''){
				where = "UX_XTPATEN = '"+ constraints[i].initialValue +"'"; 
				continue;
			}
			
		
			
			
			/*if (constraints[i].constraintType == ConstraintType.MUST) {
				must.push(constraints[i].fieldName+"='"+constraints[i].initialValue+"'");				 
			}
			if (constraints[i].constraintType == ConstraintType.SHOULD) {
				should.push(constraints[i].fieldName+"='"+constraints[i].initialValue+"'");				 
			}*/			
		}
	}
	
	/*if(fields != null && fields.length > 2){
		log.info("========================branch "+fields[3]);	
		branch = fields[3];
	}*/
	
	/*if (must.length > 0) {
		if(where == ""){
			where += must.join(" AND ");
		}else{
			where += " AND "+must.join(" AND ");
		}
		
	}
	
	if (should.length > 0) {
		where += " AND ("+should.join(" OR ")+" )";
	}*/
	
	log.info("--------------------where:"+where);
	
	fields.push(tabela); //nome da tabela
	fields.push(where); //where
	
	log.info("--------------------branch:"+branch);
	
	fields.push(branch); //filial
	
	//retorno select
	
		
	fields.push("UX_CODTPO");
	fields.push("UX_DESTOC");
	fields.push("UX_XTPATEN ");
	
	var dataset = DatasetFactory.getDataset("dsConsultaProtheus", fields, null, null);
	log.info("--------------------retorno:"+dataset.rowsCount);
	
	for (var i = 0; i < dataset.rowsCount; i++) {
		log.info("------------CC: "+dataset.getValue(i, "UX_CODTPO"));
	}
	
	
	return dataset;			

}