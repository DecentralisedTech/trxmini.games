// REMOVE LOCALHOST AND CHANGE TO IP OF DEV SERVER / PROD SERVER WHEN DEPLOYED
//  / // / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / ? ?
//  / // / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / ? ?

import { writable } from 'svelte/store';

export const connectedAddress = writable();
export const connectedUsername = writable();

export const isHostAddress = writable();
export const isTwoAddress = writable();

export const isProfile = writable();
export const fetchedProfile = writable();
export const profileBadges = writable([]);

export const userID = writable(); // Allows users to play with their address or username. If no username, assigns address.
export const connectedChain = writable(false);

export const getBalance = writable();

export const playerNotifications = writable();

export const createPrompt = writable(false);
export const tipPrompt = writable(false);

export const notiPrompt = writable(false);
export const authPrompt = writable(false);

export const selectedOption = writable('Chess');
export const inGame = writable(false);
export const medalAlert = writable(false);
export const creatingGame = writable();

// POSTGRES ENDPOINTS
export const url0 = '/api/address';
export const url1 = '/api/username';
export const url2 = '/api/getaddr?username=';
export const getXp = '/api/getxp?user='; // May not need this.
export const notificationsUrl = '/api/getnotifications';
export const getProfileURL = '/api/getprofile?user=';
// REDIS ENDPOINTS

export const makeBallRoom = 'http://172.105.106.183:5020/makeballroom?user=';
export const getBallRoomsUrl = 'http://172.105.106.183:5020/getballrooms';

export const urlRooms = 'http://172.105.106.183:5020/rooms';
export const urlEndedRooms = 'http://172.105.106.183:5020/endedrooms';

export const tipSocket = 'http://172.105.106.183:4903/';

// chess contract, aswell as endpoint that Listens for contract events via trongrid.io API, such as the index which is a nessescary parameter to invoke the relevant struct.
export const tipContract = 'TBPL4jVJMwnMLUjmX9GDTgXcC8y3T5zVgD';
export const chessContract = 'TMGBGionnPs1TFRHxNrZRiGneZaDi6zkBh';
export const _chessContract = 'TQyY41mqbHVWWHWt5Zq1pPL5rYd7HgM2kE';

export const chessEventListener = `https://api.shasta.trongrid.io/v1/contracts/${chessContract}/events`;

export const eventAPI = 'http://172.105.106.183:5020/api';

// Chess socket.io endpoint
export const chessWs = 'http://172.105.106.183:3001';

export const currentState = writable(''); // Saves current FEN state of chess game.
export const wagerTx = writable();
export const theRoom = writable();
let prompted = false;
export async function createGameForm() {
	// Create game prompt state sharing between components
	prompted = !prompted;
	createPrompt.set(prompted);
}

let isTipExpanded = false;
export async function tipPlayerForm() {
	isTipExpanded = !isTipExpanded;
	console.log(isTipExpanded);
	tipPrompt.set(isTipExpanded);
}

let authExpanded = false;
export function myProfile() {
	authExpanded = !authExpanded;
	authPrompt.set(authExpanded);
}

let notificationExpanded = false;
export function notificationPrompt() {
	notificationExpanded = !notificationExpanded;
	notiPrompt.set(notificationExpanded);
}

export async function postRequest(url, body) {
	const res = await fetch(url, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: body
	});
	if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
	return await res.json();
}
