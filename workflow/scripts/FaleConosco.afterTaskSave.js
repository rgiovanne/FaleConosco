function afterTaskSave(colleagueId, nextSequenceId, userList) {
	log.info("teste Notificação");
	var processo = getValue("WKNumProces");
	var atividade = getValue("WKNumState") + '';
	var aUsuario = [hAPI.getCardValue('emailMedico'), hAPI.getCardValue('nomeMedico')];
	var urlDominio = "https://alliarpoc.fluig.com";
	var urlSolicitacao =
		urlDominio +
		"/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo;
	var motivo = hAPI.getCardValue("tipoAtendimento");

	if (motivo == 1) {
		motivo = 'Fale Conosco'
	} else {
		motivo = 'Concierge'
	}
	log.info("MOTIVOOOOOOOO " + colleagueId);
	log.info(motivo);
	log.info(
		"Processo: " +
		processo +
		" Atividade: " +
		atividade +
		" Próxima: " +
		nextSequenceId +
		" Usuario: " +
		aUsuario[1] +
		" urlSolicitacao: " +
		urlSolicitacao
	);

	processo = "<strong>" + processo + "</strong>"
	urlSolicitacao = "<p><a href=" + urlSolicitacao + ">CLIQUE AQUI</a> para abrir a solicitação.<p>"
	if (atividade == 37) {
		var aUserSolic = aUsuario;
		try {
			log.info("TRYYYYYYYYYYYYYYYYYYYY!!!!!!!!");
			//Monta mapa com parâmetros do template
			var parametros = new java.util.HashMap();
			parametros.put("SOLICITANTE", aUserSolic[1]);
			parametros.put("NPROTOCOLO", processo);
			parametros.put("urlSolicitacao", urlSolicitacao);
			log.info("Solicitante: " + aUserSolic[1]);
			log.info("NPROTOCOLO: " + processo);
			log.info("urlDominio: " + urlDominio);

			//Este parâmetro é obrigatório e representa o assunto do e-mail
			parametros.put("ASSUNTO", motivo);

			//Monta lista de destinatários
			var destinatarios = new java.util.ArrayList();
			log.info("Usuario para envio");
			log.info(aUserSolic[0]);
			log.info(aUserSolic[1]); //log.info(aUsuario[0])
			destinatarios.add(aUserSolic[0]); //destinatarios.add(emailInicial);

			//Envia e-mail
			notifier.notify(
				"nr8n5w2c98gxgh1j1457025211780",
				"inicio_faleConosco",
				parametros,
				destinatarios,
				"text/html"
			);
			log.info("ENVIOU!");
		} catch (e) {
			log.info("erro no envio de e-mail ");
			log.info(e);
		}
	}

}

