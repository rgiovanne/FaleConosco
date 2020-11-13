
function createDataset(fields, constraints, sortFields) {
	log.info(" %%Inicio dataset Dinamico Faleconosco 2 %%");
	var dataset = DatasetBuilder.newDataset();
	
	var fields = new Array();
	var campos = '' //new Array();
	var where = "";
	var branch = "";
	var tabela = "";
	
	if (constraints != null) {
		for(var i in constraints) {
			log.info("=====ds_centro_custo: "+constraints[i].fieldName +" - "+constraints[i].initialValue);
			if(constraints[i].fieldName == 'Tabela'){
				tabela = constraints[i].initialValue;
				continue;
			}
			
			if(constraints[i].fieldName == "Where"){
				where = constraints[i].initialValue;
				continue;
			}
			
			if(constraints[i].fieldName == "Filial"){
				branch = constraints[i].initialValue;
				continue;
			}
			
			if(constraints[i].fieldName == "Campos"){
				campos = constraints[i].initialValue; //.push(constraints[i].initialValue);
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
	
	//if(campos == ""){
		//campos = "U9_CODIGO|U9_DESC"; 
	//}
	
    //where = "";
	//branch = "";
	//tabela = "SU9"; 
	
	log.info("========================fields.length "+fields.length);
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
	//where = "U9_TIPOOCO = '000011' AND U9_ASSUNTO = '000003'" //U9_TIPOOCO = '"+LEFT(cChave,6)+"' AND SU9.U9_ASSUNTO = '"+RIGHT(cChave,6)+"'
	log.info(" !!campos!! "+ campos);
	if(campos != ""){
		log.info(" Entrou no if campos")
		campos = campos.split("|");
	}
	log.info(" array campos "+ campos.length);
	
	log.info("--------------------where:"+where);
	
	fields.push(tabela); //nome da tabela
	fields.push(where); //where
	
	log.info("--------------------branch:"+branch);
	
	fields.push(branch); //filial
	
	//retorno select
	
	for(var x= 0 ; x < campos.length;x++){
		console.log(" campo:"+x +' '+ campos[x]);
		fields.push(campos[x]);
	}
	
	//fields.push("UX_CODTPO");
	//fields.push("UX_DESTOC");
	
	var dataset = DatasetFactory.getDataset("dsConsultaProtheus", fields, null, null);
	log.info("--------------------retorno:"+dataset.rowsCount);
	
	for (var i = 0; i < dataset.rowsCount; i++) {
		log.info("------------CC: "+dataset.getValue(i, campos[0]));
	}
	
	
	return dataset;			

}