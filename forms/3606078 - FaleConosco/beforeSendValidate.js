var beforeSendValidate = function (numState, nextState) {
    console.log("#### custom validate: numState: " + numState);
    var msg = "";

    if (FORM_STATE == 0 || FORM_STATE == 4) {
        if ($("#ACAO___1").val()[0] == 'ENCERRADO COM PACIENTE'){
            if ($("#observacoes___1").val() == '' || $("#observacoes___1").val() == undefined){
                msg += "Campo Tratativa da Ocorrência está vazio <br>"
            }
        }
        if (!$("#cadastroPaciente").is(":checked") && !$("#buscaPacienteFlg").is(":checked")) {
            if($("#tipoAtendimento").val() == "1"){

                if ($("#NomePaciente").val() == null) {
                    msg += "Campo Nome Paciente está vazio <br>"
                }
                if ($("#cpf").val() == null) {
                    msg += "Campo CPF está vazio <br>"
                }
            }
        }
        if ($("#buscaPacienteFlg").is(":checked")) {
            if($("#tipoAtendimento").val() == "1"){
                if ($("#NomePaciente2").val() == null) {
                    msg += "Campo Nome Paciente está vazio <br>"
                }
                if ($("#cpf2").val() == null) {
                    msg += "Campo CPF está vazio <br>"
                }
            }
        }
        if ($("#cadastroPaciente").is(":checked")) {
            if($("#tipoAtendimento").val() == "1"){
                if ($("#NomePaciente1").val() == null) {
                    msg += "Campo Nome Paciente está vazio <br>"
                }
                if ($("#cpf1").val() == null) {
                    msg += "Campo CPF está vazio <br>"
                }
                if ($("#email").val() == "") {
                    msg += "Campo Email está vazio <br>"
                }
                if ($("#celular").val() == "") {
                    msg += "Campo Celular está vazio <br>"
                }
                if ($("#telefone").val() == "") {
                    msg += "Campo Telefone está vazio <br>"
                }
            }
        }

        if ($("#dataAtendimento").val() == "") {
            msg += "Campo Data Atendimento está vazio <br>"
        }
        if ($("#tipoAtendimento").val() == "") {
            msg += "Campo Tipo Atendimento está vazio <br>"
        }
        if ($("#Marca").val() == null) {
            msg += "Campo Marca está vazio <br>"
        }
        if ($("#Unidade").val() == null) {
            msg += "Campo Unidade está vazio <br>"
        }

        if ($("#manifestacao").val() == "") {
            msg += "Campo Manifestação está vazio <br>"
        }

        if ($("#tipoOcorrencia").val() == null) {
            msg += "Campo Área- Comunicação está vazio <br>"
        }
        if ($("#assunto").val() == null) {
            msg += "Campo Assunto está vazio <br>"
        }
        if ($("#ocorrencia").val() == null) {
            msg += "Campo Ocorrencia está vazio <br>"
        }
        if ($("#comunicacao").val() == null) {
            msg += "Campo Origem está vazio <br>"
        }


    }

    if (FORM_STATE == 15) {
        campo = $('.btnAdicionaComentario');

        if (!campo[0].disabled) {
            msg += 'Precisa adicionar linha nova de atendimento <br>'
        }


    }

    if (FORM_STATE == 0 || FORM_STATE == 4 || FORM_STATE == 15) {
        aAcao = $("select[name*='ACAO___']");


        if (aAcao.length > 0) {
            var coluna = aAcao.length - 1;
            var id = aAcao[coluna].id;
            var linha = aAcao[coluna].id.substring(7, aAcao[coluna].id.length);

            if (FORM_STATE == 15 && $('#' + id).val().toString() == "ENCAMINHAR AO PONTO FOCAL") {
                if ($("#grupPontoFocal___" + linha).val() == "" || $("#grupPontoFocal___" + linha).val() == null) {
                    msg += "Campo Grupo Ponto Focal está vazio.<br>";
                }
            }

            if ($('#' + id).val() != null && $('#' + id).val() != "") {

                if ($('#' + id).val().toString() == "ENCERRADO COM PACIENTE" || $('#' + id).val().toString() == "RETORNO DO PONTO FOCAL") {
                    if ($('#CAUSARAIZ___' + linha).val() == null) {
                        msg += "Campo Causa Raiza está vazio.<br>";
                    }

                    if ($("#contatoPaciente___" + linha).val() == "") {
                        msg += "Campo Contato com  Paciente está vazio.<br>";
                    }
                }


            } else {
                msg += "O Campo Ação está vazio.<br>";
            }


        }

    }


    if (msg != "") {
        throw msg
    }

    return true
}