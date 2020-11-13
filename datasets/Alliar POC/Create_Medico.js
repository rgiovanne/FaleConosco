
function createDataset(fields, constraints, sortFields) {
    log.info("=== INICIO Dataset create === MEDICO: ");
    var crm,nomeMedico,emailMedico,telefoneMedico= '';
    
    var dataset = DatasetBuilder.newDataset();

    if (constraints != null) {
		for(var i in constraints) {
			log.info("=====dataset create medico: "+constraints[i].fieldName +" - "+constraints[i].initialValue);
			if(constraints[i].fieldName == 'Crm'){
				crm = constraints[i].initialValue;
				continue;
			}
			
			if(constraints[i].fieldName == "Nome"){
				nomeMedico = constraints[i].initialValue;
				continue;
			}
			
			if(constraints[i].fieldName == "Email"){
				emailMedico = constraints[i].initialValue;
				continue;
			}

			if(constraints[i].fieldName == "Telefone"){
				telefoneMedico = constraints[i].initialValue;
				continue;
            }
						
		}
	}

    var result = create(crm,nomeMedico,emailMedico,telefoneMedico);
    dataset.addColumn("usuario");
    log.info("Result: "+ result);
    dataset.addRow(new Array(result));

    return dataset;
}

function create(crm,nomeMedico,emailMedico,telefoneMedico) {

    log.warn("=== INICIO create === Medico: ");
    try {
        var properties = {};
            properties["disable.chunking"] = "true";
            properties["log.soap.messages"] = "true";

        var serviceManager = ServiceManager.getService("ECMCardService");
        var serviceInstance = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.ECMCardServiceService");
        var service = serviceInstance.getCardServicePort();	    		    
        var customClient = serviceManager.getCustomClient(service, "com.totvs.technology.ecm.dm.ws.CardService", properties);

        var attachment = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.Attachment");
        var relatedDocument = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.RelatedDocumentDto");
        var documentSecurity = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.DocumentSecurityConfigDto");
        var approver = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.ApproverDto");

        var username = 'diego.humberto@compila.com.br'
        var password = 'Diego@1234'
        var companyId = 1;//parseInt(getValue("WKCompany"));


        var cardDtoArray = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.CardDtoArray");
        var cardDto = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.CardDto");		
        
        var cardFieldDto1 = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
        var cardFieldDto2 = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
        var cardFieldDto3 = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
        var cardFieldDto4 = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");

        cardDto.getAttachs().add(attachment);
        cardDto.getReldocs().add(relatedDocument);
        cardDto.getDocsecurity().add(documentSecurity);
        cardDto.getDocapprovers().add(approver);

        //ADICIONA NO ARRAY OS METADADOS DO REGISTRO DE FORMULARIO 
        cardDto.setDocumentDescription("");
        cardDto.setAdditionalComments("");
        cardDto.setParentDocumentId(6978281);
        cardDto.setColleagueId("admin");
        cardDto.setExpires(false);
        cardDto.setUserNotify(false);
        cardDto.setInheritSecurity(true);
        cardDto.setTopicId(1);
        cardDto.setVersionDescription("");
        cardDto.setDocumentKeyWord("");

        //ADICIONA NO ARRAY OS DADOS DOS CAMPOS DO FORMULARIO: NOME E O VALOR	
        cardFieldDto1.setField("crm");
        cardFieldDto1.setValue(crm);
        cardDto.getCardData().add(cardFieldDto1);
        
        cardFieldDto2.setField("nomeMedico");
        cardFieldDto2.setValue(nomeMedico);
        cardDto.getCardData().add(cardFieldDto2);
        
        cardFieldDto3.setField("emailMedico");
        cardFieldDto3.setValue(emailMedico);
        cardDto.getCardData().add(cardFieldDto3);

        cardFieldDto4.setField("telefoneMedico");
        cardFieldDto4.setValue(telefoneMedico);
        cardDto.getCardData().add(cardFieldDto4);
        
        // ADICIONA O REGISTRO NO ARRAY DO REGISTRO DE FORMULARIO
        cardDtoArray.getItem().add(cardDto);

        //CHAMADA METODO PARA CRIACAO DOS REGISTROS DE FORMULARIO
        result = customClient.create(companyId, username, password, cardDtoArray);
        log.info("###### FUNCIONARIO SINCRONIZADO!");

        if (result.getItem().get(0).getWebServiceMessage().equals("ok")) {
            return "Sincronização completada com sucesso!" ;
        } else {
            return result.getItem().get(0).getWebServiceMessage();
        }
    }
    catch(e)
        {
            log.error('###### Erro ao sincronizar os aniversariantes. '+e.message);
            return;
        }    
    
}