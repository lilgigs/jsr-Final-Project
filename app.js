// Initialize Firebase
var config = {
    apiKey: "AIzaSyA8-_Wfo7iVaeW_Xl8HxkaN2qmj27rn-i0",
    authDomain: "js-final-c641d.firebaseapp.com",
    databaseURL: "https://js-final-c641d.firebaseio.com",
    projectId: "js-final-c641d",
    storageBucket: "js-final-c641d.appspot.com",
    messagingSenderId: "284883322975"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Current Guests

var guestArray = [

{name: 'Timothy', Category: 'WP'},
{name: 'Catherine', Category: 'WP'},
{name: 'Debbie', Category: 'Parent'},
{name: 'Ciel', Category: 'Parent'},
{name: 'Andrea', Category: 'WP'},
{name: 'Chad', Category: 'WP'},
{name: 'Stephen', Category: 'WP'},
{name: 'David', Category: 'Friend'},
{name: 'Jeff', Category: 'Other'},
{name: 'Joe', Category: 'Friend'},
{name: 'Grandma', Category: 'Family'},
{name: 'Kevin', Category: 'Friend'},
{name: 'Armintas', Category: 'Friend'},
{name: 'Evan', Category: 'Other'},
{name: 'Julie', Category: 'Other'},
{name: 'Samantha', Category: 'Other'},
{name: 'Megan', Category: 'Other'},
{name: 'Ilya', Category: 'Friend'},
{name: 'Nicole', Category: 'Friend'},
{name: 'Kathy', Category: 'Family'},
{name: 'Steve', Category: 'Family'},
{name: 'Nick', Category: 'Friend'}
]


//Circle Color
function changeCircle(guestTotal, placement) {
	 if (guestTotal > 2) {
		 
		$(".circle" + placement).css("background", "#ff0000");  
	 }
	 else{$(".circle" + placement).css("background", "#000"); }
	
}  

//Table Loop
function guestLoop(guestName){
	var tableid;
   for(var i = 0; i < guestArray.length; i++){
if(guestName.includes(guestArray[i].name)){
	category = guestArray[i].Category;
	

	
	var guestName = guestArray[i].name
		switch (category) {
		case 'WP':
		tableid = 0		
		break;
		case 'Parent':
		tableid = 1
		break;
		case 'Family':
		tableid = Math.floor(Math.random() * (4 - 2 + 1) + 2)
		break;
		case 'Friend':
		tableid = Math.floor(Math.random() * (4 - 2 + 1) + 2)
		break;
		case 'Other':
		tableid = Math.floor(Math.random() * (12 - 11 + 1) + 11)
		break;
		}	 
		

		
		
}


   }
console.log(tableid)
	console.log(guestName)	
		if (tableid === undefined){
			tableid = Math.floor(Math.random() * (12 - 11 + 1) + 11)
			showTable(tableid, guestName);
			return tableid	 
		}
		else {
			showTable(tableid, guestName);
			return tableid	 

}
		}
		
//Category Loop
		
function getCategory(guestName){
	var category;
   for(var i = 0; i < guestArray.length; i++){
if(guestName.includes(guestArray[i].name)){
	category = guestArray[i].Category;
};
   }
   if (category === undefined) {
		category = 'Other'
		alert ('Not On List')
		return category
		
	}
	else {
		return category
		}
	}		

//Show Table
function showTable(tableid, guestNM){
	

	console.log(tableid)
	console.log('test')
document.getElementById('circle' + tableid).innerHTML += guestNM + '<br />Table #' + tableid;
	setTimeout(function (){	$( "#circle" + tableid ).html( "" );},2000);	
console.log('Table: ' + tableid);
	
};




//Submit
$(document).ready(function () {
  $('#myModal').hide();
  $('#guest-form').submit(function (event) {
    // by default a form submit reloads the DOM which will subsequently reload all our JS
    // to avoid this we preventDefault()
    event.preventDefault()
	
	
    // grab user message input
    var guest = $('#guest').val()
	var plus1 = $('#plus1').val()
	var tableid = guestLoop(guest);
	var category = getCategory(guest)
	
	console.log(category)
		console.log(tableid)
    // clear message input (for UX purposes)
    $('#guest').val('')
	$('#plus1').val('')
    // create a section for messages data in your db
    var guestReference = database.ref('guests');

	
    // use the set method to save data to the messages
    guestReference.child(guest).update({
      guest: guest,
      plus1: plus1,
	  table: tableid,
	  category: category
    })
	
	

  });

  // // on initialization of app (when document is ready) get fan messages
  guestClass.getGuests();
  guestClass.getTable0();
  guestClass.getTable1();
  guestClass.getTable2();
  guestClass.getTable3();
  guestClass.getTable4();
  guestClass.getTable11();
  guestClass.getTable12();
});



var guestClass = (function () {
  function getGuests() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
    database.ref('guests').on('value', function (results) {
      var $guestBoard = $('.guest-list')
      var guests = []

      var allGuests = results.val();

      // iterate through results coming from database call; messages
      for (var gst in allGuests) {
        // get method is supposed to represent HTTP GET method
        var guest = allGuests[gst].guest;
        var guestCategory = allGuests[gst].category;
        // create message element
        var $guestListElement = $('<li></li>')

        // create delete element
        var $deleteElement = $('<i class="fa fa-trash pull-right delete"></i>')
        $deleteElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id');
          deleteGuest(id);
          $(e.target.parentNode).remove();
        });

        // create update element
        var $updateElement = $('<i class="fa fa-pencil pull-right pencil"></i>')
        $updateElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id');
          updateGuest(id);
          //$(e.target.parentNode).remove();
        });
		
	
		var $tableElement = $('<i class="fa fas fa-hashtag pull-right"></i>')
        $tableElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id');
          updateGuestTable(id);
          //$(e.target.parentNode).remove();
        });
		
		var $plusElement = $('<i class="fa fas fa-plus pull-right"></i>')
        $plusElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id');
          updateGuestPlus(id);
          //$(e.target.parentNode).remove();
        });
		
		var $whoElement = $('<i class="fa fas fa-adjust pull-right"></i>')
        $whoElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id');
          whereGuest(id);
          //$(e.target.parentNode).remove();
        });



        // add id as data attribute so we can refer to later for updating
        $guestListElement.attr('data-id', gst)

        // add message to li
        $guestListElement.html(guest + '-' + guestCategory);
		
        // add delete element
        $guestListElement.append($deleteElement);
        $guestListElement.append($updateElement);
		$guestListElement.append($tableElement);
		$guestListElement.append($plusElement);
		$guestListElement.append($whoElement);
		

        // push element to array of messages
        guests.push($guestListElement)

        // remove lis to avoid dupes
        $guestBoard.empty()
      }

      for (var i in guests) {
        $guestBoard.append(guests[i]);
		var guestTotal = 1
		guestTotal =  guestTotal += parseInt(i);
		$("#guestTotal").html(guestTotal);
      }
    })

  }
 
// Show Table 0 Guests
function getTable0() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
	

	
    database.ref('guests').on('value', function (results) {
      
      var guests = []

      var allGuests = results.val();

      // iterate through results coming from database call; messages
      for (var gst in allGuests) {
        // get method is supposed to represent HTTP GET method
        var guest = allGuests[gst].guest;
		var guestTable = allGuests[gst].table;
        // create message element
        var $guestListElement = $('<li></li>')
		


        // add message to li
		if(guestTable == 0){
		var $guestBoard = $('.guest-list0')	
        $guestListElement.html(guest);
		
		
        guests.push($guestListElement)
}


        // remove lis to avoid dupes
        $guestBoard.empty()
      }

     for (var i in guests) {
        $guestBoard.append(guests[i]);
		
		var guestTotal = 1
		guestTotal =  guestTotal += parseInt(i);
		$("#total0").html(guestTotal);
       //$("#guestCircle0").append(`<span class="circle-smaller"></span>`); 
		
      }
    })

  }
  
  // Show Table 1 Guests
  
  function getTable1() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
	

	
    database.ref('guests').on('value', function (results) {
      
      var guests = []

      var allGuests = results.val();

      // iterate through results coming from database call; messages
      for (var gst in allGuests) {
        // get method is supposed to represent HTTP GET method
        var guest = allGuests[gst].guest;
		var guestTable = allGuests[gst].table;
        // create message element
        var $guestListElement = $('<li></li>')
		


        // add message to li
		if(guestTable === 1){
		var $guestBoard = $('.guest-list1')	
        $guestListElement.html(guest);
		
		
        guests.push($guestListElement)
		        // remove lis to avoid dupes
        $guestBoard.empty()
}



      }

      for (var i in guests) {
		  
		  
        $guestBoard.append(guests[i]);
		var guestTotal = 1
		guestTotal =  guestTotal += parseInt(i);
		$("#total1").html(guestTotal);  
		//$("#guestCircle1").addClass("circle-small"); 
		changeCircle(guestTotal, 1);
      }
    })

  }
  
  // Show Table 2 Guests
function getTable2() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
	

	
    database.ref('guests').on('value', function (results) {
      
      var guests = []

      var allGuests = results.val();

      // iterate through results coming from database call; messages
      for (var gst in allGuests) {
        // get method is supposed to represent HTTP GET method
        var guest = allGuests[gst].guest;
		var guestTable = allGuests[gst].table;
        // create message element
        var $guestListElement = $('<li></li>')
		


        // add message to li
		if(guestTable === 2){
		var $guestBoard = $('.guest-list2')	
        $guestListElement.html(guest);
		
		
        guests.push($guestListElement)
		        // remove lis to avoid dupes
        $guestBoard.empty()
}



      }

      for (var i in guests) {
		  
		  
        $guestBoard.append(guests[i]);
		var guestTotal = 1
		guestTotal =  guestTotal += parseInt(i);
		$("#total2").html(guestTotal);  
		//$("#guestCircle2").append(`<span class="circle-small"></span>`); 
		changeCircle(guestTotal, 2);
      }
    })

  }
  
  
  // Show Table 3 Guests
     function getTable3() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
	

	
    database.ref('guests').on('value', function (results) {
      
      var guests = []

      var allGuests = results.val();

      // iterate through results coming from database call; messages
      for (var gst in allGuests) {
        // get method is supposed to represent HTTP GET method
        var guest = allGuests[gst].guest;
		var guestTable = allGuests[gst].table;
        // create message element
        var $guestListElement = $('<li></li>')
		


        // add message to li
		if(guestTable === 3){
		var $guestBoard = $('.guest-list3')	
        $guestListElement.html(guest);
		
		
        guests.push($guestListElement)
		        // remove lis to avoid dupes
        $guestBoard.empty()
}



      }

      for (var i in guests) {
		  
		  
        $guestBoard.append(guests[i]);
		var guestTotal = 1
		guestTotal =  guestTotal += parseInt(i);
		$("#total3").html(guestTotal);  
		//$("#guestCircle3").append(`<span class="circle-small"></span>`); 
		changeCircle(guestTotal, 3);
      }
    })

  }

  
  // Show Table 4 Guests
  
    function getTable4() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
	

	
    database.ref('guests').on('value', function (results) {
      
      var guests = []

      var allGuests = results.val();

      // iterate through results coming from database call; messages
      for (var gst in allGuests) {
        // get method is supposed to represent HTTP GET method
        var guest = allGuests[gst].guest;
		var guestTable = allGuests[gst].table;
        // create message element
        var $guestListElement = $('<li></li>')
		


        // add message to li
		if(guestTable === 4){
		var $guestBoard = $('.guest-list4')	
        $guestListElement.html(guest);
		
		
        guests.push($guestListElement)
		        // remove lis to avoid dupes
        $guestBoard.empty()
}



      }

      for (var i in guests) {
		  
		  
        $guestBoard.append(guests[i]);
		var guestTotal = 1
		guestTotal =  guestTotal += parseInt(i);
		$("#total4").html(guestTotal);  
		//$("#guestCircle4").append(`<span class="circle-small"></span>`); 
		changeCircle(guestTotal, 4);
      }
    })

  }
  
  // Show Table 11 Guests
  
    function getTable11() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
	

	
    database.ref('guests').on('value', function (results) {
      
      var guests = []

      var allGuests = results.val();

      // iterate through results coming from database call; messages
      for (var gst in allGuests) {
        // get method is supposed to represent HTTP GET method
        var guest = allGuests[gst].guest;
		var guestTable = allGuests[gst].table;
        // create message element
        var $guestListElement = $('<li></li>')
		


        // add message to li
		if(guestTable === 11){
		var $guestBoard = $('.guest-list11')	
        $guestListElement.html(guest);
		
		
        guests.push($guestListElement)
		        // remove lis to avoid dupes
        $guestBoard.empty()
}



      }

      for (var i in guests) {
		  
		  
        $guestBoard.append(guests[i]);
		var guestTotal = 1
		guestTotal =  guestTotal += parseInt(i);
		$("#total11").html(guestTotal);  
		//$("#guestCircle11").append(`<span class="circle-small"></span>`); 
		changeCircle(guestTotal, 11);
      }
    })

  }
  
  // Show Table 12 Guests
  
         function getTable12() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
	

	
    database.ref('guests').on('value', function (results) {
      
      var guests = []

      var allGuests = results.val();

      // iterate through results coming from database call; messages
      for (var gst in allGuests) {
        // get method is supposed to represent HTTP GET method
        var guest = allGuests[gst].guest;
		var guestTable = allGuests[gst].table;
        // create message element
        var $guestListElement = $('<li></li>')
		


        // add message to li
		if(guestTable === 12){
		var $guestBoard = $('.guest-list12')	
        $guestListElement.html(guest);
		
		
        guests.push($guestListElement)
		        // remove lis to avoid dupes
        $guestBoard.empty()
}



      }

      for (var i in guests) {
		  
		  
        $guestBoard.append(guests[i]);
		var guestTotal = 1
		guestTotal =  guestTotal += parseInt(i);
		$("#total12").html(guestTotal);   
		//$("#guestCircle12").append(`<span class="circle-small"></span>`); 
		
		changeCircle(guestTotal, 12);
		
      }
    })

  }
  
  

  // Update Guest
  function updateGuest(id) {
    var guestReference = database.ref('guests/' + id)
 
	
    var guest = prompt("Who is the Guest?");

    guestReference.update({
      guest: guest
    });
  }
  
   // Update Table
function updateGuestTable(id) {
    var guestReference = database.ref('guests/' + id)
 
	
    var tableid = prompt("What table?");

    guestReference.update({
	  table: Number(tableid)
    });
  }
  
   // Update +1
 function updateGuestPlus(id) {
    var guestReference = database.ref('guests/' + id)
 
	
    var plus1 = prompt("is there a +1?");

    guestReference.update({
	  plus1: plus1
    });
  }
  
 // Delete Guest
  function deleteGuest(id) {
    // find message whose objectId is equal to the id we're searching with
    var guestReference = database.ref('guests/' + id)

    guestReference.remove()
	
  }
  
   // Show Guest Table
    function whereGuest(id) {
    // find message whose objectId is equal to the id we're searching with
    var guestReference = database.ref('guests/' + id)

guestReference.once("value").then(function(snapshot) {
    var tableID2 = snapshot.child("table").val();
	var tableNM2 = snapshot.child("guest").val();
	showTable(tableID2, tableNM2);
  });
	

  }

  return {
    getGuests: getGuests,
	getTable0: getTable0,
	getTable1: getTable1,
	getTable2: getTable2,
	getTable3: getTable3,
	getTable4: getTable4,
	getTable11: getTable11,
	getTable12: getTable12		
  }

})();