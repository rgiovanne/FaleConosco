function createDataset(fields, constraints, sortFields) {

	log.info("========== DATASET ds_marcar_alliar ROGER ==========");
	
	var fields = new Array();
	var where = "D_E_L_E_T_=' '";
	
	if (constraints != null && constraints.length > 0) {
		for ( var i in constraints) {
			//log.info("===== constraints [" + i + "]: fieldName = " + constraints[i].fieldName + " / initialValue: " + constraints[i].initialValue);
			if (constraints[i].fieldName == 'ZI_CODIGO' && constraints[i].initialValue != ''){
				where += " AND "+constraints[i].fieldName+" = '"+constraints[i].initialValue+"'";
			} else if (constraints[i].fieldName == 'ZI_DESCRI' && constraints[i].initialValue != ''){
				where += " AND "+constraints[i].fieldName+" like '%"+constraints[i].initialValue.toUpperCase()+"%'"; 
			}else if(constraints[i].fieldName == 'ZI_CODIGO2' && constraints[i].initialValue != ''){
				where += " AND ZI_CODIGO IN ("+ constraints[i].initialValue.replace(";",",") +") "
			}
		}
	}
	log.info("Where " + where);
	fields.push("SZI"); //nome da tabela
	fields.push(where); //where
	fields.push(""); //filial
	
	//retorno select
	fields.push("ZI_CODIGO");
	fields.push("ZI_DESCRI");
	fields.push("ZI_DOMINIO");
	
	var dataset = DatasetFactory.getDataset("dsConsultaProtheus", fields, null, null);
	
	return dataset;
}