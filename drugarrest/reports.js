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

	let location = document.getElementById('location').value;
	let processedat = document.getElementById('processedat').value;
	buffer.push('');
	
	buffer.push(`[DETAILS OF THE INCIDENT]:`);
	if (location) buffer.push(`While being out on regular patrol, we responded to 10-66 dispatch calls at ${location}. When we arrived at the general vicinity, we started looking for anybody that was doing any sort of suspicious activities.`);
	
	let pospicSelected = document.getElementById('pospic');
	let pospicInformation = {
		'Yes': {
			text: 'After some time had passed, we managed to witness an individual walking up to the pedestrians passing by and handing something over to them. Once we managed to take a picture of the positive handoff, we moved in to approach the suspect in question.',
		},
		'No': {
			text: 'After some time had passed, we managed to witness an individual walking up to the pedestrians passing by and handing something over to them. Fearing that the suspect may leave the area, we moved in quickly without taking a picture of the positive handoff.',
		}
	};
	
	let pospicresult = pospicSelected.options[pospicSelected.selectedIndex].text;
	buffer.push(pospicInformation[pospicresult].text);
	buffer.push('');

	let susranSelected = document.getElementById('susran');
	let susranInformation = {
		'Yes': {
			text: 'Once we moved in to talk to the suspect, they made an attempt to run but they were eventually apprehended and placed under police detainment.',
		},
		'No': {
			text: 'Once we moved in to talk to the suspect, they did not make an attempt to run and we had them detained for the time being until we gained more information about the scene.',
		}
	};
	
	let susranresult = susranSelected.options[susranSelected.selectedIndex].text;
	buffer.push(susranInformation[susranresult].text);
	
	let testresultsSelected = document.getElementById('testresults');
	let testresultsInformation = {
		'Negative': {
			text: 'Once we swabbed their hands for any possible drug residue and ran it through a test, the results came back negative for any drug residue.',
		},
		'Minor amounts': {
			text: 'Once we swabbed their hands for any possible drug residue and ran it through a test, the results came back positive for minor amounts of drug residue.',
		},
		'Moderate amounts': {
			text: 'Once we swabbed their hands for any possible drug residue and ran it through a test, the results came back positive for moderate amounts of drug residue.',
		}
	};
	
	let testresultsresult = testresultsSelected.options[testresultsSelected.selectedIndex].text;
	buffer.push(testresultsInformation[testresultsresult].text);

	let drugSelected = document.getElementById('drugtype');
	let drugInformation = {
		'Weed': {
			text: 'The drug specifically in question was weed.',
		},
		'Cocaine': {
			text: 'The drug specifically in question was cocaine.',
		},
		'Oxy': {
			text: 'The drug specifically in question was oxy.',
		},
		'Acid': {
			text: 'The drug specifically in question was acid.',
		},
		'Meth': {
			text: 'The drug specifically in question was meth.',
		}
	};
	
	let drugresult = drugSelected.options[drugSelected.selectedIndex].text;
	buffer.push(drugInformation[drugresult].text);
	buffer.push('');
	
	let medneedsus = document.getElementById('medneedsus').value;
	let medneedpd = document.getElementById('medneedpd').value;
	let hospitalname = document.getElementById('hospitalname').value;
	let processed = document.getElementById('processedat').value;

	if (document.getElementById('medneed').checked) {
		buffer.push(`[MEDICAL ATTENTION]:`);
		buffer.push(`After we apprehended the suspects, they were in need of medical attention. We brought the injured people (Suspects Total: ${medneedsus} | PD Total: ${medneedpd}) to ${hospitalname}.`);
		buffer.push(`Once everyone got medical treatment, we started heading back towards the PD.`)
	} else {
		buffer.push(`[MEDICAL ATTENTION]:`);
		buffer.push(`Due to no suspects or officers having any major injuries, everyone waved their rights to medical attention.`);
	}

	buffer.push('[PROCESSED]:');
	buffer.push(`All of the apprehended suspects were processed at ${processed}.`);
	
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
