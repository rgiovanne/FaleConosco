
function localizarMedico(crm, nome) {
    c1 = DatasetFactory.createConstraint('crm', crm, crm, ConstraintType.MUST);
    c2 = DatasetFactory.createConstraint('nomeMedico', nome, nome, ConstraintType.MUST);

    var dataset = DatasetFactory.getDataset('ds_CadastroMedico', null, [c1, c2], null);

    return dataset.values.length;

}