function onNotify(subject, receivers, template, params){
	var atividade = getValue("WKNumState");
	var proximaAtiv = getValue("WKNextState");
	var marca = hAPI.getCardValue("Marca");
	
	if(atividade == 13 || atividade == 15){
		if (template == "TPLOVERDUE_TASK_TO_MANAGER") {
			var dataset = DatasetFactory.getDataset("ds_ConsultaAlcadaFaleConoscoGestor", null, null, null);
			for (var i = 0; i < dataset.rowsCount; i++) {
				if(dataset.getValue(i, "grupo") == "marca"){
					if(dataset.getValue(i, "marca") == marca){
						receivers.add(dataset.getValue(i, "usuario"));
					}
				}
			}
	        
	    }
	}
}