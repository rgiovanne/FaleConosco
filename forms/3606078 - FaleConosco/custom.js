$(document).ready(function () {
    //initZoom();
    var row = '';

    if (FORM_MODE == 'VIEW') {
        if ($("#cadastroPaciente").is(":checked")) {
            $("#cadastrarPaciente").hide();
        } else {
            $('#historicoPaciente').hide();
        }

        if ($("#cadastroPacienteConcierge").is(":checked")) {
            $("#cadastrarMedicos").hide();
        } else {
            $('#historicoPacienteConcierge').hide();
        }

    }

    if ($("#cadastroMedico").is(":checked")) {
        $('.campocadastroMedico').show();
        $('.campozoomMedico').hide();
        $("#historicoPacienteConcierge").hide();
    } else if ($("#buscaPacienteConcierge").is(":checked")) {
        // $('.campocadastroMedico').hide();
        // $('.campozoomMedico').hide();
        // $('.campobuscaMedico').show();
    } else {
        $('.campocadastroMedico').hide();
        $('.campozoomMedico').show();
        $("#historicoPacienteConcierge").show();

        //$('#telMedico').prop('readonly', true);
        //$('#emailMedico').prop('readonly', true);
    }

    if ($("#cadastroPaciente").is(":checked")) {
        $('.campocadastro').show();
        $('.campozoom').hide();

    } else if ($("#buscaPacienteFlg").is(":checked")) {
        $('.campocadastro').hide();
        $('.campozoom').hide();
        $('.campobusca').show();
        $('.liberarcampo').prop('readonly', true);

    } else {
        $('.campocadastro').hide();
        $('.campozoom').show();
        $('.campobusca').hide();

        $('.liberarcampo').prop('readonly', true);
    }

    if ($("#mostrarPaciente").is(":checked")) {
        $('.campozoomAtrelar').show();

    } else {
        $('.campozoomAtrelar').hide();

    }

    $("#NomePaciente1").blur(function () {
        $('#NomePaciente_Hist').val($('#NomePaciente1').val());
    });

    $("#cpf").blur(function () {
        $('#CPF_Hist').val($('#cpf').val());
    });

    $("#cpf1").blur(function () {
        $('#CPF_Hist').val($('#cpf1').val());
    });
    $("#cpf2").blur(function () {
        $('#CPF_Hist').val($('#cpf2').val());
    });

    $("#cpfPacienteConcierge").blur(function () {
        $('#CPF_Hist').val($('#cpfPacienteConcierge').val());
    });
    $("#NomePacienteConcierge").blur(function () {
        $('#NomePaciente_Hist').val($('#NomePacienteConcierge').val());
    });
    $("#NomePaciente").blur(function () {
        $('#NomePaciente_Hist').val($('#NomePaciente').val());
    });
    $("#NomePaciente1").blur(function () {
        $('#NomePaciente_Hist').val($('#NomePaciente1').val());
    });
    $("#NomePaciente2").blur(function () {
        $('#NomePaciente_Hist').val($('#NomePaciente2').val());
    });


    $("#cadastroPaciente").click(function () {
        if ($("#cadastroPaciente").is(":checked")) {
            $('.campocadastro').show();
            $('.campozoom').hide();
            $('.campobusca').hide();
            $('#historicoPaciente').hide();
            $('.liberarcampo').prop('readonly', false);

            $(".pacienteObriga").addClass("required");

            $('#email').val('');
            $('#celular').val('');
            $('#telefone').val('');
            $('#nomeTitular').val('');
            $('#cpfTitular').val('');
            $('#numPleres').val('');
            $("#cpf").val('').trigger('change');
            $("#NomePaciente").val('').trigger('change');
            $('#buscaPacienteFlg').prop('checked', false);

        } else {
            $('.campocadastro').hide();
            $('.campozoom').show();
            $('.campobusca').hide();
            $('#historicoPaciente').show();
            $('.liberarcampo').prop('readonly', true);
            $(".pacienteObriga").removeClass("required");
        }
    });

    $("#cadastroMedico").click(function () {
        if ($("#cadastroMedico").is(":checked")) {
            $('.campocadastroMedico').show();
            $('.campozoomMedico').hide();
            // $('.campobusca').hide();
            $('#historicoPacienteConcierge').hide();
            $('.liberarcampoMedico').prop('readonly', false);
            $(".pacienteObriga").addClass("required");
            $('#telMedico').val('');
            $('#emailMedico').val('');

        } else {
            $('.campocadastroMedico').hide();
            $('.campozoomMedico').show();
            // $('.campobusca').hide();
            $('#historicoPacienteConcierge').show();
            //$('.liberarcampoMedico').prop('readonly', true);

        }
    });

    $("#buscaPacienteFlg").click(function () {
        if ($("#buscaPacienteFlg").is(":checked")) {
            $('.campocadastro').hide();
            $('.campozoom').hide();
            $('.campobusca').show();
            $('#historicoPaciente').show();
            $('.liberarcampo').prop('readonly', true);

            $('#email').val('');
            $('#celular').val('');
            $('#telefone').val('');
            $('#nomeTitular').val('');
            $('#cpfTitular').val('');
            $('#numPleres').val('');
            $("#cpf").val('').trigger('change');
            $("#NomePaciente").val('').trigger('change');
            $('#cadastroPaciente').prop('checked', false);

        } else {
            $('.campocadastro').hide();
            $('.campozoom').show();
            $('.campobusca').hide();
            $('#email').val('');
            $('#celular').val('');
            $('#telefone').val('');
            $('#nomeTitular').val('');
            $('#cpfTitular').val('');
            $('#numPleres').val('');
            $("#cpf2").val('').trigger('change');
            $("#NomePaciente2").val('').trigger('change');
            $('.liberarcampo').prop('readonly', true);
        }
    });

    $("#mostrarPaciente").click(function () {
        if ($("#mostrarPaciente").is(":checked")) {
            $('.campozoomAtrelar').show();
        } else {
            $('.campozoomAtrelar').hide();

        }
    });

    $("#cadastrarPaciente").click(function () {

        var retorno = gravarPaciente();

    });

    $("#cadastrarMedico").click(function () {

        var retorno = gravarMedico();

    });


    if (FORM_STATE != 0) {
        $('#numSolicitacao').val(FORM_SOLICITACAO);
    }

    if (FORM_STATE == 15 || FORM_STATE == 19 || FORM_STATE == 24) {
        if ($("#tipoAtend").val() == "2") {

            $("#conciergeT").show();
            $("#faleConoscoT").hide();

            $("#concierge").show();
            $("#faleConosco").hide();

            $("#rspPadrao").hide();

        } else if ($("#tipoAtend").val() == "1") {

            $("#faleConoscoT").show();
            $("#conciergeT").hide();

            $("#faleConosco").show();
            $("#concierge").hide();

            $("#rspPadrao").show();

        }
    }

    if (FORM_STATE == 0) {
        row = wdkAddChild("tbDocumentos");
        $('#linha').val(row);
        $('.grupopontofocal').hide();
        reloadZoomFilterValues("ACAO___" + row, "Tabela,SUQ,Where,UQ_VALIDO =1 AND UQ_SOLUCAO = '000002' OR UQ_SOLUCAO = '000003' ");
    } else {
        $('.grupopontofocal').show();
    }


    if (FORM_STATE == 15 || FORM_STATE == 13) {
        $('.btn_add').show();
        $('.btnAdicionaComentario').prop('disabled', false)

    }

    $('.btnAdicionaComentario').click(function () {
        row = wdkAddChild("tbDocumentos");
        $('.btnAdicionaComentario').prop('disabled', true);
        $('#linha').val(row);
        reloadZoomFilterValues("grupPontoFocal___" + $("#linha").val(), "Grupo,SAC_APF_" + $('#Unidade').val() + "_" + $("#codTipoOcorrencia").val());

        if (FORM_STATE == 15) {
            reloadZoomFilterValues("ACAO___" + row, "Tabela,SUQ,Where,UQ_VALIDO =1 AND UQ_SOLUCAO = '000002' OR UQ_SOLUCAO = '000003' ");

        }

    });

    $('#historicoPaciente').click(function () {
        pegaHistorioPaciente();
    });

    $('#historicoConcierge').click(function () {
        pegaHistorioPaciente();
    });
    $('#historicoMedico').click(function () {
        pegaHistorioMedico();
    });

    $("#tipoAtendimento").click(function () {

        reloadZoomFilterValues("tipoOcorrencia", "UX_XTPATEN," + $('#tipoAtendimento').val());

        //reloadZoomFilterValues("comunicacao", "tipoOcorrencia," + $('#tipoAtendimento').val());

        if ($("#tipoAtendimento").val() == "2") {

            reloadZoomFilterValues("Marca", "ZI_CODIGO2,'007';'002';'017';'005';'00804'");

            $("#conciergeT").show();
            $("#faleConoscoT").hide();

            $("#concierge").show();
            $("#faleConosco").hide();
            $("#crm").val("").trigger('change');
            $("#crm1").val("").trigger('change');
            $("#nomeMedico").val("").trigger('change');
            $("#nomeMedico1").val("").trigger('change');
            $("#cpfPacienteConcierge").val("").trigger('change');
            $("#NomePacienteConcierge").val("").trigger('change');

            $("#rspPadrao").hide();
            $("#tipoAtend").val($("#tipoAtendimento").val());

        } else if ($("#tipoAtendimento").val() == "1") {

            reloadZoomFilterValues("Marca", "");

            $("#faleConoscoT").show();
            $("#conciergeT").hide();

            $("#faleConosco").show();
            $("#concierge").hide();


            $("#NomePaciente").val("").trigger('change');;
            $("#cpf").val("").trigger('change');
            $("#NomePaciente1").val("").trigger('change');
            $("#cpf1").val("").trigger('change');
            $("#NomePaciente2").val("").trigger('change');
            $("#cpf2").val("").trigger('change');


            $("#rspPadrao").show();
            $("#tipoAtend").val($("#tipoAtendimento").val());

        }

    });

    var onlyDate = FLUIGC.calendar('.date', {
        pickDate: true,
        pickTime: false
    });

});
function pegaHistorioMedico() {
    var c1 = '';

    if (($('#nomeMedico').val() != "" && $("#nomeMedico").val() != null)) {
        if ($('#crm').val() != '' && $('#crm').val() != null) {
            c1 = DatasetFactory.createConstraint('crm', $("#crm").val().toString(), $("#crm").val().toString(), ConstraintType.SHOULD);
        } else {
            c1 = DatasetFactory.createConstraint('#nomeMedico', $('#nomeMedico').val().toString(), $('#nomeMedico').val().toString(), ConstraintType.MUST);
        }
    }

    var dataset = DatasetFactory.getDataset('ds_FaleConosco', null, [c1], null);


    var html = '<div style="overflow: auto; width: 850px; height: 400px; border:solid 1px">' +
        '<table class="table" data-sortlist="[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0]]" id="tableHist" border=0 width="890">' +
        '<thead>' +
        '<tr><th colspan="4">Histório Médico</th></tr>' +
        '<tr>' +
        '<th>Nome</th>' +
        '<th>CRM</th>' +
        '<th>Dt Atendimento</th>' +
        '<th>Assunto</th>' +
        '<th>Ocorrencia</th>' +
        '<th>Status</th>' +
        '<th>Número Fluig</th>' +
        '<th>Tipo de Atendimento</th>' +
        '<th>Complemento</th>' +
        '<th></th>' +
        '</tr>' +
        '</thead>' +
        '<tfoot>' +
        '<tr><td colspan="4">Click no médico que quer abrir.</td></tr>' +
        '</tfoot>' +
        '<tbody>'

    for (var x = 0; x < dataset.values.length; x++) {
        var c3 = DatasetFactory.createConstraint('processInstanceId', dataset.values[x].numSolicitacao, dataset.values[x].numSolicitacao, ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint('active', true, true, ConstraintType.SHOULD);
        var c5 = DatasetFactory.createConstraint('choosedSequence', '19', '19', ConstraintType.SHOULD);

        var datasetHistorico = DatasetFactory.getDataset('processTask', null, [c3, c4, c5], null);
        if (datasetHistorico.values.length == 1) {
            var bloq = "";
            var nomeMed = "";
            var crm = "";
            var statusAtendimento = datasetHistorico.values[0].status;
            if ($("#crm").val() != null) {
                var tpAtend = dataset.values[x].tipoAtendimento;
                if (tpAtend == 1) {
                    tpAtend = "Fale Conosco"
                } else if (tpAtend == 2) {
                    tpAtend = "Concierge"
                }
                if (statusAtendimento == 0) {
                    statusAtendimento = "Aberta"
                } else if (statusAtendimento == 2) {
                    statusAtendimento = "Finalizada"
                    bloq = "disabled";
                }

                //if para pegar o nome com o campo valido
                if (dataset.values[x].nomeMedico != "" && dataset.values[x].nomeMedico != null) {
                    nomeMed = dataset.values[x].nomeMedico
                } else if (dataset.values[x].nomeMedico1 != "" && dataset.values[x].nomeMedico1 != null) {
                    nomeMed = dataset.values[x].nomeMedico1
                }

                //if para pegar o cpf com o campo valido

                if (dataset.values[x].crm != "" && dataset.values[x].crm != null) {
                    crm = dataset.values[x].crm
                } else if (dataset.values[x].crm1 != "" && dataset.values[x].crm1 != null) {
                    crm = dataset.values[x].crm1
                }


                html += '<tr>' +
                    '<td><a href="https://alliarpoc.fluig.com/portal/p/1/ecmnavigation?app_ecm_navigation_doc=' + dataset.values[x].documentid + '" target="_blank">' + nomeMed + '</td>' +
                    '<td>' + crm + '</td>' +
                    '<td>' + dataset.values[x].dataAtendimento + '</td>' +
                    '<td>' + dataset.values[x].assunto + '</td>' +
                    '<td>' + dataset.values[x].ocorrencia + '</td>' +
                    '<td>' + statusAtendimento + '</td>' +
                    '<td>' + dataset.values[x].numSolicitacao + '</td>' +
                    '<td>' + tpAtend + '</td>' +
                    '<td><input type="text" name="Complemento_' + x + '" id="Complemento_' + x + '" class="form-control" ' + bloq + '></td>' +
                    '<td><input type="button" class="btn btn-info" name="adicionar_' + x + '" id="adicionar_' + x + '" value="Enviar" onclick="enviarComent(this.id,' + dataset.values[x].numSolicitacao + ')" ' + bloq + '></td>' +
                    '</tr>'
            }
        }

    }

    html += '</table>' + '</div>';


    var myModal = FLUIGC.modal({
        title: 'Historico Médico',
        content: html,
        id: 'fluig-modal',
        size: 'large',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function (err, data) {
        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });

    // $("#tableHist").tablesorter({

    //     sortList: [[6, 0]]
    // });

}
function pegaHistorioPaciente() {
    var c1 = '';

    if (($('#NomePaciente_Hist').val() != "" && $("#NomePaciente_Hist").val() != null)) {
        if ($('#CPF_Hist').val() != '' && $('#CPF_Hist').val() != null) {
            c1 = DatasetFactory.createConstraint('CPF_Hist', $("#CPF_Hist").val().toString(), $("#CPF_Hist").val().toString(), ConstraintType.SHOULD);
        } else {
            c1 = DatasetFactory.createConstraint('#NomePaciente_Hist', $('#NomePaciente_Hist').val().toString(), $('#NomePaciente_Hist').val().toString(), ConstraintType.MUST);
        }
    }

    var dataset = DatasetFactory.getDataset('ds_FaleConosco', null, [c1], null);


    var html = '<div style="overflow: auto; width: 850px; height: 400px; border:solid 1px">' +
        '<table class="table" data-sortlist="[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0]]" id="tableHist" border=0 width="890">' +
        '<thead>' +
        '<tr><th colspan="4">Histório Paciente</th></tr>' +
        '<tr>' +
        '<th>Nome</th>' +
        '<th>CPF</th>' +
        '<th>Dt Atendimento</th>' +
        '<th>Assunto</th>' +
        '<th>Ocorrencia</th>' +
        '<th>Status</th>' +
        '<th>Número Fluig</th>' +
        '<th>Tipo de Atendimento</th>' +
        '<th>Complemento</th>' +
        '<th></th>' +
        '</tr>' +
        '</thead>' +
        '<tfoot>' +
        '<tr><td colspan="4">Click no paciente que quer abrir.</td></tr>' +
        '</tfoot>' +
        '<tbody>'

    for (var x = 0; x < dataset.values.length; x++) {
        var c3 = DatasetFactory.createConstraint('processInstanceId', dataset.values[x].numSolicitacao, dataset.values[x].numSolicitacao, ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint('active', true, true, ConstraintType.SHOULD);
        var c5 = DatasetFactory.createConstraint('choosedSequence', '19', '19', ConstraintType.SHOULD);

        var datasetHistorico = DatasetFactory.getDataset('processTask', null, [c3, c4, c5], null);
        if (datasetHistorico.values.length == 1) {
            var bloq = "";
            var nomeCli = "";
            var cpfCli = "";
            var statusAtendimento = datasetHistorico.values[0].status;
            if ($("#CPF_Hist").val() != null) {
                var tpAtend = dataset.values[x].tipoAtendimento;
                if (tpAtend == 1) {
                    tpAtend = "Fale Conosco"
                } else if (tpAtend == 2) {
                    tpAtend = "Concierge"
                }
                if (statusAtendimento == 0) {
                    statusAtendimento = "Aberta"
                } else if (statusAtendimento == 2) {
                    statusAtendimento = "Finalizada"
                    bloq = "disabled";
                }

                //if para pegar o nome com o campo valido
                if (dataset.values[x].NomePaciente_Hist != "" && dataset.values[x].NomePaciente_Hist != null) {
                    nomeCli = dataset.values[x].NomePaciente_Hist
                } else if (dataset.values[x].NomePaciente != "" && dataset.values[x].NomePaciente != null) {
                    nomeCli = dataset.values[x].NomePaciente
                } else if (dataset.values[x].NomePaciente1 != "" && dataset.values[x].NomePaciente1 != null) {
                    nomeCli = dataset.values[x].NomePaciente1
                } else if (dataset.values[x].NomePaciente2 != "" && dataset.values[x].NomePaciente2 != null) {
                    nomeCli = dataset.values[x].NomePaciente2
                } else if (dataset.values[x].NomePaciente3 != "" && dataset.values[x].NomePaciente3 != null) {
                    nomeCli = dataset.values[x].NomePaciente3
                } else if (dataset.values[x].NomePacienteConcierge != "" && dataset.values[x].NomePacienteConcierge != null) {
                    nomeCli = dataset.values[x].NomePacienteConcierge
                }

                //if para pegar o cpf com o campo valido

                if (dataset.values[x].CPF_Hist != "" && dataset.values[x].CPF_Hist != null) {
                    cpfCli = dataset.values[x].CPF_Hist
                } else if (dataset.values[x].cpf != "" && dataset.values[x].cpf != null) {
                    cpfCli = dataset.values[x].cpf
                } else if (dataset.values[x].cpf1 != "" && dataset.values[x].cpf1 != null) {
                    cpfCli = dataset.values[x].cpf1
                } else if (dataset.values[x].cpf2 != "" && dataset.values[x].cpf2 != null) {
                    cpfCli = dataset.values[x].cpf2
                } else if (dataset.values[x].cpf3 != "" && dataset.values[x].cpf3 != null) {
                    cpfCli = dataset.values[x].cpf3
                } else if (dataset.values[x].cpfPacienteConcierge != "" && dataset.values[x].cpfPacienteConcierge != null) {
                    cpfCli = dataset.values[x].cpfPacienteConcierge
                }


                html += '<tr>' +
                    '<td><a href="https://alliarpoc.fluig.com/portal/p/1/ecmnavigation?app_ecm_navigation_doc=' + dataset.values[x].documentid + '" target="_blank">' + nomeCli + '</td>' +
                    '<td>' + cpfCli + '</td>' +
                    '<td>' + dataset.values[x].dataAtendimento + '</td>' +
                    '<td>' + dataset.values[x].assunto + '</td>' +
                    '<td>' + dataset.values[x].ocorrencia + '</td>' +
                    '<td>' + statusAtendimento + '</td>' +
                    '<td>' + dataset.values[x].numSolicitacao + '</td>' +
                    '<td>' + tpAtend + '</td>' +
                    '<td><input type="text" name="Complemento_' + x + '" id="Complemento_' + x + '" class="form-control" ' + bloq + '></td>' +
                    '<td><input type="button" class="btn btn-info" name="adicionar_' + x + '" id="adicionar_' + x + '" value="Enviar" onclick="enviarComent(this.id,' + dataset.values[x].numSolicitacao + ')" ' + bloq + '></td>' +
                    '</tr>'
            }
        }

    }

    html += '</table>' + '</div>';


    var myModal = FLUIGC.modal({
        title: 'Historico Paciente',
        content: html,
        id: 'fluig-modal',
        size: 'large',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function (err, data) {
        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });

    // $("#tableHist").tablesorter({

    //     sortList: [[6, 0]]
    // });
}

function BuscaUsuario(codUser) {
    var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', codUser, codUser, ConstraintType.MUST);

    var dataset = DatasetFactory.getDataset('colleague', null, [c1], null);

    if (dataset.values.length > 0) {
        var nome = dataset.values[0].colleagueName;
        return nome;
    }

}

function enviarComent(campo, Solicitacao) {
    var user = FORM_USER;
    var nome = BuscaUsuario(user)
    console.log('campo: ' + campo);
    var aCampos = campo.split('_');
    var linha = aCampos[1];
    var texto = 'Usuário ' + nome + ' Incluiu comentario:' + $('#Complemento_' + linha).val();
    console.log("TEXTO: " + texto);
    var resultado = '';

    if ($('#Complemento_' + linha).val() == '') {
        FLUIGC.message.alert({
            message: "Comentario está vazio",
            title: 'Message',
            label: 'OK'
        }, function (el, ev) {
            //Callback action executed by the user...

            //el: Element (button) clicked...
            //ev: Event triggered...

            //this.someFunc();
        });
        return
    }

    var c1 = DatasetFactory.createConstraint('Solicitacao', Solicitacao, Solicitacao, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('Texto', texto, texto, ConstraintType.MUST);

    var dataset = DatasetFactory.getDataset('ds_Complemetos', null, [c1, c2], null);

    if (dataset.values.length > 0) {
        resultado = dataset.values[0].Retorno;
    }

    FLUIGC.message.alert({
        message: resultado,
        title: 'Message',
        label: 'OK'
    }, function (el, ev) {
        //Callback action executed by the user...

        //el: Element (button) clicked...
        //ev: Event triggered...

        //this.someFunc();
    });
}

function setSelectedZoomItem(selectedItem) {
    var id = selectedItem.inputId;

    if (id.substring(0, 4) == 'ACAO') {
        var guardaId = id;
        id = id.substring(0, 4);
        var linha = guardaId.substring(7, guardaId.length);
    }

    if (id.substring(0, 14) == 'grupPontoFocal') {
        var guardaId = id;
        id = id.substring(0, 14);
        var linha = guardaId.substring(17, guardaId.length);
    }

    if (id.substring(0, 9) == 'CAUSARAIZ') {
        var guardaId = id;
        id = id.substring(0, 9);
        var linha = guardaId.substring(12, guardaId.length);
    }

    switch (id) {
        case 'Marca':
            $('#Marca').val(selectedItem.ZI_DESCRI);
            $('#codMarca').val(selectedItem.ZI_CODIGO);
            $('#codDominio').val(selectedItem.ZI_DOMINIO);
            reloadZoomFilterValues("Unidade", "Marca," + selectedItem.ZI_CODIGO);
            reloadZoomFilterValues("NomePaciente", "DOMINIO_MARCA," + selectedItem.ZI_DOMINIO);
            reloadZoomFilterValues("cpf", "DOMINIO_MARCA," + selectedItem.ZI_DOMINIO);
            reloadZoomFilterValues("crm", "DOMINIO_MARCA," + selectedItem.ZI_DOMINIO);
            reloadZoomFilterValues("nomeMedico", "DOMINIO_MARCA," + selectedItem.ZI_DOMINIO);
            reloadZoomFilterValues("cpfPacienteConcierge", "DOMINIO_MARCA," + selectedItem.ZI_DOMINIO);
            reloadZoomFilterValues("NomePacienteConcierge", "DOMINIO_MARCA," + selectedItem.ZI_DOMINIO);

            break;
        // case 'M0_CODFIL':
        //     $('#Unidade').val(selectedItem.M0_CODFIL);
        //     break; 
        case 'assunto':
            $('#codAssunto').val(selectedItem.X5_CHAVE);
            //setZoomData("nomePaciente2", selectedItem["codAssunto"]);
            reloadZoomFilterValues("ocorrencia", "Tabela,SU9,Where,U9_TIPOOCO = '" + $('#codTipoOcorrencia').val() + "' AND U9_ASSUNTO = '" + selectedItem.X5_CHAVE + "'");
            break;
        case 'tipoOcorrencia':
            $('#codTipoOcorrencia').val(selectedItem.UX_CODTPO);
            reloadZoomFilterValues("assunto", "Tipo_Ocorrencia," + selectedItem.UX_CODTPO);
            break;
        case 'ocorrencia':
            $('#codocorrencia').val(selectedItem.U9_CODIGO);
            reloadZoomFilterValues("respostaPadrao", "Ocorrencia," + selectedItem.U9_CODIGO);
            break;
        case 'respostaPadrao':
            //$('#respostaPadrao').val(selectedItem.ZUD_DESCRI);
            break
        case 'ACAO':
            // $('#acao').val(selectedItem.UQ_DESC);
            $('#codAcao').val(selectedItem.UQ_SOLUCAO);
            $('#ultAcao').val(selectedItem.UQ_DESC);
            var data = new Date();
            var dia = data.getDate();
            if (dia < 10) {
                dia = '0' + dia.toString();
            }
            var mes = data.getMonth() + 1;
            if (mes < 10) {
                mes = '0' + mes.toString();
            }
            var ano = data.getFullYear();
            var hora = data.getHours();
            if (hora < 10) {
                hora = '0' + hora.toString();
            }
            var minutos = data.getMinutes();
            if (minutos < 10) {
                minutos = '0' + minutos.toString();
            }


            if (selectedItem.UQ_SOLUCAO == '000004') {
                $('.atendimentoObrigat').addClass("required");
            } else if (selectedItem.UQ_SOLUCAO == '000002') {
                $('.pontofocal').addClass("required");
            }

            if (FORM_STATE == 15 && selectedItem.UQ_SOLUCAO == '000002') {

                $('#grupPontoFocal___' + linha).prop('disabled', true)

            } else {
                $('#grupPontoFocal___' + linha).prop('disabled', false)
            }

            var datahora = ano + '-' + mes + '-' + dia + 'T' + hora + ':' + minutos; //2019-07-11T11:00
            $('#dataehora___' + linha).val(datahora);

            if (selectedItem.UQ_SOLUCAO == "000002") {
                $('#fcr___' + linha).val("SIM")
                $('#fcrOculto').val("SIM");
            } else {
                $('#fcr___' + linha).val("NAO");
                $('#fcrOculto').val("NAO");
            }
            break
        case 'CAUSARAIZ':
            $('#ult_CAUSARAIZ').val($('#CAUSARAIZ___' + linha).val());
            break
        case 'NomePaciente':
            $('#NomePaciente_Hist').val(selectedItem.NOME);
            setZoomData("cpf", selectedItem.CPF);
            $('#CPF_Hist').val(selectedItem.CPF);
            $('#email').val(selectedItem.EMAIL);
            $('#celular').val(selectedItem.CELULAR);
            $('#telefone').val(selectedItem.TELEFONE);
            $('#nomeTitular').val(selectedItem.NOME_TITULAR);
            $('#cpfTitular').val(selectedItem.CPF_TITULAR);
            $('#numPleres').val(selectedItem.ULTIMO_ATENDIMENTO);

            break;

        case 'NomePaciente2':
            //$('#NomePaciente').val(selectedItem.NOME);
            $('#NomePaciente_Hist').val(selectedItem.nomePaciente);
            setZoomData("cpf2", selectedItem.cpfPaciente);
            $('#CPF_Hist').val(selectedItem.CPF);
            $('#email').val(selectedItem.emailPaciente);
            $('#celular').val(selectedItem.celularPaciente);
            $('#telefone').val(selectedItem.telPaciente);
            $('#nomeTitular').val(selectedItem.nomeTitular);
            $('#cpfTitular').val(selectedItem.telPaciente);

            break;

        case 'NomePaciente3':
            //$('#cpf3').val(selectedItem.CPF);
            $('#NomePaciente_Hist').val(selectedItem.NOME);
            setZoomData("cpf3", selectedItem.CPF);
            $('#CPF_Hist').val(selectedItem.CPF);
            $('#email').val(selectedItem.EMAIL);
            $('#celular').val(selectedItem.CELULAR);
            $('#telefone').val(selectedItem.TELEFONE);
            $('#nomeTitular').val(selectedItem.NOME_TITULAR);
            $('#cpfTitular').val(selectedItem.CPF_TITULAR);
            //$('#').val(selectedItem.MATRICULAPLANO);
            $('#numPleres').val(selectedItem.ULTIMO_ATENDIMENTO);

            break;

        case 'cpf3':
            //$('#NomePaciente3').val(selectedItem.NOME);
            $('#NomePaciente_Hist').val(selectedItem.NOME);
            setZoomData("NomePaciente3", selectedItem.NOME);
            $('#CPF_Hist').val(selectedItem.CPF);
            $('#email').val(selectedItem.EMAIL);
            $('#celular').val(selectedItem.CELULAR);
            $('#telefone').val(selectedItem.TELEFONE);
            $('#nomeTitular').val(selectedItem.NOME_TITULAR);
            $('#cpfTitular').val(selectedItem.CPF_TITULAR);
            $('#numPleres').val(selectedItem.ULTIMO_ATENDIMENTO);

            break;

        case 'crm':
            setZoomData("nomeMedico", selectedItem.NOME);
            setZoomData("telMedico", selectedItem.TELEFONE);
            setZoomData("emailMedico", selectedItem.EMAIL);
            //reloadZoomFilterValues("NomePacienteConcierge", "DOMINIO_MARCA," + selectedItem.ZI_DOMINIO);

            break;

        case 'nomeMedico':
            setZoomData("crm", selectedItem.CRM);
            setZoomData("telMedico", selectedItem.TELEFONE);
            setZoomData("emailMedico", selectedItem.EMAIL);
            break;

        case 'cpf':
            //$('#NomePaciente').val(selectedItem.NOME);
            setZoomData("NomePaciente", selectedItem.NOME);
            $('#NomePaciente_Hist').val(selectedItem.NOME);
            $('#CPF_Hist').val(selectedItem.CPF);
            $('#email').val(selectedItem.EMAIL);
            $('#celular').val(selectedItem.CELULAR);
            $('#telefone').val(selectedItem.TELEFONE);
            $('#nomeTitular').val(selectedItem.NOME_TITULAR);
            $('#cpfTitular').val(selectedItem.CPF_TITULAR);
            $('#numPleres').val(selectedItem.ULTIMO_ATENDIMENTO);
            break;

        case 'cpfPacienteConcierge':
            $('#NomePaciente_Hist').val(selectedItem.NOME);
            $('#CPF_Hist').val(selectedItem.CPF);
            $('#cpfPacienteConcierge').val(selectedItem.CPF);
            setZoomData("NomePacienteConcierge", selectedItem.NOME);
            $('#emailConcierge').val(selectedItem.EMAIL);
            $('#celularConcierge').val(selectedItem.CELULAR);
            $('#telefoneConcierge').val(selectedItem.TELEFONE);
            $('#nomeTitularConcierge').val(selectedItem.NOME_TITULAR);
            $('#cpfTitularConcierge').val(selectedItem.CPF_TITULAR);
            $('#numPleresConcierge').val(selectedItem.ULTIMO_ATENDIMENTO);
            break;

        case 'NomePacienteConcierge':
            $('#NomePaciente_Hist').val(selectedItem.NOME);
            $('#NomePacienteConcierge').val(selectedItem.NOME);
            $('#CPF_Hist').val(selectedItem.CPF);
            $('#cpfPacienteConcierge').val(selectedItem.CPF);
            setZoomData("cpfPacienteConcierge", selectedItem.CPF);
            $('#emailConcierge').val(selectedItem.EMAIL);
            $('#celularConcierge').val(selectedItem.CELULAR);
            $('#telefoneConcierge').val(selectedItem.TELEFONE);
            $('#nomeTitularConcierge').val(selectedItem.NOME_TITULAR);
            $('#cpfTitularConcierge').val(selectedItem.CPF_TITULAR);
            $('#numPleresConcierge').val(selectedItem.ULTIMO_ATENDIMENTO);
            break;

        case 'Unidade':
            //reloadZoomFilterValues("grupPontoFocal___" + $("#linha").val(), "Grupo,SAC_APF_" + selectedItem.M0_CODFIL);
            $('#M0_FILIAL').val(selectedItem.M0_FILIAL);
            break;
        case 'grupPontoFocal':
            $("#tpOcorrencia").val(selectedItem.groupId);
            $("#DescrigrupPontoFocal___" + linha).val(selectedItem.groupDescription);
            $("#ultgrupopontofocal").val(selectedItem.groupDescription)
            break
        default:
            break;
    }
}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

function removedZoomItem(removedItem) {
    var id = removedItem.inputId;

    if (id.substring(0, 4) == 'ACAO') {
        var guardaId = id;
        id = id.substring(0, 4);
        var linha = guardaId.substring(7, guardaId.length);
    }

    switch (id) {
        case 'tipoOcorrencia':
            $("#assunto").val('').trigger('change');
            $("#ocorrencia").val('').trigger('change');
            $("#respostaPadrao").val('').trigger('change');
            reloadZoomFilterValues("assunto", "");
            reloadZoomFilterValues("ocorrencia", "");
            reloadZoomFilterValues("respostaPadrao", "");

            break;
        case 'NomePaciente':
            $("#cpf").val('').trigger('change');
            $('#email').val('');
            $('#celular').val('');
            $('#telefone').val('');
            $('#nomeTitular').val('');
            $('#cpfTitular').val('');
            $('#numPleres').val('');
            break
        case 'cpf':
            $("#NomePaciente").val('').trigger('change');
            $('#email').val('');
            $('#celular').val('');
            $('#telefone').val('');
            $('#nomeTitular').val('');
            $('#cpfTitular').val('');
            $('#numPleres').val('');
            break
        case 'NomePaciente2':
            $("#cpf2").val('').trigger('change');
            $('#email').val('');
            $('#celular').val('');
            $('#telefone').val('');
            $('#nomeTitular').val('');
            $('#cpfTitular').val('');
            $('#numPleres').val('');
            break
        case 'cpf2':
            $("#NomePaciente2").val('').trigger('change');
            $('#email').val('');
            $('#celular').val('');
            $('#telefone').val('');
            $('#nomeTitular').val('');
            $('#cpfTitular').val('');
            $('#numPleres').val('');
            break
        case 'Marca':
            $('#codMarca').val("");
            $('#M0_FILIAL').val("");
            reloadZoomFilterValues("Unidade", "");
            $("#Unidade").val('').trigger('change');
            break
        case 'ACAO':
            $('.atendimentoObrigat').removeClass("required");
            $('.pontofocal').removeClass("required");
            $("#contatoPaciente___" + linha).val("");
            $("#fcr___" + linha).val("");
            $("#dataehora___" + linha).val("");
            $("#observacoes___" + linha).val("");
            $("#CAUSARAIZ___" + linha).val('').trigger('change');

            break;

        case 'Unidade':
            reloadZoomFilterValues("Unidade", "Marca," + $("#codMarca").val());
            break;
        default:
            break;
    }
}

function gravarTratativa(idCampo) {
    var campo = idCampo.id;
    $('#ult_tratativa').val($('#' + campo).val())
}