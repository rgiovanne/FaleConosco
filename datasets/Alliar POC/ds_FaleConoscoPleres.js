function createDataset(fields, constraints, sortFields) {
	
	
	try{
		log.info(">>>>>===== INICIO DATASET CONSULTA FALECONOSCO =====<<<<<");
		
		var datasetParamsPleres = DatasetFactory.getDataset("ds_pleres_parametros_webservice", null, null, null);
		var urlDominio = datasetParamsPleres.getValue(0, "urlDominio");//'http://alliar.teste.pleres.net:8081';//'cdb_homolog';
		var user = datasetParamsPleres.getValue(0, "user");//'fluig';
		var pass = datasetParamsPleres.getValue(0, "pass");//'12345';
		var limit = '10';
		var cpf = ''; //8053592813
		var nome = ''; //RICARDO
		var dt_nasc = '';
		
		var endPoint = "/api/relatorios/SacFaleConoscoListagemPaciente";
		
		var dominioMarca = ''//"cdb_homolog";
		var status = "0"; // Passar 0 para retornar somente convênios Ativos (não bloqueados) do Pleres
		
		if(constraints != null){
			for (var i = 0; i < constraints.length; i++){               
			   if(constraints[i].fieldName == 'CPF' && constraints[i].initialValue != ''){
				   //log.info(">>>>> codigoConvenio: " + constraints[i].initialValue);
				   cpf = constraints[i].initialValue;
			   }
			   if(constraints[i].fieldName == 'NOME' && constraints[i].initialValue != ''){
				   //log.info(">>>>> nomeConvenio: " + constraints[i].initialValue);
				   nome = constraints[i].initialValue;
			   }
			   if(constraints[i].fieldName == 'DT_NASC' && constraints[i].initialValue != ''){
				   //log.info(">>>>> nomeFantasia: " + constraints[i].initialValue);
				   dt_nasc = constraints[i].initialValue;
			   }
			   if(constraints[i].fieldName == 'DOMINIO_MARCA' && constraints[i].initialValue != ''){
				   //log.info(">>>>> nomeFantasia: " + constraints[i].initialValue);
				   dominioMarca = constraints[i].initialValue;
			   }
			}
		}
		
		log.info("## dominioMarca ## "+dominioMarca);
		log.info("## url ## "+urlDominio+endPoint);
		var url = new java.net.URL(urlDominio + endPoint);
		var connection = url.openConnection();
		connection.setRequestMethod("GET");
		connection.setRequestProperty("Content-Type", "application/json");
		connection.setRequestProperty("Accept", "application/json");
		connection.setRequestProperty("Dominio", dominioMarca);
		connection.setRequestProperty("Usuario", user);
		connection.setRequestProperty("Senha", pass);
		connection.setRequestProperty("Parametros",	'{"LIMIT": "'+limit
														+ '", "CPF": "'+cpf
														+ '", "NOME": "'+nome
														+ '", "DT_NASC": "'+dt_nasc+'"}');
		
		log.info(">>>>> Dominio:" + connection.getRequestProperty("Dominio"));
		log.info(">>>>> Usuario:" + connection.getRequestProperty("Usuario"));
		log.info(">>>>> Senha:" + connection.getRequestProperty("Senha"));
		log.info(">>>>> Parametros:" + connection.getRequestProperty("Parametros"));
		log.info(">>>>> getResponseCode:" + connection.getResponseCode());
		
		if (connection.getResponseCode() != 200) {
			var datasetError = DatasetBuilder.newDataset();
			datasetError.addColumn('Erro');
			datasetError.addRow(["Consulta Pleres Especialidades retornou um erro: " + connection.getResponseCode() + " - " + connection.getResponseMessage()])
			log.info(">>>>> Consulta Pleres Especialidades retornou um erro: " + connection.getResponseCode() + " - " + connection.getResponseMessage())
			return datasetError;
		}
		
		var br = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));
		var jsonContent = "";
		
		while (true) {
			var linha = br.readLine();
			if (linha == null) {
				break;
			}
			jsonContent = linha;
		}
		
		//Converte a string JSON em Objeto JSON
		var jsonObject = JSON.parse(jsonContent);
		
		var dataset = DatasetBuilder.newDataset();
		dataset.addColumn("TIPO");
		dataset.addColumn("NOME");
		dataset.addColumn("CPF");
		dataset.addColumn("DT_NASC");
		dataset.addColumn("EMAIL");
		dataset.addColumn("CELULAR");
		dataset.addColumn("TELEFONE");
		dataset.addColumn("NOME_TITULAR");
		dataset.addColumn("CPF_TITULAR");
		dataset.addColumn("CONVENIO");
		dataset.addColumn("PLANO");
		dataset.addColumn("MATRICULAPLANO");
		dataset.addColumn("ULTIMO_ATENDIMENTO");
		
		log.info(">>>>> jsonObject.length: " + jsonObject.length);

		for (var i = 0; i < jsonObject.length; i++){
			dataset.addRow([jsonObject[i].TIPO,
							jsonObject[i].NOME,
							jsonObject[i].CPF.toString(), 
							jsonObject[i].DT_NASC,
							jsonObject[i].EMAIL, 
							jsonObject[i].CELULAR,
							jsonObject[i].TELEFONE,
							jsonObject[i].NOME_TITULAR,
							jsonObject[i].CPF_TITULAR,
							jsonObject[i].CONVENIO,
							jsonObject[i].PLANO,
							jsonObject[i].MATRICULAPLANO,
							jsonObject[i].ULTIMO_ATENDIMENTO
							]);
							
		}
		
		return dataset;
		
	} catch(e){
		var datasetError = DatasetBuilder.newDataset();
		datasetError.addColumn('Erro');
		datasetError.addRow(["Erro ao executar Dataset Pleres Consulta Especialidades: " + e])
		log.info(">>>>> Erro ao executar Dataset Pleres Consulta Especialidades: " + e)
		return datasetError;
	}

}