function enableFields(form) {

    if (FORM_STATE == 4) {
        $('#buscaPacienteFlg').prop("checked", true)
    }

    var FORM_STATE = getValue("WKNumState");
    log.info("FORM_STATE " + FORM_STATE);
    if (FORM_STATE == 15 || FORM_STATE == 13) {

        var indexes = form.getChildrenIndexes("tbDocumentos");
        for (var i = 0; i < indexes.length; i++) {
            form.setEnabled("observacoes___" + indexes[i], false);
            form.setEnabled("grupPontoFocal___" + indexes[i], false);
            form.setEnabled("contatoPaciente___" + indexes[i], false);
            form.setEnabled("CAUSARAIZ___" + indexes[i], false);
            form.setEnabled("ACAO___" + indexes[i], false);
        }
    }

    if (FORM_STATE != 0 && FORM_STATE != 4) {
        form.setEnabled("dataAtendimento", false);
        form.setEnabled("tipoAtendimento", false);
        form.setEnabled("NomePaciente", false);
        form.setEnabled("cpf", false);
        form.setEnabled("numPleres", false);
        form.setEnabled("manifestacao", false);
        form.setEnabled("tipoOcorrencia", false);
        form.setEnabled("assunto", false);
        form.setEnabled("ocorrencia", false);
        form.setEnabled("comunicacao", false);
        form.setEnabled("orientacao", false);
        form.setEnabled("respostaPadrao", false);
        form.setEnabled("Marca", false);
        form.setEnabled("Unidade", false);

    }
    if (FORM_STATE == 15) {

        form.setEnabled("Unidade", true);

    }


}

