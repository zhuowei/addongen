"use strict";
(function() {
var template, nameText, packageText, mcpeversionText, generateButton;

function doProcess(inputName) {
	return inputName.indexOf(".so") < 0;
}

function processFile(inputText) {
	return inputText.
		replace(/SKEL_GEN_LOCAL_MODULE_NAME/g, packageText.value.toString()).
		replace(/SKEL_GEN_NAME/g, nameText.value.toString()).
		replace(/SKEL_GEN_ESCAPED_NAME/g, packageText.value.toString().split(".").pop()).
		replace(/SKEL_GEN_LOG_TAG/g, packageText.value.toString().split(".").pop()).
		replace(/SKEL_GEN_PACKAGE/g, packageText.value.toString()).
		replace(/SKEL_GEN_MCPEVERSION/g, mcpeversionText.value.toString());
}

function generateZip() {
	if (packageText.value.length == 0 | packageText.value.toLowerCase() != packageText.value) {
		alert("Invalid package");
		return;
	}
	if (nameText.value.length == 0) {
		alert("Invalid name");
		return;
	}
	if (mcpeversionText.value.length == 0) {
		alert("Invalid MCPE version");
		return;
	}
	var output = new JSZip();
	var files = template.file(/.*/);
	for (var i = 0; i < files.length; i++) {
		var retval = doProcess(files[i].name)? processFile(files[i].asText()): files[i].asBinary();
		output.file(files[i].name, retval, {"binary" : "true"});
	}
	console.log(output.file(/.*/));
	var outputEncoded = output.generate({
		type: "base64"
	});
	window.location.href = "data:application/zip;base64," + outputEncoded;
}

function loadHandler() {
	template = new JSZip(templateJs, {
		"base64": true
	});
	nameText = document.getElementById("name");
	packageText = document.getElementById("package");
	mcpeversionText = document.getElementById("mcpeversion");
	generateButton = document.getElementById("generatebutton");
	generateButton.onclick = generateZip;
}

window.onload = loadHandler;

})();
