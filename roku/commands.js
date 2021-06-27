document.addEventListener("DOMContentLoaded", () => {
    
    let idFav1;
    let roku_device
    let roku_port
    let idFav2
    let idFav3
    let idFav4

    conf_ip = document.getElementById("ipaddr");
    conf_port = document.getElementById("port");
    conf_fav1 = document.getElementById("config-fav1-id");
    conf_fav2 = document.getElementById("config-fav2-id");
    conf_fav3 = document.getElementById("config-fav3-id");
    conf_fav4 = document.getElementById("config-fav4-id");

    function set_config_from_defaults() {
        // Can be manually set in the event this is run locally and cookies don't work
        conf_ip.value = "192.168.1.7";
        conf_port.value = "8060";
        conf_fav1.value = "13";
        conf_fav2.value = "2285";
        conf_fav3.value = "44191";
        conf_fav4.value = "837";
        update_all()
    }

    function pull_config_from_cookies() {
        cookies = document.cookie.split("; ");

        cookie_values = {};

        cookies.forEach(item => {
            let key = item.split("=")[0];
            let value = item.split("=")[1];
            cookie_values[key] = value;
        })

        conf_ip.value = cookie_values["ip"] || "";
        conf_port.value = cookie_values["port"] || "";
        conf_fav1.value = cookie_values["favorite1"] || "";
        conf_fav2.value = cookie_values["favorite2"] || "";
        conf_fav3.value = cookie_values["favorite3"] || "";
        conf_fav4.value = cookie_values["favorite4"] || "";
    }

    function save_cookie() {
        let maxage = 315576000 // 10 years
        document.cookie = "ip=" + escape(conf_ip.value) + ";max-age=" + maxage;
        document.cookie = "port=" + escape(conf_port.value) + ";max-age=" + maxage;
        document.cookie = "favorite1=" + escape(conf_fav1.value) + ";max-age=" + maxage;
        document.cookie = "favorite2=" + escape(conf_fav2.value) + ";max-age=" + maxage;
        document.cookie = "favorite3=" + escape(conf_fav3.value) + ";max-age=" + maxage;
        document.cookie = "favorite4=" + escape(conf_fav4.value) + ";max-age=" + maxage;
    }
    
    document.getElementById("save-cookies").addEventListener("click", () => {
        save_cookie();
    })
    document.getElementById("load-defaults").addEventListener("click", () => {
        set_config_from_defaults();
    })



    conf_ip.addEventListener("change", () => {
        update_device_info();
    })

    conf_port.addEventListener("change", () => {
        update_device_info();
    })

    conf_fav1.addEventListener("change", () => {
        update_fav(1);
    })

    conf_fav2.addEventListener("change", () => {
        update_fav(2);
    })

    conf_fav3.addEventListener("change", () => {
        update_fav(3);
    })

    conf_fav4.addEventListener("change", () => {
        update_fav(4);
    })


    function update_fav(fav_num) {
        window["idFav" + fav_num] = window["conf_fav" + fav_num].value;
        icon_url = "url(http://" + roku_device + ":" + roku_port + "/" + "query/icon/" + window["idFav" + fav_num] + ")";

        let btnFav = document.getElementById("fav" + fav_num);
        btnFav.style.backgroundImage = icon_url;

        btnFav.addEventListener("click", () => {
            launchApp(window["idFav" + fav_num]);
        })
        document.getElementById("config-fav" + fav_num + "-icon").style.backgroundImage = icon_url;
    }
    
    function update_device_info() {
        roku_device = conf_ip.value;
        roku_port = conf_port.value;
        document.getElementById("applist-link").href = "http://" + roku_device + ":" + roku_port + "/query/apps";
    }

    function update_all() {
        update_device_info();

        for (i=1; i < 5; i++) {
            update_fav(i);
        }
    }
    pull_config_from_cookies();
    update_all();




    // Commands get lost if sent too quckly one after another
    // Creating a queue with a set interfal wait prevents loss of commands
    let keypress_queue = new Array;
    setInterval(send_next_in_queue,250);
    

    function sendCommand(cmd, type) {
        let Http = new XMLHttpRequest();
        let url = "http://" + roku_device + ":" + roku_port + "/" + cmd;
        console.log(url);
        Http.open(type, url);
        Http.send();
        return Http.responseText;

    }

    function keyPress(key) {
        let cmd = "keypress/" + key;
        sendCommand(cmd, "post");
    }

    function launchApp(appID){
        let cmd = "launch/" + appID;
        sendCommand(cmd, "post");
    }

    function send_next_in_queue() {
        if (keypress_queue.length > 0) {
            key = keypress_queue.shift();
            keyPress(key);
        }
    }

    function queue_chars_from_textbox() {
        src = document.getElementById("text_input");
        chars = src.value.split("");
        src.value = "";

        chars.forEach(item => {
            keypress_queue.push("lit_" + encodeURI(item));
        })
        
    }
        
    document.getElementById("btnSend").addEventListener("click", () => {
        queue_chars_from_textbox();
        
    })

    
    cmd_btns = Array.from(document.getElementsByClassName("btn-cmd"))
    cmd_btns.forEach(item => {
        item.addEventListener("click", () => {
            keypress_queue.push(item.id);
        })
    })




    function send_macro(commands) {
        commands.forEach(command => {
            keypress_queue.push(command);
        })
    }

     document.getElementById("hulu-nextepisode").addEventListener("click", () => {
        send_macro(["select", "right", "select", "left", "select"])
    })

     document.getElementById("hulu-restartepisode").addEventListener("click", () => {
         send_macro(["select", "left", "select"])
    })

    menu_checks = Array.from(document.getElementsByClassName("menu-check"))
    menu_checks.forEach(item => {
        item.addEventListener("change", () => {
            if_name = item.id.split("-")[1];
            let iface = document.getElementById(if_name);
            if (item.checked) {
                iface.style.display = "block";
            }
            else {
                iface.style.display = "none";
            }
        })
    })
    
})

