
function localizarPaciente(nome,cpf) {
    c1 = DatasetFactory.createConstraint('cpfPaciente',cpf,cpf,ConstraintType.MUST);
    c2 = DatasetFactory.createConstraint('nomePaciente',nome,nome,ConstraintType.MUST);

    var dataset = DatasetFactory.getDataset('ds_CadastroPaciente_FC', null,[c1,c2], null);

    return dataset.values.length; 

}