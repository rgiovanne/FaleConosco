function createDataset(fields, constraints, sortFields) {

	try {
		log.info(">>>>>===== INICIO DATASET CONSULTA FALECONOSCO =====<<<<<");

		var datasetParamsPleres = DatasetFactory.getDataset("ds_pleres_parametros_webservice", null, null, null);
		var urlDominio = datasetParamsPleres.getValue(0, "urlDominio");//'http://alliar.teste.pleres.net:8081';//'cdb_homolog';
		var user = datasetParamsPleres.getValue(0, "user");//'fluig';
		var pass = datasetParamsPleres.getValue(0, "pass");//'12345';
		var limit = '10';
		var crm = ''; //8053592813
		var nome = ''; //RICARDO
		var email = '';
		var telefoneComercial = '';

		var endPoint = "/api/relatorios/Medicos";

		var dominioMarca = ''//"cdb_homolog";
		var status = "0"; // Passar 0 para retornar somente convênios Ativos (não bloqueados) do Pleres

		if (constraints != null) {
			for (var i = 0; i < constraints.length; i++) {
				if (constraints[i].fieldName == 'CRM' && constraints[i].initialValue != '') {
					log.info(">>>>> codigoConvenio: " + constraints[i].initialValue);
					crm = constraints[i].initialValue;
				}
				if (constraints[i].fieldName == 'NOME' && constraints[i].initialValue != '') {
					log.info(">>>>> nomeConvenio: " + constraints[i].initialValue);
					nome = constraints[i].initialValue;
				}
				if (constraints[i].fieldName == 'DOMINIO_MARCA' && constraints[i].initialValue != '') {
					log.info(">>>>> nomeFantasia: " + constraints[i].initialValue);
					dominioMarca = constraints[i].initialValue;
				}
				if (constraints[i].fieldName == 'EMAIL' && constraints[i].initialValue != '') {
					log.info(">>>>> nomeFantasia: " + constraints[i].initialValue);
					email = constraints[i].initialValue;
				}
				if (constraints[i].fieldName == 'TELEFONE_COMERCIAL' && constraints[i].initialValue != '') {
					log.info(">>>>> nomeFantasia: " + constraints[i].initialValue);
					telefoneComercial = constraints[i].initialValue;
				}
			}
		}

		log.info("## dominioMarca ## " + dominioMarca);
		log.info("## url ## " + urlDominio + endPoint);
		var url = new java.net.URL(urlDominio + endPoint);
		var connection = url.openConnection();
		connection.setRequestMethod("GET");
		connection.setRequestProperty("Content-Type", "application/json");
		connection.setRequestProperty("Accept", "application/json");
		connection.setRequestProperty("Dominio", dominioMarca);
		connection.setRequestProperty("Usuario", user);
		connection.setRequestProperty("Senha", pass);
		connection.setRequestProperty("Parametros", '{"LIMIT": "' + limit
			+ '", "CRM": "' + crm
			+ '", "NOME": "' + nome
			+ '","EMAIL": "' + email
			+ '","TELEFONE_COMERCIAL": "' + telefoneComercial
			+ '"}');

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
		dataset.addColumn("CRM");
		dataset.addColumn("NOME");
		dataset.addColumn("EMAIL");
		dataset.addColumn("TELEFONE_COMERCIAL");

		log.info(">>>>> jsonObject.length: " + jsonObject.length);

		for (var i = 0; i < jsonObject.length; i++) {
			dataset.addRow([jsonObject[i].crm,
			jsonObject[i].nome,
			jsonObject[i].email,
			jsonObject[i].telefoneComercial
			]);

		}

		return dataset;

	} catch (e) {
		var datasetError = DatasetBuilder.newDataset();
		datasetError.addColumn('Erro');
		datasetError.addRow(["Erro ao executar Dataset Pleres Consulta Especialidades: " + e])
		log.info(">>>>> Erro ao executar Dataset Pleres Consulta Especialidades: " + e)
		return datasetError;
	}

}