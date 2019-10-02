var btnCon = document.getElementById("con_btn");
var btnPub = document.getElementById("pub_btn");
var btnSub = document.getElementById("sub_btn");
var btnUnsub = document.getElementById("unsub_btn");
var btndisCon = document.getElementById("disCon_btn");


var client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");

var topicInput = ($('#subInputTop').val());
var payloadInput = document.getElementById("payloadIn");

var currentdate = new Date();
var datetime = "Now: " + currentdate.getDate() + "/"
+ (currentdate.getMonth()+1)  + "/" 
+ currentdate.getFullYear() + " @ "  
+ currentdate.getHours() + ":"  
+ currentdate.getMinutes() + ":" 
+ currentdate.getSeconds();





//Connected Button
btnCon.addEventListener('click', function () {
 
  var text = document.getElementById('statusIn');
  text.value = 'Successfully Connected';
  console.log("Successfuly Connected")
})

//Disconnected Button
btndisCon.addEventListener('click', function () {
 
  console.log("disconnected button");
  var text1 = document.getElementById('statusIn');
  text1.value = 'DisConnected';
  client.end();
})
//adding elements in the table
client.on("message", function (topic, payload) {
  console.log([topic, payload].join(":"));
  $('#tableBroke').append('<tr><td id="InsertedTopic">' + topic + '</td><td id="insertedPayload">' + payload + '</td><td id="insertedTime">' + datetime + '</td></tr>');
 
})



//publish button
btnPub.addEventListener("click", function () {
  if ($('#topicIn').val().length == 0) {
    alert("Please enter a topic");
  } else {
    client.publish($('#topicIn').val(), $('#payloadIn').val(), function () {
    })
    console.log("publish");
    $('#tablePub').append('<tr><td id="pubTopic">' + ($('#topicIn').val()) + '</td><td id="pubPayload">' +($('#payloadIn').val())+'</td><td id="pubDateTime">'+ datetime+ '</td></tr>');
  }

})


btnSub.addEventListener('click', function () {
  // ex.preventDefault();
  // var subInput = document.getElementById("subInputTop").val;


 
  if ($('#subInputTop').val().length == 0) {
    alert("Please subscribe a topic");
  } else {
    client.subscribe($('#subInputTop').val(), function () {
      console.log("subscribed")
      $('#tableSub').append('<tr><td id="topicLng">' + ($('#subInputTop').val()) +'</td><td id="subDateTime">'+ datetime+ '</td></tr>' );
      $('#subInputTop').prop('disabled', true);
    })
    $(this).prop('disabled', true);
  }
})

// Unsubscribe button
btnUnsub.addEventListener("click", function () {
  $('#subInputTop').val("")
  client.subscribe($('#subInputTop').val(), function () {
    console.log("unsubscribed")
    $('#subInputTop').prop('disabled', false);
  })
  $('#subInputTop').prop('disabled', false);
  $('#sub_btn').prop('disabled', false);
})



  