let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
// let mapid = document.getElementById('mapid');

let main = document.getElementById("overlay");
let rank = document.getElementById("rank");
let acc = document.getElementById("acc");
let score = document.getElementById("score");
let combo = document.getElementById("combo");
let bar = document.getElementById("progress");
let text = document.getElementById("progress-text");
let cover = document.getElementById("image");
let title = document.getElementById("title");
let subtitle = document.getElementById("subtitle");
let artist = document.getElementById("artist");
let difficulty = document.getElementById("difficulty");
let bpm = document.getElementById("bpm");
let star = document.getElementById("star");

let animation = {
    acc:  new CountUp('acc', 0, 0, 2, .2, {useEasing: true, useGrouping: true, separator: ",", decimal: ".", suffix: '%'}),
    combo:  new CountUp('combo', 0, 0, 0, .2, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    score:  new CountUp('score', 0, 0, 0, .2, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
}

socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};
let tempImg;

socket.onmessage = event => {
    let data = JSON.parse(event.data);

    if (data.menu.state == 2) {
        main.classList.remove("hidden");
    } else {
        main.classList.add("hidden");
        return;
    }

    if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full;
        let img = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25')
        cover.setAttribute('src',`http://127.0.0.1:24050/Songs/${img}?a=${Math.random(10000)}`)
    }

    let titleStr = data.menu.bm.metadata.title;
    let titleRe = /(.+)(\(.+\))/i;
    let titleMath = titleStr.match(titleRe);
    if (titleMath) {
        title.innerText = titleMath[1];
        subtitle.innerText = titleMath[2];
    } else {
        title.innerText = titleStr;
        subtitle.innerText = "";
    }
    

    artist.innerText = data.menu.bm.metadata.artist + ' \\\\ '
    + data.menu.bm.metadata.mapper;

    difficulty.innerText = data.menu.bm.metadata.difficulty;

    let BPM = data.menu.bm.stats.BPM;
    if (BPM.min == BPM.max) {
        bpm.innerText = `${BPM.min}BPM`;
    }
    else {
        bpm.innerText = `${BPM.min} - ${BPM.max}BPM`;
    }
    
    star.innerText = data.menu.bm.stats.fullSR + "⭐";
    rank.innerHTML = data.gameplay.hits.grade.current;

    animation.score.update(data.gameplay.score);
    animation.acc.update(data.gameplay.accuracy);
    animation.combo.update(data.gameplay.combo.current);
    
    let time = Math.max(Math.floor(data.menu.bm.time.current / 1000), 0);
    let minutes = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);

	if (seconds < 10) {
		seconds = "0" + seconds;
	}

    text.innerHTML = `${minutes}:${seconds}`

    const radius = 30;
	const circumference = radius * Math.PI * 2;
    var duration = Math.floor(data.menu.bm.time.full / 1000);
    var percentage = Math.min(time / duration, 1);
    bar.setAttribute("style", `stroke-dashoffset: ${(1 - percentage) * circumference}px`);
}
