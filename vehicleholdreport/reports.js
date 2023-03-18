'use strict';

let buffer = [];

function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) localStorage.setItem('callsign', callsign);
	if (!callsign) callsign = '[missing]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];
	buffer.push("[REPORTING OFFICER]:");
	buffer.push(callsign);
	buffer.push('');
	
	let incident = document.getElementById('incidentnr').value;
	if (incident) buffer.push(`Incident Report Nr: ${incident}`);
	if (incident) buffer.push('');
	
	let holdtype = document.getElementById('holdtype').value;
	if (holdtype) buffer.push(`Hold Class Type: ${holdtype}`);
	if (holdtype) buffer.push('');

	let holdreason = document.getElementById('holdreason').value;
	buffer.push(`Hold Reason: ${holdreason}`);
	buffer.push('');

	let holdtime = document.getElementById('holdtime').value;
	if (holdtime) buffer.push(`Hold Time: ${holdtime}`);
	if (holdtime) buffer.push('');

	let vin = document.getElementById('vin').value;
	if (vin) buffer.push(`Vehicle VIN Nr: ${vin}`);
	if (vin) buffer.push('');
	
	let plate = document.getElementById('plate').value;
	if (plate) buffer.push(`Vehicle Plate Nr: ${plate}`);
	if (plate) buffer.push('');
	
	let owner = document.getElementById('owner').value;
	if (owner) buffer.push(`Vehicle Owner: ${owner}`);
	if (owner) buffer.push('');

	let vehicle = document.getElementById('vehiclename').value;
	if (vehicle) buffer.push(`Vehicle Model/Name: ${vehicle}`);
	if (owner) buffer.push('');

	let color = document.getElementById('vehiclecolor').value;
	if (color) buffer.push(`Vehicle Color: ${color}`);
//////////////////////////////////////////////////////////////////

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));

function loadName() {
	let callsign = '';
	if (localStorage.getItem('callsign')) callsign = localStorage.getItem('callsign');
	document.getElementById('yourself').value = callsign;
}

function showCopiedPopup() {
	let popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
	setTimeout(function() {
		popup.classList.toggle("show");
	}, 3500);
}

document.getElementById('copyReport').addEventListener('click', copy, false);
function clearSelection() {
	if (window.getSelection) {
		window.getSelection().removeAllRanges();
	} else if (document.selection) {
		document.selection.empty();
	}
}
function copy() {
	document.getElementById('reportBody').select();
	try {
		document.execCommand('copy');
		showCopiedPopup();
		clearSelection();
	} catch(e) {
		console.log("Copy error: " + e);
	}
}
