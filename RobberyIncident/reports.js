'use strict';

let buffer = [];
let officersInvolved = new Set();
let alreadySpecifiedRobbery = false;
let ROBBERY_STATE = 'JEWLERY';

function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) {
		localStorage.setItem('callsign', callsign);
	}
	if (!callsign) callsign = '[Insert Callsign]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];
	buffer.push("[REPORTING OFFICER]:");
	buffer.push(callsign);	

	let scenecommand = document.getElementById('scenecommand').value;
	let negotiator = document.getElementById('negotiator').value;
	let hostagestayer = document.getElementById('hostagestayer').value;
// Pull Drivers List
	let primary = document.getElementById('primary').value;
	let secondary = document.getElementById('secondary').value;
	let tertiary = document.getElementById('tertiary').value;
	let parallel = document.getElementById('parallel').value;
	let airunit = document.getElementById('airunit').value;
	let bikeunit = document.getElementById('bikeunit').value;
// Pull passengers List
	let primaryp = document.getElementById('primaryp').value;
	let secondaryp = document.getElementById('secondaryp').value;
	let tertiaryp = document.getElementById('tertiaryp').value;
	let parallelp = document.getElementById('parallelp').value;
	let airp = document.getElementById('airp').value;

	if (scenecommand || negotiator) buffer.push('');
	
	if (scenecommand || negotiator || hostagestayer) buffer.push(`[SCENE ASSIGNMENT]:`);
	if (scenecommand) buffer.push(`Scene Command: ${scenecommand}`);
	if (negotiator) buffer.push(`Negotiator: ${negotiator}`);
	if (hostagestayer) buffer.push(`Stayed Back For Hostage: ${hostagestayer}`);
	
	buffer.push('');
	buffer.push(`[INVOLVED IN PURSUIT]:`);

	let primaryfinal = ''
	if (primary || !primaryp) primaryfinal = (`${primary}`);
	if (primaryp) primaryfinal = (`${primary} & ${primaryp}`);
	if (primaryfinal) buffer.push(`Primary: ${primaryfinal}`);
	
	let secondaryfinal = ''
	if (secondary || !secondaryp) secondaryfinal = (`${secondary}`);
	if (secondaryp) secondaryfinal = (`${secondary} & ${secondaryp}`);
	if (secondaryfinal) buffer.push(`Secondary: ${secondaryfinal}`);

	let tertiaryfinal = ''
	if (tertiary || !tertiaryp) tertiaryfinal = (`${tertiary}`);
	if (tertiaryp) tertiaryfinal = (`${tertiary} & ${tertiaryp}`);
	if (tertiaryfinal) buffer.push(`Tertiary: ${tertiaryfinal}`);

	let parallelfinal = ''
	if (parallel || !parallelp) parallelfinal = (`${parallel}`);
	if (parallelp) parallelfinal = (`${parallel} & ${parallelp}`);
	if (parallelfinal) buffer.push(`Parallel: ${parallelfinal}`);

	let airfinal = ''
	if (airunit || !airp) airfinal = (`${airunit}`);
	if (airp) airfinal = (`${airunit} & ${airp}`);
	if (airfinal) buffer.push(`Air-1: ${airfinal}`);

	if (bikeunit) buffer.push(`Bike-Unit: ${bikeunit}`);
	buffer.push('');

	let robbery = document.getElementById('robberytype').value;
	let robberyString = '';

	if (robbery.trim() === 'Fleeca Bank') {
		document.getElementById('whatStore').style.display = 'none';
		document.getElementById('whatFleeca').style.display = 'block';
		let specific = document.getElementById('specificBank').value;
		robberyString = `${robbery} at ${specific}`;
		ROBBERY_STATE = 'FLEECA';
	}
	if (robbery.trim() === '24/7 Store') {
		document.getElementById('whatFleeca').style.display = 'none';
		document.getElementById('whatStore').style.display = 'block';
		let specific = document.getElementById('specificStore').value;
		robberyString = `${robbery} at ${specific}`;
		ROBBERY_STATE = '24/7';
	} 
	if (robbery.trim() === 'Jewelry Store') {
		document.getElementById('whatFleeca').style.display = 'none';
		document.getElementById('whatStore').style.display = 'none';
		robberyString = robbery;
		ROBBERY_STATE = 'JEWLERY';
	}

	buffer.push(`[DETAILS | DEMANDS]:`);
	buffer.push(`During normal patrol, we had received a report from dispatch of an alarm going off at the ${robberyString}. Once scene command was established, they assigned officer ${callsign} to create an incident report.`);
	buffer.push('');
	let hostages = document.getElementById('hostages').value;
	let robbersinside = document.getElementById('robbersinside').value;
	let robbersoutside = document.getElementById('robbersoutside').value;
	buffer.push(`After setting up the perimeter around the area, we began negotiations. During the negotiations, we learned that there were a total of:`);
	buffer.push(`Robbers Inside: ${robbersinside}`);
	buffer.push(`Robbers Outside: ${robbersoutside}`);
	buffer.push(`Hostages: ${hostages}`);
	buffer.push('');
	
	let demands = [];
	let demandsText = '';
	if (document.getElementById('fpassagensp').checked) demands.push("free passage with no spike strips on the perimeter");
	if (document.getElementById('fpassagensf').checked) demands.push("free passage with no spike strips on the whole chase");
	if (document.getElementById('nair').checked) demands.push("no helicopter/air1");
	if (document.getElementById('nspeed').checked) demands.push("no speed unit");
	if (document.getElementById('nbike').checked) demands.push("no bike unit");
	let otherDemands = document.getElementById('otherdemands').value.trim();
	if (otherDemands) demands.push(...otherDemands.split(','));
	if (demands.length > 1) {
		const lastDemand = demands.pop();
		demandsText += `${demands.join(', ')} and ${lastDemand}`;
	} else {
		demandsText = demands;
	}

	let stayedBack = (hostagestayer ? hostagestayer.trim() : 'a unit');
	buffer.push(`The ${robbersinside} unidentified suspect(s) demanded ${demandsText} for the safety of the ${hostages} hostage(s).` +
		` Once they were ready on the inside, scene command prepared a lineup for the pursuit. Scene command assigned officer ${stayedBack} to stay back for the hostage and collect their contact information.`);
	buffer.push('');

	buffer.push(`[VEHICLE | CHASE]:`);
	let plate = document.getElementById('vehicleplate').value;
	let vehicledesc = document.getElementById('vehicledesc').value;
	let vehiclereg = document.getElementById('vehiclereg').value
	let vehiclecolor = document.getElementById('carcolor').value;
	if (vehicledesc || vehiclecolor) vehicledesc = ` which was a ${vehiclecolor} in colored ${vehicledesc}${(plate ? ' (PLATE: ' + plate + ')' : '')}`;
	if (vehiclereg) vehiclereg = `The vehicle was registered to an individual named ${vehiclereg}. `;
	if (!vehiclereg) vehiclereg = '';
	buffer.push(`We then let them get into their vehicle${vehicledesc}. ${vehiclereg}Once everyone was ready, the chase started and they attempted to evade police recklessly.`);
	buffer.push('');

	let chaseSelected = document.getElementById('chaseend');
	let chaseInformation = {
		'Write Custom Ending': {
			text: 'The chase lasted for a bit of time until ...',
		},
		'Units lost eyes | Escaped': {
			text: 'The chase lasted for a bit of time until our pursuing units lost eyes on the suspects vehicle. After performing a search near the area where we lost eyes, we did not manage to find them.',
		},
		'Suspects caught | General Ending': {
			text: 'The chase lasted for a bit of time until our pursuing units managed to apprehend the suspects.',
		},
		'Surrendered | General Ending': {
			text: 'The chase lasted for a bit of time until the suspects fleeing decided to surrender.',
		},
		'Got out of vehicle | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until they had stopped their car and stepped out of it. The suspects initiated a 10-81 and attempted to evade on foot. Our pursuing units eventually managed to apprehend the suspects and place them under police custody.',
		},
		'Got out of vehicle | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until they had stopped their car and stepped out of it. The suspects initiated a 10-81 and attempted to evade on foot.',
		},
		'Vehicle disabled | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they got out of the disabled vehicle and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle disabled | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they got out of the disabled vehicle and ran on foot in hopes of getting away. The suspects then managed to out maneuver our ground units and eventually escape police custody.',
		},
		'Vehicle disabled | Vehicle swap | Caught': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they got out of the disabled vehicle and made a run for a vehicle that attempted to pick them up and assist them. Both the vehicle that attempted to pick them up and the original suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle disabled | Vehicle swap | Escaped': {
			text: 'The chase lasted for a bit of time until their car had disabled from crashing it too many times. From there they got out of the disabled vehicle and made a run for a vehicle that attempted to pick them up and assist them. After us losing eyes on them and performing a Code 6 of the general vicinity, both the vehicle that attempted to pick them up and the original suspects eventually escaped police custody.',
		},
		'Vehicle disabled | Surrendered': {
			text: 'The chase lasted for a bit of time until their vehicle had disabled from crashing it too many times. From there they were smart enough to surrender and not flee on foot. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle boxed in | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until our pursuing ground units managed to pin the vehicle and box it in to where they could not move anymore. From there they got out of the boxed in vehicle and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle boxed in | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until our pursuing ground units managed to pin the vehicle and box it in to where they could not move anymore. From there they got out of the boxed in vehicle and ran on foot in hopes of getting away. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Vehicle boxed in | Surrendered': {
			text: 'The chase lasted for a bit of time until our pursuing ground units managed to pin the vehicle and box it in to where they could not move anymore. From there they were smart enough to surrender and not flee on foot. The suspects were eventually apprehended and placed under police custody.',
		},
		'Attempted Vehicle swap | Caught': {
			text: 'The chase lasted for a bit of time until they attempted to swap into a different vehicle but failed in the process. Shortly after the fleeing suspects had been apprehended and placed under police custody.',
		},
		'Vehicle swap x1 | Caught': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects were apprehended and placed under police custody.',
		},
		'Vehicle swap x1 | Escaped': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects were able to outdrive our pursuing units and making us lose eyes on the suspects. After an indepth search of the immediate area we did not find the suspects and called out VCB & UTL.',
		},
		'Vehicle swap x2 | Caught': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects had another vehicle swap/transfer and the chase continued from there on. Eventually after that pickup vehicle, the suspects were apprehended and placed under police custody.',
		},
		'Vehicle swap x2 | Escaped': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects had another vehicle swap/transfer and the chase continued from there on. Eventually after the 2nd pickup vehicle, the suspects were able to outdrive our pursuing units and making us lose eyes on the suspects. After an indepth search of the immediate area we did not find the suspects and called out VCB & UTL.',
		},
		'Vehicle swap x3 | Caught': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects had another vehicle swap/transfer and the chase continued from there on. Eventually after that pickup vehicle, they had another pickup and continued evading. Eventually the suspects were apprehended and placed under police custody.',
		},
		'Vehicle swap x3 | Escaped': {
			text: 'The chase lasted for a bit of time until they hopped out and got into a swap/transfer vehicle and the chase continued from there. Eventually after that pickup vehicle, the suspects had another vehicle swap/transfer and the chase continued from there on. Eventually after that pickup vehicle, they had another pickup and continued evading. Eventually after the 3rd pickup vehicle, the suspects were able to outdrive our pursuing units and making us lose eyes on the suspects. After an indepth search of the immediate area we did not find the suspects and called out VCB & UTL.',
		},
		'Bike swap | Caught': {
			text: 'The chase lasted for a bit of time until the hopped out of the car and got onto a bike that was set ready for them. The bike was then pursued and eventually the occupants fell off of the bike. The suspects were apprehended and placed under police custody.',
		},
		'Bike swap | Escaped': {
			text: 'The chase lasted for a bit of time until the hopped out of the car and got onto a bike that was set ready for them. The bike was then pursued and eventually our ground units had lost eyes on them. After a Code 6 was performed, we did not manage to find the suspects and called the pursuit Code 4.',
		},
		'Vehicle ran out of fuel | Ran on foot | Transfer vehicle | Caught': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. Eventually the suspects got into a vehicle that had picked them up. From there another pursuit was initiated. Shortly after those suspects were apprehended and placed under police custody.',
		},
		'Vehicle ran out of fuel | Ran on foot | Transfer vehicle | Escaped': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. Eventually the suspects got into a vehicle that had picked them up. From there another pursuit was initiated. After some time had passed and us losing eyes on them, we performed a Code 6 of the general vicinity. Since we did not manage the find the suspects, we called the situation all clear.',
		},
		'Vehicle ran out of fuel | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. Eventually the suspects were apprehended and placed under police custody.',
		},
		'Vehicle ran out of fuel | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Vehicle ran out of fuel | Surrendered': {
			text: 'The chase lasted for a bit of time until their vehicle had ran out of fuel and they got out on foot. From there they were smart enough to surrender and not flee on foot. The suspects were eventually apprehended and placed under police custody.',
		},
		'Vehicle turtled | Ran on foot | Transfer vehicle | Caught': {
			text: 'The chase lasted for a bit of time until they managed to drive so recklessly to the point that their car had ended up turtling. The suspects then climbed out of the vehicle and began fleeing on foot. Eventually the fleeing suspects then managed to get into a vehicle that was ready to pick them up. Our ground units eventually managed to apprehend the suspects and place them under police custody.',
		},
		'Vehicle turtled | Ran on foot | Transfer vehicle | Escaped': {
			text: 'The chase lasted for a bit of time until they managed to drive so recklessly to the point that their car had ended up turtling. The suspects then climbed out of the vehicle and began fleeing on foot. Eventually the fleeing suspects then managed to get into a vehicle that was ready to pick them up. Our ground units eventually lost eyes on the pickup vehicle.',
		},
		'Vehicle turtled | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until they managed to drive so recklessly to the point that their car had ended up turtling. The suspects then climbed out of the vehicle and began fleeing on foot. Eventually our pursuing units managed to detain the running suspects and place them under police custody.',
		},
		'Vehicle turtled | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until they managed to drive so recklessly to the point that their car had ended up turtling. The suspects then climbed out of the vehicle and began fleeing on foot. Eventually our pursuing units managed to lose eyes on the suspects and we called the chase VCB.',
		},
		'Vehicle turtled | Surrendered': {
			text: 'The chase lasted for a bit of time until their vehicle had gotten stuck on the roof, turtling. The suspects then climbed out of the vehicle and were smart enough not to run but instead surrender. From there, the suspects were apprehended and placed under police custody.',
		},
		'Vehicle was sent into water | Caught': {
			text: 'The chase lasted for a bit of time until they had drove their vehicle into the water. Eventually after pursuing the suspects in the water, they were all apprehended and placed under police custody.',
		},
		'Vehicle was sent into water | Escaped': {
			text: 'The chase lasted for a bit of time until they had drove their vehicle into the water. Eventually after pursuing the suspects in the water, we lost eyes on all the fleeing suspects and they have escaped under police custody.',
		},
		'Vehicle blew up': {
			text: 'The chase lasted for a bit of time until they had drove so recklessly to the point where they had accidentally hit an explosive and blew up their vehicle. After receiving medical attention, the suspects were apprehended and placed under police custody.',
		},
		'Vehicle took a jump | Escaped': {
			text: 'The chase lasted for a bit of time until we lost eyes on the suspects because they took a jump. Our pursuing vehicles failed to do the jump and we called the chase VCB.',
		},
		'Suspects opened fire from the vehicle | Caught': {
			text: 'The chase lasted for a bit of time until the suspects decided to start opening fire on our pursuing officers. After a shortlasting exchange of gunfire, the officers managed to incapacitate the suspects and place them under police custody.',
		},
		'Suspects opened fire from the vehicle | Escaped': {
			text: 'The chase lasted for a bit of time until the suspects decided to start opening fire on our pursuing officers. After a shortlasting exchange of gunfire, the officers did not manage to incapacitate the suspects and due to the suspects having an advantage, the officers took the chance and let the criminals flee in favour of saving our other officers lives. The suspects escaped and evaded police custody.',
		},
		'Turned into a shootout | All Caught': {
			text: 'The chase lasted for a bit of time until the robbers had initiated a shootout. Eventually after all the suspects were incapacitated, we secured them and held a perimeter on scene.',
		},
		'Turned into a shootout | All Escaped': {
			text: 'The chase lasted for a bit of time until the robbers had initiated a shootout. Unfortunately, since they managed to incapacitate more officers than we managed to incapacitate them, we had no choice but to let them flee the area to secure our downed officers safety.',
		},
		'Secondary Vehicle Blocked Units | Escaped': {
			text: 'The chase lasted for a bit of time until the pursuing units were blocked in a small alley by a secondary vehicle that got involved in the pursuit. After them successfully stopping the pursuing units, the original suspects managed to escape police and we declared the chase VCB.',
		},
		'Vehicle 10-50 | Suspects went down': {
			text: 'The chase lasted for a bit of time until the evading vehicle had crashed and the occupants of the vehicle were incapacitated.',
		},
		'Bike disabled | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until the suspect(s) bike had disabled. The suspects then got off of the bike and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Bike disabled | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until the suspect(s) bike had disabled. The suspects then got off of the bike and ran on foot in hopes of getting away. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Bike disabled | Surrendered': {
			text: 'The chase lasted for a bit of time until the suspect(s) bike had disabled. The suspects then got off of their bike and decided to surrender and they were placed under police custody.',
		},
		'Fell off bike | Ran on foot | Caught': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of the bike and ran on foot in hopes of getting away. The suspects were eventually apprehended and placed under police custody.',
		},
		'Fell off bike | Ran on foot | Escaped': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of the bike and ran on foot in hopes of getting away. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Fell off bike | Vehicle Swap | Caught': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of their bike and began running on foot. Shortly after a vehicle had picked up the suspects and we initiated another 10-80 with that vehicle. After pursuing the swap vehicle for a bit of time the suspects were eventually apprehended.',
		},
		'Fell off bike | Vehicle Swap | Escaped': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of their bike and began running on foot. Shortly after a vehicle had picked up the suspects and we initiated another 10-80 with that vehicle. After pursuing the swap vehicle for a bit of time, the pursuing units managed to lose eyes on the suspects. After us losing eyes on them and performing a Code 6 of the general vicinity, the suspects eventually escaped police custody.',
		},
		'Fell off bike | Surrendered': {
			text: 'The chase lasted for a bit of time until the suspect(s) had fallen off of their bike. The suspects then got off of their bike and decided to surrender and they were placed under police custody.',
		}
	};
	let chase = chaseSelected.options[chaseSelected.selectedIndex].text;
	buffer.push(chaseInformation[chase].text);
	buffer.push('');

	let processed = document.getElementById('processedat').value;
	let medneedsus = document.getElementById('medneedsus').value;
	let medneedpd = document.getElementById('medneedpd').value;
	let hospitalname = document.getElementById('hospitalname').value;
	let doctorname = document.getElementById('doctorname').value;
	if (document.getElementById('cend').checked) {
		if (document.getElementById('medneed').checked) {
			buffer.push(`[MEDICAL ATTENTION]:`);
			buffer.push(`After we apprehended the suspects, they were in need of medical attention. We brought the injured people (Suspects Total: ${medneedsus} | PD Total: ${medneedpd}) to ${hospitalname}. and they were treated by ${doctorname}.`);
			buffer.push(`Once everyone got medical treatment, we started heading back towards the PD.`)
		} else {
			buffer.push(`[MEDICAL ATTENTION]:`);
			buffer.push(`Due to no suspects or officers having any major injuries, everyone waved their rights to medical attention.`);
		}
		if (document.getElementById('runhospital').checked) {
			buffer.push(`The suspect attempted to flee at the hospital but was apprehended.`);
		}
		buffer.push('');
    	buffer.push('[PROCESSED]:');
		buffer.push(`All of the apprehended suspects were processed at ${processed}.`);

		if (document.getElementById('nocontest').checked) {
			buffer.push(`The suspect plead no contest.`);
		}
    }
	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="text2"], input[type="number"], textarea');
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
