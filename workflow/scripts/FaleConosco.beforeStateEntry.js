function beforeStateEntry(sequenceId) {
  log.info("teste Notificação");
  var processo = getValue("WKNumProces");
  var atividade = getValue("WKNumState") + '';
  var user = getValue("WKUser");
  var aUsuario = buscaUser(user);
  var urlDominio = "https://alliarpoc.fluig.com";
  var urlSolicitacao = urlDominio + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + processo;
  //var motivo = hAPI.getCardValue("textMotivoReprova");

  log.info("MOTIVOOOOOOOO ");
  log.info(
    "Processo: " +
    processo +
    " Atividade: " +
    atividade +
    " Próxima: " +
    sequenceId +
    " Usuario: " +
    aUsuario[1] +
    " urlSolicitacao: " +
    urlSolicitacao
    //" motivo: " +
    //motivo
  );


  if (atividade !== "5" && sequenceId === 9) {
    log.info("ENVIOU!!!!!!!!");
    var userSolic = hAPI.getCardValue("codSolic")
    var aUserSolic = buscaUser(userSolic);
    try {
      log.info("TRYYYYYYYYYYYYYYYYYYYY!!!!!!!!");
      //Monta mapa com parâmetros do template
      var parametros = new java.util.HashMap();
      parametros.put("usuario", aUserSolic[1]);
      parametros.put("solicitacao", processo);
      parametros.put("urlDominio", urlDominio);
      //parametros.put("motivo", motivo);
      parametros.put("urlSolicitacao", urlSolicitacao);

      //Este parâmetro é obrigatório e representa o assunto do e-mail
      parametros.put("TESTEEEEEEEEEEEEEEEE");

      //Monta lista de destinatários
      var destinatarios = new java.util.ArrayList();
      log.info("email do usuario!!!!!!!!!!!!");
      log.info(aUserSolic[0]);
      log.info(aUserSolic[1]); //log.info(aUsuario[0])
      destinatarios.add("roger.augusto@compila.com.br"); //destinatarios.add(emailInicial);

      //Envia e-mail
      notifier.notify(
        "admin",
        "inicio_faleConosco",
        parametros,
        destinatarios,
        "text/html"
      );
    } catch (e) {
      log.info("erro no envio de e-mail ");
      log.info(e);
    }
  }


}

function buscaUser(user) {
  var aUsuario = new Array();

  var c1 = DatasetFactory.createConstraint(
    "colleagueId",
    user,
    user,
    ConstraintType.MUST
  ); //colleaguePK.
  var dataset = DatasetFactory.getDataset("colleague", null, [c1], null);
  log.info("qtd retorno usuario " + dataset.rowsCount);
  if (dataset != null && dataset != undefined && dataset.rowsCount > 0) {
    aUsuario.push(dataset.getValue(0, "mail"));
    aUsuario.push(dataset.getValue(0, "colleagueName"));
  }

  return aUsuario;

}