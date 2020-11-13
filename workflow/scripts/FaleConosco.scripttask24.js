function scripttask24() {
	 log.info("========= Processo SAC_APF - Atribuir ao Grupo de Atendentes da Marca ou Unidade ==========");

		//Valida Filial + Tipo de Ocorrencia
		
		var idGrupoPontoFocal = hAPI.getCardValue("tpOcorrencia");
		log.info("Id do grupo Ponto Focal + ocorrencia: " + idGrupoPontoFocal)
		if(idGrupoPontoFocal != "" && idGrupoPontoFocal != null ){
			var constraintGroupPontoFocal = DatasetFactory.createConstraint('groupPK.groupId', idGrupoPontoFocal, idGrupoPontoFocal, ConstraintType.MUST);
			var datasetGroupPontoFocal = DatasetFactory.getDataset('group', null, new Array(constraintGroupPontoFocal), null);
			
			if (datasetGroupPontoFocal != null && datasetGroupPontoFocal != undefined && datasetGroupPontoFocal.rowsCount > 0) {
				var users = new java.util.ArrayList();
				users.add("Pool:Group:" + idGrupoPontoFocal);
				hAPI.setAutomaticDecision(15, users, "Atentedimento atribuído ao Ponto Focal da Filial + Tipo de Ocorrencia.");
			}	
		}else{
			var idGrupoFilial = hAPI.getAdvancedProperty("PREFIXO_GRUPO") + hAPI.getCardValue("Unidade");
			if (hAPI.getCardValue("codTipoOcorrencia") != null && hAPI.getCardValue("codTipoOcorrencia") != "") {
				idGrupoFilial += "_" + hAPI.getCardValue("codTipoOcorrencia");
			}
			log.info("Id do grupo Filial + ocorrencia: " + idGrupoFilial)
			var constraintGroupFilial = DatasetFactory.createConstraint('groupPK.groupId', idGrupoFilial, idGrupoFilial, ConstraintType.MUST);
			var datasetGroupFilial = DatasetFactory.getDataset('group', null, new Array(constraintGroupFilial), null);

			if (datasetGroupFilial != null && datasetGroupFilial != undefined && datasetGroupFilial.rowsCount > 0) {
				var users = new java.util.ArrayList();
				users.add("Pool:Group:" + idGrupoFilial);
				hAPI.setAutomaticDecision(15, users, "Atentedimento atribuído ao Ponto Focal da Filial + Tipo de Ocorrencia.");
			} else {
				var idGrupoMarca = hAPI.getAdvancedProperty("PREFIXO_GRUPO") + hAPI.getCardValue("codMarca");
				if (hAPI.getCardValue("codTipoOcorrencia") != null && hAPI.getCardValue("codTipoOcorrencia") != "") {
					idGrupoMarca += "_" + hAPI.getCardValue("codTipoOcorrencia");
				}
				log.info("Id do grupo Marca + ocorrencia: " + idGrupoMarca)
				var constraintGroupMarca = DatasetFactory.createConstraint('groupPK.groupId', idGrupoMarca, idGrupoMarca, ConstraintType.MUST);
				var datasetGroupMarca = DatasetFactory.getDataset('group', null, new Array(constraintGroupMarca), null);
				//Valida Filial sem tipo de ocorrencia
				if (datasetGroupMarca != null && datasetGroupMarca != undefined && datasetGroupMarca.rowsCount > 0) {
					var users = new java.util.ArrayList();
					users.add("Pool:Group:" + idGrupoMarca);
					hAPI.setAutomaticDecision(15, users, "Atentedimento atribuído ao Ponto Focal da Marca.");
				} else {
					if (getValue("WKNumState") == 28) {
						throw "Não há Grupo cadastro da Filial e da Marca para o Atendimento. Cadastre um Grupo para Filial ou para Marca.";
					} else {
						var users = new java.util.ArrayList();
						hAPI.setAutomaticDecision(28, users, "Não há Grupo cadastro da Filial e da Marca para o Atendimento. Solicitação enviada para TI realizar o cadastro de Grupo.");
					}
				}

			}
		}

	    
}