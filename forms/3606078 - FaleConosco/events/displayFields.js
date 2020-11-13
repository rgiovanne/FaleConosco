function displayFields(form,customHTML){
	customHTML.append("<script>FORM_STATE = " + getValue("WKNumState") + ";</script>");
    customHTML.append("<script>FORM_MODE = \"" + form.getFormMode() + "\";</script>");
    customHTML.append("<script>FORM_USER = \"" + getValue('WKUser') + "\";</script>");
    customHTML.append("<script>FORM_SOLICITACAO = \"" + getValue("WKNumProces") + "\";</script>");
}