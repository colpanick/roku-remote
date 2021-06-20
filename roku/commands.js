document.addEventListener("DOMContentLoaded", () => {

    let idFav1 = "13"
    let idFav2 = "2285"
    let idFav3 = "44191"
    let idFav4 = "837"
    
    let roku_device = "192.168.1.7";
    let roku_port = "8060";

    let btnFav1 = document.getElementById("fav1");
    let btnFav2 = document.getElementById("fav2");
    let btnFav3 = document.getElementById("fav3");
    let btnFav4 = document.getElementById("fav4");

    btnFav1.style.backgroundImage = "url(http://" + roku_device + ":" + roku_port + "/" + "query/icon/" + idFav1 + ")";
    btnFav2.style.backgroundImage = "url(http://" + roku_device + ":" + roku_port + "/" + "query/icon/" + idFav2 + ")";
    btnFav3.style.backgroundImage = "url(http://" + roku_device + ":" + roku_port + "/" + "query/icon/" + idFav3 + ")";
    btnFav4.style.backgroundImage = "url(http://" + roku_device + ":" + roku_port + "/" + "query/icon/" + idFav4 + ")";



    function sendCommand(cmd, type) {
        var Http = new XMLHttpRequest();
        let url = "http://" + roku_device + ":" + roku_port + "/" + cmd
        console.log(url)
        Http.open(type, url)
        Http.send()
        return Http.response
        
    }

    function keyPress(key) {
        let cmd = "keypress/" + key
        sendCommand(cmd, "post")
    }

    function launchApp(appID){
        let cmd = "launch/" + appID
        sendCommand(cmd, "post")
    }

    // Back Button
    document.getElementById("back").addEventListener("click", () => {
        keyPress("back")
     })

    //Home Button
    document.getElementById("home").addEventListener("click", () => {
        keyPress("home")
    })

    // Up Button
    document.getElementById("up").addEventListener("click", () => {
        keyPress("up")
    })

    // Left Button
    document.getElementById("left").addEventListener("click", () => {
        keyPress("left")
    })

    // OK Button
    document.getElementById("ok").addEventListener("click", () => {
        keyPress("select")
     })

    // Right Button
    document.getElementById("right").addEventListener("click", () => {
        keyPress("right")
     })

    // Down Button
    document.getElementById("down").addEventListener("click", () => {
        keyPress("down")
     })

    // Repeat Button
    document.getElementById("repeat").addEventListener("click", () => {
        keyPress("instantreplay")
     })

    // Mic Button
    document.getElementById("mic").addEventListener("click", () => {
        keyPress("")
     })

    // Options Button
    document.getElementById("options").addEventListener("click", () => {
        keyPress("info")
     })

    // Rewind Button
    document.getElementById("rewind").addEventListener("click", () => {
        keyPress("rev")
     })

    // Play/Pause Button
    document.getElementById("playpause").addEventListener("click", () => {
        let myret = keyPress("play");
        console.log(myret)
     })

    // Fast Forward Button
    document.getElementById("fastforward").addEventListener("click", () => {
        keyPress("fwd")
     })

    // App 1 Button
    btnFav1.addEventListener("click", () => {
        launchApp(idFav1)
    })

    // App 2 Button
    btnFav2.addEventListener("click", () => {
        launchApp(idFav2)
    })

    // App 3 Button
    btnFav3.addEventListener("click", () => {
        launchApp(idFav3)
    })

    // App 4 Button
    btnFav4.addEventListener("click", () => {
        launchApp(idFav4)
     })


     document.getElementById("nextepisode").addEventListener("click", () => {
        keyPress("select")
        keyPress("right")
        keyPress("select")
        keyPress("left")
        keyPress("select")

     })

     document.getElementById("prevepisode").addEventListener("click", () => {
        keyPress("select")
        keyPress("left")
        keyPress("select")
        keyPress("select")

     })

    console.log(sendCommand("query/media-player", "get"))
})

/*
  Home
  Rev
  Fwd
  Play
  Select
  Left
  Right
  Down
  Up
  Back
  InstantReplay
  Info
  Backspace
  Search
  Enter

    VolumeDown
  VolumeMute
  VolumeUp
  PowerOff
*/