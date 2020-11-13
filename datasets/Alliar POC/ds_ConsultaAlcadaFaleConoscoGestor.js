
function createDataset(fields, constraints, sortFields) {
	log.info("Inicio do dataset Alcada Fale Conosco Gestor");
	var usuario ='';
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("usuario");
	dataset.addColumn("grupo");
	dataset.addColumn("marca");
	dataset.addColumn("unidade");
	dataset.addColumn("codFilial");
    
    for (var i = 0; i < constraints.length; i++) {
	    if (constraints[i].fieldName == 'NUMPROCESSO') {
	    	log.info('==== NUMPROCESSO ==== '+constraints[i].initialValue)
	        WKNumProces	= constraints[i].initialValue;
	    }
	    if (constraints[i].fieldName == 'Usuario') {
	    	log.info('==== USUARIO ==== '+constraints[i].initialValue)
	        usuario	= constraints[i].initialValue;
	    }
    }    
   //dataset.addColumn("txt_dataNotaInternaPaiFilho");
   //dataset.addColumn("txt_descNotaInternaPaiFilho");
    
    log.info("Dataset buscapaiefilho");
    
    //Cria a constraint para buscar os formulários ativos
    var constraints = new Array();
    
    var datasetPrincipal = DatasetFactory.getDataset("FormAlcadaFaleConosco", null, null, null);
    //log.info("datasetPrincipal "+Object.keys(datasetPrincipal));
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        log.info("Entrou no for datasetprincipal "+datasetPrincipal.rowsCount);
        var documentId      = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var constraintsFilhos = new Array();
        constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "tbItemSlCompra" ,"tbItemSlCompra", ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("FormAlcadaFaleConosco", null, constraintsFilhos, null);
        log.info("Entrou no for datasetFilhos "+datasetFilhos.rowsCount);//log.info("datasetFilhos "+Object.keys(datasetFilhos));
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
        	//if(datasetFilhos.getValue(j, "usuario") == usuario){
        		dataset.addRow(new Array(
                        datasetFilhos.getValue(j, "usuario"),
                        datasetFilhos.getValue(j, "grupo"), 
                        datasetFilhos.getValue(j, "marca"),
                        datasetFilhos.getValue(j, "unidade"),
                        datasetFilhos.getValue(j, "codFilial")));
        	//}
            
        }
   }

    return dataset;
	

}