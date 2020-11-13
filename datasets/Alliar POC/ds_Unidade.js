function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var codigoFilial = "";
	var codigoGrupoEmpresa = "01"; ///REMOVER DEPOIS
	var marca = "";
	var todasFiliais = false;
	
	if(constraints != null){
		for (var i = 0; i < constraints.length; i++){			
			if(constraints[i].fieldName == 'M0_CODIGO'/* || constraints[i].fieldName == 'R8_CODGRUPOEMP' */){
				codigoGrupoEmpresa = constraints[i].initialValue;								
			}
			if(constraints[i].fieldName == 'Marca'/* || constraints[i].fieldName == 'R8_CODGRUPOEMP' */){
				marca = constraints[i].initialValue;								
			}
			if (constraints[i].fieldName == "M0_CODFIL" || constraints[i].fieldName == "R8_FILIAL") {
				codigoFilial = constraints[i].initialValue;				
			}
			if (constraints[i].fieldName == "full") { //se passar a constrains full retorna todas as filiais. (zoom de filial de entrega).
				todasFiliais = true;				
			}
		}
	}
	
	dataset.addColumn("M0_CODFIL");
	dataset.addColumn("M0_FILIAL");
	dataset.addColumn("M0_CODIGO");
	
	//remover
	dataset.addColumn("R8_FILIAL");
	dataset.addColumn("R8_DESC_FILIAL");
	dataset.addColumn("R8_CODGRUPOEMP");
	
	var login = "";
	var tipoAutenticacao = "";
	
	if (todasFiliais) {
		login = "admin";
		tipoAutenticacao = "USER_CODE";
	} else {
		login = getEmail(); 
		tipoAutenticacao = "USER_EMAIL";
	}
	
	var contraints = [];
	contraints.push( DatasetFactory.createConstraint("TIPO", 2, 2, ConstraintType.MUST) ); // 0 - retorna grupos // 1 - retorna empresa do grupo // 2 - retorna empresa e grupo 
	contraints.push( DatasetFactory.createConstraint(tipoAutenticacao, login, login, ConstraintType.MUST) );
	if (codigoGrupoEmpresa != "") {
		contraints.push( DatasetFactory.createConstraint("GRUPO_EMPRESA", codigoGrupoEmpresa, codigoGrupoEmpresa, ConstraintType.MUST) );
	}
	
	var ds = DatasetFactory.getDataset("dsConsultaGrupoEmpresaFilial1", null, contraints, null);
	
	log.info("ds.rowsCount:"+ds.rowsCount);
	
	for(var i = 0 ; i < ds.rowsCount; i++) {
		var cnpjSemPadrao = false;
		var exibirUnidade = false;
		
		if(marca != ""){
			var retorno = checarUnidade(marca, ds.getValue(i, "cCodFil"));
			
			if(retorno != ""){
				cnpjSemPadrao = true;
				if(marca == retorno){
					exibirUnidade = true;
				}
			}
		} 
		
		//log.info("ds.getValue(i, cCodGrpEmp) "+ds.getValue(i, "cCodGrpEmp"));
		if (marca == "" || marca == ds.getValue(i, "cCodFil").substring(0,3) || cnpjSemPadrao == true) {
			if(cnpjSemPadrao == false){
				//log.info("cnpjSemPadrao == false********************");
				dataset.addRow( [ ds.getValue(i, "cCodFil"), ds.getValue(i, "cNomeFil"), ds.getValue(i, "cCodGrpEmp"),
				                  ds.getValue(i, "cCodFil"), ds.getValue(i, "cNomeFil"), ds.getValue(i, "cCodGrpEmp")] );
			} else {
				if(exibirUnidade == true){
					//log.info("exibirUnidade == true********************");
					dataset.addRow( [ ds.getValue(i, "cCodFil"), ds.getValue(i, "cNomeFil"), ds.getValue(i, "cCodGrpEmp"),
					                  ds.getValue(i, "cCodFil"), ds.getValue(i, "cNomeFil"), ds.getValue(i, "cCodGrpEmp")] );
				}
			}
			
		}
	}
	return dataset;	
}
//com as novas unidades que serão integradas e os cnpj's nao seguem uma padrao, exemplo NOVA DELFIN ITAIGARA 00101BA0056, 
//o metodo servira buscar de acordo com a filial matriz da unidade
function checarUnidade(marca,unidade){
	var arr = [	{'00101BA0056': '017'},	{'00101MG0002': '001'},{'00101MG0001': '001'}];
	
	/*
	log.info("Marca consultada: "+marca);
	log.info("Unidade consultada: "+unidade);*/
	var retorno = getValueByKey(arr, unidade);
	//log.info("retorno:  "+ retorno);
	
	/*if(retorno == marca){
		log.info("Deve exibir a filial fora do padrao  "+ retorno);
		return retorno;
	}*/
	return retorno;
}

function getValueByKey (collection, key) {
	var value = "";
	collection.map(function (item) {
		if (key in item) value = item[key];
	})
	//log.info("getValueByKey:  "+ value);
	return value;
}

function getEmail() {
	log.info("----------getEmail: "+getValue("WKUser"));
	
	var constraints = [ DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST) ];
	
	var dataset = DatasetFactory.getDataset("colleague", ["login", "mail"], constraints, null);
	var email = dataset.getValue(0, "mail");
	log.info("-----email:"+email);
	return email;
	
}