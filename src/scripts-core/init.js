console.log("[GatherCreative] inject completed");
console.log("[GatherCreative] initializing GatherCreative functions");

// flags
telemove = 0;
squaredance = 0;
updowndance = 0;
rightleftdance = 0;
battlemode = 0;


// global parameters
boost = 3;   // speed for teleport move
dancespeed = 200;  // dancing speed


// private functions
function GetPos() {
	curStats = gameSpace.gameState[gameSpace.id];
	return { x: curStats.x, y: curStats.y };
};

function GetPlayerPos(playername) {
	for (playerId of Object.keys(gameSpace.gameState)) {
		player = gameSpace.gameState[playerId];
		if (player.name == playername) {
			return { x: player.x, y: player.y }
		}
	}
}


// teleport move
//   description: use arrow key to move anywhere without colliding to object. (can go anywhere)
//   * boost variable: value of speed
async function TeleportMove(keycode) {
	curPos = GetPos();
	curMapId = gameSpace.mapId;

	switch (keycode) {
		case 37: // left arrow
			game.teleport(curMapId, curPos.x - boost, curPos.y);
			break;
		case 38: // up arrow
			game.teleport(curMapId, curPos.x, curPos.y - boost);
			break;
		case 39: // right arrow
			game.teleport(curMapId, curPos.x + boost, curPos.y);
			break;
		case 40: // down arrow
			game.teleport(curMapId, curPos.x, curPos.y + boost);
			break;
	}
}
window.addEventListener("teleportmove_enable", function () {
	telemove = 1;
}, false);
window.addEventListener("teleportmove_disable", function () {
	telemove = 0;
}, false);
window.addEventListener("changeboost", e => {
	boost = e.detail;
}, false);


// square dance
// description: square dance until squaredance flag is set to 0
// * dancespeed: speed of dancing
async function SquareDance() {
	curPos = GetPos();
	curMapId = gameSpace.mapId;

	squaredance = 1;
	while (squaredance == 1) {
		gameSpace.dance();
		game.teleport(curMapId, curPos.x, curPos.y - 1);
		await new Promise(r => setTimeout(r, dancespeed)); // one up

		gameSpace.dance();
		game.teleport(curMapId, curPos.x + 1, curPos.y);
		await new Promise(r => setTimeout(r, dancespeed));

		gameSpace.dance();
		game.teleport(curMapId, curPos.x + 1, curPos.y);
		await new Promise(r => setTimeout(r, dancespeed)); // two right

		gameSpace.dance();
		game.teleport(curMapId, curPos.x, curPos.y + 1);
		await new Promise(r => setTimeout(r, dancespeed));

		gameSpace.dance();
		game.teleport(curMapId, curPos.x, curPos.y + 1);
		await new Promise(r => setTimeout(r, dancespeed)); // two down

		gameSpace.dance();
		game.teleport(curMapId, curPos.x - 1, curPos.y);
		await new Promise(r => setTimeout(r, dancespeed));

		gameSpace.dance();
		game.teleport(curMapId, curPos.x - 1, curPos.y);
		await new Promise(r => setTimeout(r, dancespeed)); // two left

		gameSpace.dance();
		game.teleport(curMapId, curPos.x, curPos.y - 1);
		await new Promise(r => setTimeout(r, dancespeed)); // one up
	}
}
window.addEventListener("squaredance_enable", function () {
	SquareDance();
}, false);
window.addEventListener("squaredance_disable", function () {
	squaredance = 0;
}, false);


// updown dance
// description: updown dance until updowndance flag is set to 0
// * dancespeed: speed of dancing
async function UpDownDance() {
	curPos = GetPos();
	curMapId = gameSpace.mapId;

	updowndance = 1;
	while (updowndance == 1) {
		gameSpace.dance();
		game.teleport(curMapId, curPos.x, curPos.y - 1);
		await new Promise(r => setTimeout(r, dancespeed)); // one up

		gameSpace.dance();
		game.teleport(curMapId, curPos.x, curPos.y + 1);
		await new Promise(r => setTimeout(r, dancespeed));

		gameSpace.dance();
		game.teleport(curMapId, curPos.x, curPos.y + 1);
		await new Promise(r => setTimeout(r, dancespeed)); // two down

		gameSpace.dance();
		game.teleport(curMapId, curPos.x, curPos.y - 1);
		await new Promise(r => setTimeout(r, dancespeed)); // one up
	}
}
window.addEventListener("updowndance_enable", function () {
	UpDownDance();
}, false);
window.addEventListener("updowndance_disable", function () {
	updowndance = 0;
}, false);


// rightleft dance
// description: rightleft dance until rightleftdance flag is set to 0
// * dancespeed: speed of dancing
async function RightLeftDance() {
	curPos = GetPos();
	curMapId = gameSpace.mapId;

	rightleftdance = 1;
	while (rightleftdance == 1) {
		gameSpace.dance();
		game.teleport(curMapId, curPos.x + 1, curPos.y);
		await new Promise(r => setTimeout(r, dancespeed)); // one right

		gameSpace.dance();
		game.teleport(curMapId, curPos.x - 1, curPos.y);
		await new Promise(r => setTimeout(r, dancespeed));

		gameSpace.dance();
		game.teleport(curMapId, curPos.x - 1, curPos.y);
		await new Promise(r => setTimeout(r, dancespeed)); // two left

		gameSpace.dance();
		game.teleport(curMapId, curPos.x + 1, curPos.y);
		await new Promise(r => setTimeout(r, dancespeed)); // one right
	}
}
window.addEventListener("rightleftdance_enable", function () {
	RightLeftDance();
}, false);
window.addEventListener("rightleftdance_disable", function () {
	rightleftdance = 0;
}, false);


window.addEventListener("changedancespeed", e => {
	dancespeed = e.detail;
}, false);


// ghost function
//  - enabled=1 => enable
//  - enabled=0 => disable
async function Ghost(enabled) {
	game.ghost(enabled, undefined);
}
window.addEventListener("ghost_enable", function () {
	Ghost(1);
}, false);
window.addEventListener("ghost_disable", function () {
	Ghost(0);
}, false);


// single emote
//   - emotion: single word or emoji
async function SingleEmote(emotion) {
	game.setEmote(emotion, undefined)
}
window.addEventListener("outputsingleemote", e => {
	SingleEmote(e.detail);
}, false);


// multi emote
//   - msg: message(string) is shown one word at a time
async function MultiEmote(msg) {
	for (c in msg) {
		game.setEmote(msg.charAt(c), undefined);
		await new Promise(r => setTimeout(r, 500));
	}
	game.setEmote("", undefined);
}
window.addEventListener("outputmultiemote", e => {
	MultiEmote(e.detail);
}, false);


// Boulder magic
//   description: attack by placing 5 "Boulder (2x2)" to the direction specified by ijkl(i:up j:left k:down l:right) 
//   restriction1: at least one Boulder object should be placed in map
//   restriction2: user should have permission to put object in map
async function BoulderMagic(keycode) {
	attackLength = 5;
	itemname = "Boulder (2x2)";
	curRoom = gameSpace.maps[gameSpace.mapId];
	curPos = GetPos();
	for (let i = 0; i < attackLength; i++) {
		item = curRoom.objects.filter(o => (o._name).includes(itemname))[0];

		switch (keycode) {
			case 73: // i (up)
				item.x = curPos.x - 1;
				item.y = curPos.y - 1 - i;
				break;
			case 74: // j (left)
				item.x = curPos.x - 1 - i;
				item.y = curPos.y - 1;
				break;
			case 76: // l (right)
				item.x = curPos.x - 1 + i;
				item.y = curPos.y - 1;
				break;
			case 75: // k (down)
				item.x = curPos.x - 1;
				item.y = curPos.y - 1 + i;
				break;
		}

		game.setObject(curRoom.id, item.templateId, item, true);
		await new Promise(r => setTimeout(r, 150));
	}
	await new Promise(r => setTimeout(r, 150));
	curRoom = gameSpace.maps[gameSpace.mapId];
	for (let i = 0; i < attackLength; i++) {
		try {
			game.deleteObjectByKey(curRoom.id, curRoom.objects.filter(o => (o._name).includes(itemname))[1].key, true);
		} catch (e) { }
		await new Promise(r => setTimeout(r, 100));
	}
}
window.addEventListener("battlemode_enable", function () {
	battlemode = 1;
}, false);
window.addEventListener("battlemode_disable", function () {
	battlemode = 0;
}, false);


/**
 * Event Enum
 */
const GatherEvents = {
	//Teleport events
	TELEPORT_TO_OTHER: 10,
	TELEPORT_TO_ME: 11,
	TELEPORT_TO_PLACE: 12,
	TELEPORT_OTHER_TO_PLACE: 13,
	TELEPORT_ALL_TO_PLACE: 14,
	TELEPORT_ALL_TO_HERE: 15,
	//Place events
	NEW_PLACE: 50,
	//Ghost events
	GHOST_PLAYER: 100,
	GHOST_SELF: 101,
	//Player Events
	RING: 150,
	//Space private
	NO_DEIVID: 666,

	//TODO whisper!
};
Object.freeze(GatherEvents);

/**
 * Classes
 */
class Player {
	constructor() {
		this.gatherCore = new GatherCore();
	}

	set id(id) {
		this._id = id;
	}

	set x(x) {
		this._x = x;
	}

	set y(y) {
		this._y = y;
	}

	set mapId(mapId) {
		this._mapId = mapId;
	}

	teleportToOther(player) {
		this._teleport(player.x, player.y, this.id, player.mapId)
	}

	teleportToPlace(place) {
		this._teleport(place.x, place.y, this.id, place.mapId)
	}

	teleportToMe(player) {
		this._teleport(this.x, this.y, player.id, this.mapId)
	}

	activeGhostMode() {
		this.gatherCore.activeGhost();
	}

	deactivateGhostMode() {
		this.gatherCore.deactivateGhost();
	}

	_teleport(x, y, id, mapId) {
		this.gatherCore.teleport(mapId, x, y, id);
	}
}

class Place {
	constructor() {
		this.mapId = game.mapId;
		this.id = Date.now();
		this.gatherCore = new GatherCore();
	}

	set x(x) {
		this.x = x;
	}

	set y(y) {
		this.y = y;
	}

	set name(name) {
		this.name = name;
	}

	teleportTo(player) {
		this.gatherCore.teleport(player.mapId, player.x, player.y, player.id);
	}
}

class Area {
	constructor() {
		this.id = Date.now();
		this.gatherCore = new GatherCore();
	}

	set name(name) {
		this.name = name;
	}

	set places(places) {
		this.places = places;
	}

	blockList(players) {
		this.blockedPlayer = players;
	}

	startMonitoring() {
	}
}

class GatherCore {

	constructor() {
		if (GatherCore._instance) {
			return GatherCore._instance
		}
		GatherCore._instance = this;
	}

	teleport(mapId, x, y, playerId) {
		game.teleport(mapId, x, y, playerId);
	}

	whisper(player) {
		game.enterWhisper(player.id);
	}

	activeGhost() {
		ghostMode(1);
	}

	deactivateGhost() {
		ghostMode(0);
	}

	ghostMode(flag) {
		game.ghost(flag, undefined);
	}

	ring(player) {
		gameSpace.ringUser(player.id);
	}

	retrievePlayers() {
		return Object.keys(gameSpace.gameState)
			.map(id => {
				const playerData = gameSpace.gameState[id];
				const player = new Player();
				player.id = id;
				player.x = playerData.x;
				player.y = playerData.y;
				player.mapId = playerData.map;
				return player;
			})
	}

	retrieveMe() {
		const myData = gameSpace.gameState[gameSpace.id];
		const me = new Player();
		me.id = gameSpace.id;
		me.x = myData.x;
		me.y = myData.y;
		me.mapId = myData.map;
		return newPlayer;
	}
}

class Storage {

	static PLACES = "gather_places";
	static AREAS = "gather_areas";

	constructor() {
		if (Storage._instance) {
			return Storage._instance
		}
		Storage._instance = this;
	}

	findAllPlaces() {
		localStorage.getItem(PLACES)
	}

	savePlace(place) {
		localStorage.setItem(PLACES, JSON.stringify(place))
	}

	findAllAreas() {
		localStorage.getItem(AREAS)
	}

	saveArea(area) {
		localStorage.setItem(AREAS, JSON.stringify(place))
	}
}


function retrievePlayers() {
	return Object.keys(gameSpace.gameState)
		.map(id => {
			const playerData = gameSpace.gameState[id];
			const player = new Player();
			player.id = id;
			player.x = playerData.x;
			player.y = playerData.y;
			player.mapId = playerData.map;
			return player;
		})
}

window.addEventListener("a", function() {
	console.log('aaaaaaaaa')
	const players = retrievePlayers()
	console.log(JSON.stringify(players))
	// chrome.extension.sendMessage(JSON.stringify(players), function(response) {
	// 	//callback
	//  });
}, false);

console.log("[GatherCreative] initializing complete");
