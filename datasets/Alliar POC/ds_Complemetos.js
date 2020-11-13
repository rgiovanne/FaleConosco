function createDataset(fields, constraints, sortFields) {
	log.info(" %%Inicio dataset Complemento %%");
	var login = 'integradors3@alliar.com';
	var senha = 'Supra03@';
	var companyId = parseInt('1');	
	var userId = 'nr8n5w2c98gxgh1j1457025211780';
	var solicitacao = 0;
	var texto = '';
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("Retorno");
	
	if (constraints != null) {
		for(var i in constraints) {
			log.info("=====dataset create complemento: "+constraints[i].fieldName +" - "+constraints[i].initialValue);
			if(constraints[i].fieldName == 'Solicitacao'){
				solicitacao = constraints[i].initialValue;
				continue;
			}
			
			if(constraints[i].fieldName == "Texto"){
				texto = constraints[i].initialValue;
				continue;
			}
			
									
		}
	}
	
	if((solicitacao != '' && solicitacao != null) && (texto != '' && texto != null)){
		var retorno = addComentario(solicitacao,texto);
		log.info('retorno: '+retorno);
		
		if(retorno == 'OK'){
			
		    dataset.addRow(new Array("Adicionou comentario com sucesso!"));
		}else{
			dataset.addRow(new Array("Error ao adicionar comentario: "+ retorno));
		}
	}else{
		dataset.addRow(new Array("Solicitacao ou Texto Vazio"));
	}
	
	    
	return dataset
}

function addComentario(numsubproc,texto){

	//var servico = ServiceManager.getService("ECMWorkflowEngineService1").getBean();
	var servico = ServiceManager.getService("ECMWorkflowEngineServiceCXF").getBean();
	var ECMWorkflowEngineServiceService = servico.instantiate("com.totvs.ECMWorkflowEngineServiceService");
	var WorkflowEngineService = ECMWorkflowEngineServiceService.getWorkflowEngineServicePort();
	

	var username = 'integradors3@alliar.com'; 
	var password = 'Supra03@'; 
	var companyId = parseInt(getValue("WKCompany")); // 74
	var processInstanceId = parseInt(numsubproc); //1234; // numero do solicitação
	var userId = 'nr8n5w2c98gxgh1j1457025211780'; // matricula usuario
	//var cometarioText = 'TESTE COMPILA 4';
	var threadSequence = 0;
	
    var properties = {};
    properties["disable.chunking"] = "true";
    properties["log.soap.messages"] = "true";
    properties["receive.timeout"] = "100000";
	
	var customClient = servico.getCustomClient(WorkflowEngineService, "com.totvs.WorkflowEngineService", properties);

    var retorno = customClient.setTasksComments(username,
        password,
        companyId,
        processInstanceId,
        userId,
        threadSequence,
        texto);
	
    log.info("=== retorno ==== " + retorno);
	
	return retorno
}