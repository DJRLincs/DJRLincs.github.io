'use strict';

let buffer = [];
let officersInvolved = new Set();
let darkmodeState;
let alreadySpecifiedRobbery = false;
let ROBBERY_STATE = 'JEWLERY';

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
    
	buffer.push('[INCIDENT DETAILS]:');
	buffer.push('During normal patrol, we had a shootout happen between PD and another group.');

	let originS = document.getElementById('origin');
	let originInfo = {
		'10-90 (Bank)': {
			text: 'The whole shootout that has occured, originated from a 10-90 (Fleeca Bank) robbery.',
		},
		'10-90 (Jewelry)': {
			text: 'The whole shootout that has occured, originated from a 10-90 (Jewelry Store) robbery.',
		},
		'10-90 (Store)': {
			text: 'The whole shootout that has occured, originated from a 10-90 (Grocery Store) robbery.',
		},
		'10-11': {
			text: 'The whole shootout that has occured, originated from a 10-11 (Traffic Stop).',
		},
		'Shots Fired Calls': {
			text: 'The whole shootout that has occured, originated from 10-71s (Shots Fired Calls).',
		},
		'On-going shootout': {
			text: 'The whole shootout that has occured, originated from an on-going shootout.',
		}
	}
	let origin = originS.options[originS.selectedIndex].text;
	buffer.push(originInfo[origin].text);

	let location = document.getElementById('location').value;
    if (location) buffer.push(`The location being ${location}.`);
	buffer.push('');

	let sustotal = document.getElementById('nrtotal').value;
	let susdown = document.getElementById('nrtotalcaught').value;
	let pddown = document.getElementById('pdtotaldowned').value;
	buffer.push('After the shootout, we counted:');
	buffer.push(`- Suspects total: ${sustotal}`);
	buffer.push(`- Suspects downed: ${susdown}`);
	buffer.push(`- Officers downed: ${pddown}`);
	buffer.push('');

	let weaponname1 = document.getElementById('weaponname1').value;
	let serial1 = document.getElementById('serial1').value;
	let weaponname2 = document.getElementById('weaponname2').value;
	let serial2 = document.getElementById('serial2').value;
	let weaponname3 = document.getElementById('weaponname3').value;
	let serial3 = document.getElementById('serial3').value;
	let weaponname4 = document.getElementById('weaponname4').value;
	let serial4 = document.getElementById('serial4').value;
	let weaponname5 = document.getElementById('weaponname5').value;
	let serial5 = document.getElementById('serial5').value;
	let weaponname6 = document.getElementById('weaponname6').value;
	let serial6 = document.getElementById('serial6').value;
    buffer.push(`[WEAPONS INFORMATION]:`);
	if (weaponname1 || serial1) buffer.push(`Weapon: ${weaponname1} | Serial Number: ${serial1}`);
	if (weaponname2 || serial2) buffer.push(`Weapon: ${weaponname2} | Serial Number: ${serial2}`);
	if (weaponname3 || serial3) buffer.push(`Weapon: ${weaponname3} | Serial Number: ${serial3}`);
	if (weaponname4 || serial4) buffer.push(`Weapon: ${weaponname4} | Serial Number: ${serial4}`);
	if (weaponname5 || serial5) buffer.push(`Weapon: ${weaponname5} | Serial Number: ${serial5}`);
	if (weaponname6 || serial6) buffer.push(`Weapon: ${weaponname6} | Serial Number: ${serial6}`);
	buffer.push('');

	let medicalSelected = document.getElementById('medicalattention');
	let medicalInformation = {
		'Was requested by multiple suspects': {
			label: 'WAS REQUESTED',
			text: `After we apprehended the suspects, they requested medical attention. We then transported them to a hospital where they got further medical attention.`,
		},
		'Was requested by one suspect': {
			label: 'ONE REQUESTED',
			text: 'After we apprehended the suspects, one of them requested or needed medical attention. We then transported that suspect to a hospital where they got further medical attention.',
		},
		'Was not requested or needed': {
			label: 'WAS NOT REQUESTED',
			text: 'After we apprehended the suspects, they did not request or need any medical attention.',
		}
	};
	let medical = medicalSelected.options[medicalSelected.selectedIndex].text;
	

    buffer.push(`[MEDICAL ATTENTION | ${medicalInformation[medical].label}]:`);
	buffer.push(medicalInformation[medical].text);
	buffer.push('');

	let processed = document.getElementById('processedat').value;
    buffer.push('[PROCESSED]:');
	buffer.push(`All of the apprehended suspects were processed at ${processed}.`);
    
	buffer.push('');
	buffer.push('[BLANKET CHARGES]:');
	buffer.push('After we got them into the cells, we went with blanket charges on all of them. The charges we ended up giving them all were:');
	
	let charges = document.getElementById('charges').value;
	buffer.push(`${charges}`);

	let curDarkmode = document.getElementById('darkmode').checked;
	if (curDarkmode) {
		if (darkmodeState === 'false') updateDarkmode();
	} else if (!curDarkmode) {
		if (darkmodeState === 'true') updateDarkmode();
	}

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

// Listen for a click on the button
function updateDarkmode() {
	// Then toggle (add/remove) the .dark-theme class to the body
	let darkmode = document.getElementById('darkmode').checked;
	if (darkmode) {
		localStorage.setItem("darkmode", true);
		darkmodeState = 'true';
	} else if (!darkmode) {
		localStorage.setItem("darkmode", false);
		darkmodeState = 'false';
	}
	document.body.classList.toggle('dark-theme');
}

function loadDarkmode() {
	let darkmodeSetting = localStorage.getItem("darkmode");
	if (!darkmodeSetting || darkmodeSetting === 'undefined' || darkmodeSetting === 'false') {
		localStorage.setItem("darkmode", false);
		darkmodeState = 'false';
	}
	if (darkmodeSetting == 'true') {
		document.getElementById('darkmode').checked = true;
		document.body.classList.toggle('dark-theme');
		darkmodeState = 'true';
	}
	loadName();
	if (ROBBERY_STATE === 'JEWLERY') {
		document.getElementById('whatFleeca').style.display = 'none';
		document.getElementById('whatStore').style.display = 'none';
	}
	//loadOfficers();
}

let officers = null;
let matched = [];


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