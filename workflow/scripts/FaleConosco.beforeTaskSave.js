function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	log.info("BeforeTaskSave_Fale Conosco");
	var nProcess = getValue("WKNumProces");
	var atividade = getValue("WKNumState");
	var proximaAtiv = getValue("WKNextState");
	var user = getValue("WKUser");
	var assunto = hAPI.getCardValue("assunto");
	var email = hAPI.getCardValue("email");
	var paciente = hAPI.getCardValue("NomePaciente");
	var resposta = hAPI.getCardValue("respostaPadrao");
	var marca = hAPI.getCardValue("codMarca");
	var unidade = hAPI.getCardValue("Unidade");
	var origem = hAPI.getCardValue('comunicacao');
	var ocorrencia = hAPI.getCardValue("ocorrencia");
	var logo = "";
	var aUsuario = "";
	var acao = "";

	log.info("Resposta: " + resposta);
	log.info("atividade: " + atividade + "proximaAtiv: " + proximaAtiv)

	if (hAPI.getCardValue("numSolicitacao") == "") {
		hAPI.setCardValue("numSolicitacao", nProcess);
	}

	var centratarefa = hAPI.getCardValue("comunicacao") + '-' + hAPI.getCardValue("ocorrencia") + '-' + hAPI.getCardValue("assunto");

	if (atividade == 9 || proximaAtiv == 19) {

		hAPI.setCardValue("numSolicitacao", nProcess);
		hAPI.setCardValue("centralTarefa", centratarefa);
		//var cardData = hAPI.getCardData(nProcess);
		//getFilhosForm(cardData,'');

	}

	if ((atividade == 9 || proximaAtiv == 11) || proximaAtiv == 19) {
		log.info("Entrou na Proxima atividade 9 proxima 11 ");
		log.info("Marca: " + marca);

		if (marca == '004') {
			if (unidade == '00402SP0001') {
				logo = 'http://www.compila.com.br/alliar/rps_00402sp0001.png';
			} else {
				logo = 'http://www.compila.com.br/alliar/rps_' + marca + '.png'
			}

		} else {
			logo = 'http://www.compila.com.br/alliar/rps_' + marca + '.png'
		}
		log.info("Logo " + logo);
		log.info("#user # " + user);
		log.info("#nProcess " + nProcess);

		aUsuario = buscaUser(user);
		acao = BuscaAcao(nProcess);
		log.info("@@ Ação  @@ " + acao);
		log.info("USUARIO " + aUsuario[1] + ' - ' + aUsuario[0])
		var url = "https://alliartst.fluig.com:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_processInstanceId=" + nProcess + "&app_ecm_workflowview_currentMovto=4"
		if (aUsuario.length > 0) {
			try {
				//Monta mapa com parâmetros do template
				var parametros = new java.util.HashMap();
				parametros.put("Logo", logo);
				parametros.put("USUARIO", aUsuario[1]);
				parametros.put("SOLICITACAO", nProcess);
				parametros.put("URL", url);
				parametros.put("ORIGEM", origem);
				parametros.put("ASSUNTO", assunto);
				parametros.put("OCORRENCIA", ocorrencia);
				parametros.put("ACAO", acao);


				//Este parâmetro é obrigatório e representa o assunto do e-mail
				parametros.put("subject", assunto);

				//Monta lista de destinatários
				var destinatarios = new java.util.ArrayList();
				destinatarios.add(aUsuario[0]);
				//destinatarios.add("siga@alliar.com");

				//Envia e-mail
				//notifier.notify("admin", "EmailFaleConoscoInterno", parametros, destinatarios, "text/html");

			} catch (e) {
				log.info(e);
			}
		}

	}

	if (proximaAtiv == 19) { // || proximaAtiv == 13 atividade == 13
		log.info("Entrou na Proxima atividade 19 ");
		log.info("Marca: " + marca);
		if (resposta != "") {
			if (marca == '004') {
				if (unidade == '00402SP0001') {
					logo = 'http://www.compila.com.br/alliar/rps_00402sp0001.png';
				} else {
					logo = 'http://www.compila.com.br/alliar/rps_' + marca + '.png'
				}

			} else {
				logo = 'http://www.compila.com.br/alliar/rps_' + marca + '.png'
			}
			log.info("Logo " + logo);
			try {
				//Monta mapa com parâmetros do template
				var parametros = new java.util.HashMap();
				parametros.put("Logo", logo);
				parametros.put("Paciente", paciente);
				parametros.put("Resposta", resposta);

				//Este parâmetro é obrigatório e representa o assunto do e-mail
				parametros.put("subject", assunto);

				//Monta lista de destinatários
				var destinatarios = new java.util.ArrayList();
				//destinatarios.add("siga@alliar.com");//destinatarios.add("thiago.batista@compila.com.br");

				//Envia e-mail
				//notifier.notify("admin", "Email_FaleConosco", parametros, destinatarios, "text/html");

			} catch (e) {
				log.info(e);
			}

		}

	}

}

function buscaUser(user) {
	var aUsuario = new Array();

	var c1 = DatasetFactory.createConstraint('colleagueId', user, user, ConstraintType.MUST); //colleaguePK.
	var dataset = DatasetFactory.getDataset('colleague', null, [c1], null);
	log.info("qtd retorno usuario " + dataset.rowsCount);
	if (dataset != null && dataset != undefined && dataset.rowsCount > 0) {
		aUsuario.push(dataset.getValue(0, "mail"));
		aUsuario.push(dataset.getValue(0, "colleagueName"));
	}

	return aUsuario;

}

function BuscaAcao(nProcess) {

	//var childFields = new Array('CNE_ITEM', 'CNE_PRODUT', 'CNE_QUANT', 'CNE_VLUNIT', 'CNE_DTENT', 'CNE_VLTOT');
	log.info("nProcess " + nProcess);
	var cardData = hAPI.getCardData(nProcess);
	var detail = getFilhosForm(cardData);
	var acao = '';
	log.info("#detail.length " + detail.length);
	for (var i = 0; i < detail.length; i++) {
		var index = detail[i][0].split("___")[1];

		acao += cardData.get('acao___' + index) + '<br>'
		acao += cardData.get('observacoes___' + index) + '<br>'

		log.info('todos os itens: ' +
			cardData.get('acao___' + index) + ' ' +
			cardData.get('observacoes___' + index) + ' ');

	}

	return acao;
}

function getFilhosForm(form) {
	var cardData = new java.util.HashMap();

	//cardData = form.getCardData();
	cardData = form;

	var it = cardData.keySet().iterator();
	var listaFilho = new Array();
	log.info("#it.next() " + it.next());
	while (it.hasNext()) {
		var key = it.next();
		var campo = key.split("___");

		if (key.indexOf('___') >= 0) {
			log.info("Campos do Pai Filho -------- = " + key + " - " + cardData.get(key));
		}

		if (key.indexOf('acao___') >= 0) {
			listaFilho.push([key, cardData.get(key)]);
		}


	}
	return listaFilho;
}