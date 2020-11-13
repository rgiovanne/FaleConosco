function gravarMedico() {
    var myLoading1 = FLUIGC.loading('#YOUR-SELECTOR');
    myLoading1.show();
    var crm = $('#crm1').val();
    var nome = $('#nomeMedico1').val();
    var email = $('#emailMedico').val();
    var telefone = $('#telMedico').val();
    var qtd = 0;

    if (crm != "" && nome != "") {
        var qtd = localizarMedico(crm, nome);
        if (qtd > 0) {
            FLUIGC.toast({
                title: ' Medico Encontrado',
                message: "Medico já existe no cadastro do Fluig",
                type: 'danger'
            });
            myLoading1.hide();
            return;
        }
        var constraints = new Array();

        constraints.push(DatasetFactory.createConstraint('Crm', crm, crm, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('Nome', nome, nome, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('Email', email, email, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('Telefone', telefone, telefone, ConstraintType.MUST));

        var dataset = DatasetFactory.getDataset('Create_Medico', null, constraints, null);

        for (var x = 0; x < dataset.values.length; x++) {
            console.log("Retorno Gravação" + dataset.values[x].usuario);
            var retorno = dataset.values[x].usuario;
        }

    } else {
        FLUIGC.toast({
            title: ' Campo Vazio ',
            message: "Campo Nome ou CRM em branco",
            type: 'danger'
        });
        myLoading1.hide();
        return false;
    }

    myLoading1.hide();
    if (retorno == 'Sincronização completada com sucesso!') {
        FLUIGC.toast({
            title: 'Sucesso Gravação ',
            message: retorno,
            type: 'success'
        });
        return true;
    } else {
        FLUIGC.toast({
            title: 'Error na Gravação ',
            message: retorno,
            type: 'danger'
        });
        return false;
    }


}