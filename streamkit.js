ip = new Object();

ip = {
    handler : function(iplist) {
        console.log("IP List: " + iplist)
    },
    localAddress : "",
    run : false,
    lastDigits : [],
    subnet : {
        beginDigit : 5,
        endDigit : undefined,
    }
}

//Test: Print the IP addresses into the console
getIPs(function(ip){findLocalAddr(ip)});

//figure out if there is a 10.4 address in any of the array elements
findLocalAddr = function(addr) {
    addressBeginning = addr.substring(0, 4);
    if (addressBeginning == "10.4") {
        ip.localAddress = addr;
        console.log("Local IP we found was: " + ip.localAddress)
    }
    
    //now we need to verify that the address was actually found
    if (ip.localAddress != undefined) {
        console.log('Detected it okay!')
        //we could detect it okay
        //find the subnet it's on
        var lastHalf = ip.localAddress.substring(5);
        for (i = 0; i < lastHalf.length; i++) {
            var currentDigit = lastHalf[i];
            console.log('Current Digit is: ' + currentDigit);
            if (currentDigit == ".") {
                ip.subnet.endDigit = i + 5;
                break;
            }
        }
        
        //write subnet number to ip object
        ip.subnet.num = ip.localAddress.substring(5, ip.subnet.endDigit)
        identify(ip.subnet.num)
    }
    else {
        console.log("There was a problem...we couldn't detect your IP")
    }
}

function identify(subnet) {
    if (subnet == "0") {
        //default
        $("#subnet-text").html("on the default subnet.")
        $("#link").attr("href", "batch/default/Buck Nation News.bat")
    }
    else if (subnet == "2") {
        //admins
        $("#subnet-text").html("a school administrator.")
        $("#link").attr("href", "batch/admins/Buck Nation News.bat")
    }
    else if (subnet == "4") {
        //teachers
        $("#subnet-text").html("a teacher.")
        $("#link").attr("href", "batch/teachers/Buck Nation News.bat")
    }
    else if (subnet == "6") {
        //students
        $("#subnet-text").html("a student.")
        $("#link").attr("href", "batch/students/Buck Nation News.bat")
    }
}


//get the IP addresses associated with an account
function getIPs(callback){
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    //bypass naive webrtc blocking using an iframe
    if(!RTCPeerConnection){
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    function handleCandidate(candidate){
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];

        //remove duplicates
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);

        ip_dups[ip_addr] = true;
    }

    //listen for candidate events
    pc.onicecandidate = function(ice){

        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function(result){

        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});

    }, function(){});

    //wait for a while to let everything done
    setTimeout(function(){
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line){
            if(line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}