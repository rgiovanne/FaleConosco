
function createDataset(fields, constraints, sortFields) {
	log.info(" %%Inicio dataset BuscaAssunto %%");
	var dataset = DatasetBuilder.newDataset();
	
	var fields = new Array();
	var fields2 = new Array();
	var aAssunto = new Array();

	var campos = '' //new Array();
	var where = "";
	var branch = "";
	var tabela = "";
	var TpOcorrencia = "";
	
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

			if(constraints[i].fieldName == "Tipo_Ocorrencia"){
				TpOcorrencia = constraints[i].initialValue;
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
	
	var whereTip = "U9_TIPOOCO = '"+ TpOcorrencia +"'";
	fields2.push("SU9"); //nome da tabela
	fields2.push(whereTip); //where "U9_TIPOOCO = '000011'"
	
	log.info("--------------------branch:"+branch);
	
	fields2.push(branch); //filial
	
	//retorno select
	
	
	
	fields2.push("U9_ASSUNTO");
	

	var datasetsu9 = DatasetFactory.getDataset("dsConsultaProtheus", fields2, null, null);
	log.info('retorno SU9 '+datasetsu9.rowsCount);
	
	var msg = "X5_CHAVE in(";
	var unique = [];
	var codassunto = '';
	var assuntos = '';
	
	for (var i = 0; i < datasetsu9.rowsCount; i++) {
		log.info("------------ASSUNTO: "+datasetsu9.getValue(i, "U9_ASSUNTO"));
		
		codassunto = datasetsu9.getValue(i, "U9_ASSUNTO");
		if(assuntos == ''){
			assuntos = datasetsu9.getValue(i, "U9_ASSUNTO");
		}else{
			assuntos += ","+datasetsu9.getValue(i, "U9_ASSUNTO");
		}
		log.info(" ## CodAssunto ##");
		log.info("Verifica se já existe valor no array "+ unique.indexOf(codassunto)+" " + unique.indexOf(000003));
		if(unique.length <= 0){
			unique.push(datasetsu9.getValue(i, "U9_ASSUNTO").toString());
		}else if(unique.indexOf(codassunto.toString()) > -1){
			
		}else{
			log.info("@@ Entrou no else Datasetsu9 ##")
			unique.push(datasetsu9.getValue(i, "U9_ASSUNTO").toString());
			log.info("Depois do push " + unique[i]);
		}				
		
	}
	log.info("Verifica se já existe valor no array2 "+ unique.indexOf(codassunto));
	var msg1 = '';
	log.info(" Unique "+unique.length);
	
	var aAssunto2 = assuntos.split(',');
	
	var aAssunto3 = new Array();
	
	//var chaves = ['000003','000003','000003','000003','000003','000003','000004'];
	log.info(" aAssunto2 "+ aAssunto2.length);
	for(var z=0 ;z < aAssunto2.length;z++){
		 if (aAssunto3.indexOf(aAssunto2[z]) > -1) {
		    log.info("Encontrou");
		  } else {
		    log.info("Não encontrou");
		    aAssunto3.push(aAssunto2[z]);
		  }
	}
	log.info("aAssunto3 "+ aAssunto3.length);
	
	var aAssunto = array_unique(unique);
	
	log.info(" ## aAssunto ## "+ aAssunto.length );
	 
	for(var n=0;n < aAssunto3.length; n++){
		if( msg1 == ''){
			msg1 = "'"+aAssunto3[n]+"'";
		}else{
			msg1 += ",'"+aAssunto3[n]+"'";
		}
		
	}
	msg += msg1 + ")";

	log.info("MSG "+ msg +" AND X5_TABELA = 'T1'");
	
	
	where = msg +" AND X5_TABELA = 'T1'";
	branch = "";
	tabela = "SX5"; 
	
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
	
	log.info("--------------------where:"+where);
	
	fields.push(tabela); //nome da tabela
	fields.push(where); //where
	
	log.info("--------------------branch:"+branch);
	
	fields.push(branch); //filial
	
	//retorno select
	
	
	
	fields.push("X5_CHAVE");
	fields.push("X5_DESCRI");
	
	var dataset = DatasetFactory.getDataset("dsConsultaProtheus", fields, null, null);
	log.info("--------------------retorno:"+dataset.rowsCount);
	
	for (var i = 0; i < dataset.rowsCount; i++) {
		log.info("------------CC: "+dataset.getValue(i, campos[0]));
	}
	
	
	return dataset;			

}

function array_unique(array){
    return array.filter(function(el, index, arr) {
        return index == arr.indexOf(el);
    });
}