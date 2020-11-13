function gravarPaciente() {
    var myLoading1 = FLUIGC.loading('#YOUR-SELECTOR');
    myLoading1.show();
    var Nome = $('#NomePaciente1').val();
    var cpf = $('#cpf1').val();
    var email = $('#email').val();
    var celular = $('#celular').val();
    var telefone = $('#telefone').val();
    var nomeTitular = $('#nomeTitular').val();
    var cpfTitular = $('#cpfTitular').val();
    var qtd = 0;

    if (Nome != "" && cpf != "") {
        var qtd = localizarPaciente(Nome, cpf);
        if (qtd > 0) {
            FLUIGC.toast({
                title: ' Paciente Encontrado',
                message: "Paciente já existe no cadastro do Fluig",
                type: 'danger'
            });
            myLoading1.hide();
            return;
        }
        var constraints = new Array();

        constraints.push(DatasetFactory.createConstraint('CPF', cpf, cpf, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('Nome', Nome, Nome, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('Email', email, email, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('Celular', celular, celular, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('Telefone', telefone, telefone, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('NOME_TITULAR', nomeTitular, nomeTitular, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('CPF_TITULAR', cpfTitular, cpfTitular, ConstraintType.MUST));

        var dataset = DatasetFactory.getDataset('Create_Paciente', null, constraints, null);

        for (var x = 0; x < dataset.values.length; x++) {
            console.log("Retorno Gravação" + dataset.values[x].usuario);
            var retorno = dataset.values[x].usuario;
        }

    } else {
        FLUIGC.toast({
            title: ' Campo Vazio ',
            message: "Campo Nome ou CPF em branco",
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