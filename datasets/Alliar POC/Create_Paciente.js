
function createDataset(fields, constraints, sortFields) {
    log.info("=== INICIO Dataset create === Paciente: ");
    var CPF,Nome,Email,Celular,Telefone,NomeTitular,CPFTitular = '';
    
    var dataset = DatasetBuilder.newDataset();

    if (constraints != null) {
		for(var i in constraints) {
			log.info("=====dataset create paciente: "+constraints[i].fieldName +" - "+constraints[i].initialValue);
			if(constraints[i].fieldName == 'CPF'){
				CPF = constraints[i].initialValue;
				continue;
			}
			
			if(constraints[i].fieldName == "Nome"){
				Nome = constraints[i].initialValue;
				continue;
			}
			
			if(constraints[i].fieldName == "Email"){
				Email = constraints[i].initialValue;
				continue;
			}

			if(constraints[i].fieldName == "Celular"){
				Celular = constraints[i].initialValue;
				continue;
            }
            
            if(constraints[i].fieldName == "Telefone"){
				Telefone = constraints[i].initialValue;
				continue;
            }
            
            if(constraints[i].fieldName == "NOME_TITULAR"){
				NomeTitular = constraints[i].initialValue;
				continue;
            }
            
            if(constraints[i].fieldName == "CPF_TITULAR"){
				CPFTitular = constraints[i].initialValue;
				continue;
			}
						
		}
	}

   /* CPF         = '999.999.999-99'
    Nome        = 'Oliveira Jose Silva'
    Email       = 'Oliveira.Testes@gmail.com'
    Celular     = '11 98568-6589'
    Telefone    = '11 5568-5547'
    NomeTitular = 'Raimundo da Silva'
    CPFTitular  = '125.445.458-58'*/

    var result = create(CPF,Nome,Email,Celular,Telefone,NomeTitular,CPFTitular);
    dataset.addColumn("usuario");
    log.info("Result: "+ result);
    dataset.addRow(new Array(result));

    return dataset;
}

function create(CPF,Nome,Email,Celular,Telefone,NomeTitular,CPFTitular) {

    log.warn("=== INICIO create === Paciente: ");
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
        var cardFieldDto5 = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
        var cardFieldDto6 = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
        var cardFieldDto7 = serviceManager.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");

        cardDto.getAttachs().add(attachment);
        cardDto.getReldocs().add(relatedDocument);
        cardDto.getDocsecurity().add(documentSecurity);
        cardDto.getDocapprovers().add(approver);

        //ADICIONA NO ARRAY OS METADADOS DO REGISTRO DE FORMULARIO 
        cardDto.setDocumentDescription("");
        cardDto.setAdditionalComments("");
        cardDto.setParentDocumentId(3605641);
        cardDto.setColleagueId("admin");
        cardDto.setExpires(false);
        cardDto.setUserNotify(false);
        cardDto.setInheritSecurity(true);
        cardDto.setTopicId(1);
        cardDto.setVersionDescription("");
        cardDto.setDocumentKeyWord("");

        //ADICIONA NO ARRAY OS DADOS DOS CAMPOS DO FORMULARIO: NOME E O VALOR	
        cardFieldDto1.setField("cpfPaciente");
        cardFieldDto1.setValue(CPF);
        cardDto.getCardData().add(cardFieldDto1);
        
        cardFieldDto2.setField("nomePaciente");
        cardFieldDto2.setValue(Nome);
        cardDto.getCardData().add(cardFieldDto2);
        
        cardFieldDto3.setField("emailPaciente");
        cardFieldDto3.setValue(Email);
        cardDto.getCardData().add(cardFieldDto3);

        cardFieldDto4.setField("celularPaciente");
        cardFieldDto4.setValue(Celular);
        cardDto.getCardData().add(cardFieldDto4);

        cardFieldDto5.setField("telPaciente");
        cardFieldDto5.setValue(Telefone);
        cardDto.getCardData().add(cardFieldDto5);

        cardFieldDto6.setField("nomeTitular");
        cardFieldDto6.setValue(NomeTitular);
        cardDto.getCardData().add(cardFieldDto6);

        cardFieldDto7.setField("cpfTitular");
        cardFieldDto7.setValue(CPFTitular);
        cardDto.getCardData().add(cardFieldDto7);
        
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