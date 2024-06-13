document.getElementById("search-button").addEventListener("click",function() {
    const query = document.getElementById("search-input").value;
    if (query) {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${query}`)
        .then(response => response.json())
            .then( data => {
                PlayerHolder(data);
            })
    }
    
});

const PlayerHolder = (players) => {
    const playerContainer = document.getElementById("player-section");
    playerContainer.innerHTML = '';
    if(players.player){
        players.player.forEach(athelete => {
            console.log(athelete)
            const div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `
            <img class="card-img" src="${athelete.strThumb}" alt="" />
            <h4>Name: ${athelete.strPlayer}</h4>
            <p>Nationality: ${athelete.strNationality}</p>
            <p>Gender: ${athelete.strGender}</p>
            <p>Sport: ${athelete.strSport}</p>
            <p>Team: ${athelete.strTeam}</p>
            <a href="${athelete.Facebook}"><i class="fa-brands fa-facebook fa-2x"></i> </a>
            <a href="${athelete.Instagram}"><i class="fa-brands fa-instagram fa-2x"></i> </a>
            <a href="${athelete.Youtube}"> <i class="fa-brands fa-youtube fa-2x"></i></a>
            
            <button class="btn-card" onclick="cartHandle('${athelete.strPlayer}')" > Add To Group </button>
            <button class="btn-card" onclick="Details('${athelete.idPlayer}')" > Details </button>
            
            `;
            playerContainer.appendChild(div);
        })
    }
}
let cnt = 0;
const cartHandle = (name) => {
    cnt += 1;
    const cartCount = document.getElementById("count").innerText;
    let convertedCount = parseInt(cartCount);
    if (cnt < 12) {
        convertedCount += 1;
        document.getElementById("count").innerText = convertedCount;
        console.log(name);
    
        const container = document.getElementById("cart-container");
        const div = document.createElement("div");
        div.innerHTML = `
        <p> ${name} </p>
        `;
        container.appendChild(div);
    
    }
    
}

const Details = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
        .then(response => response.json())
            .then( data => {
                playerdetails(data);
                const modal = new bootstrap.Modal(document.getElementById("modal-main"));
                modal.show();
            })
}

const playerdetails = (data) => {
    const modal = document.getElementById("modalbody");
    modal.innerHTML = '';
    if(data.players){
        data.players.forEach(sportsman => {
            const div = document.createElement("div");
            div.innerHTML = `
            <p>Name: ${sportsman.strPlayer}</p>
            <p>Nationality: ${sportsman.strNationality}</p>
            <p>Birth Place: ${sportsman.strBirthLocation}</p>
            <p>Height: ${sportsman.strHeight}</p>
            <p>Gender: ${sportsman.strGender}</p>
            <p>Sport: ${sportsman.strSport}</p>
            <p>Team: ${sportsman.strTeam}</p>
            `
            modal.appendChild(div);
        })
    }
}

const loadDefaultPlayers = () => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=k")
        .then(response => response.json())
            .then( data => {
                PlayerHolder(data);
            })
}

document.getElementById("player-section").addEventListener("load", loadDefaultPlayers() );
    


