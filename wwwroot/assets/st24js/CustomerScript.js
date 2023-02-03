$(document).ready(function () {


    $("#btn_new_customer").click(function () {

        $("#error-message").html('');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("origin", "http://steezz24.com");

        var name = $("#name").val();
        var phone = $("#phone").val();
        var address = $("#address").val();
        var state = "Abuja";

        if (name.length <= 2 || name == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Fullname is required! Must not be less than 3 characters.');
            return false;
        }

        if (phone.length < 11 || phone == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Phone is required! Must not be less than 11 digits.');
            return false;
        }

        if (address == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Address is required!');
            return false;
        }

        if (state == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('State is required!');
            return false;
        }


        var raw = JSON.stringify({ 
            "Name": name,
            "Phone": phone,
            "Location": address,
            "State": state
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        $("#action_loading").removeClass('hidden');
        $("#btn_new_customer").addClass('hidden');
        fetch("http://services.steezz24.com/customeragents/customer", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.message != null) {
                    $("#error-message").addClass('text-error');
                    $("#error-message").html(result.message);
                    $("#action_loading").addClass('hidden');
                    $("#btn_new_customer").removeClass('hidden');
                } else {
                    sendSMS();
                    $("#error-message").addClass('text-success');
                    $("#error-message").html("Thanks! Your request has been placed. Our agent will connect with you shortly.");
                    $("#action_loading").addClass('hidden');
                    $("#btn_new_customer").removeClass('hidden');
                }

            })
            .catch(error => {
                $("#error-message").addClass('text-error');
                $("#error-message").html(error);
                $("#action_loading").addClass('hidden');
                $("#btn_new_customer").removeClass('hidden');
            });
    });


    $("#btn_quick_request").click(function () {

        $("#error-message").html('');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("origin", "http://steezz24.com");

        var name = $("#name").val();
        var phone = $("#phone").val();
        var address = $("#address").val();
        var itemCount = $("#total_items").val();
        var notes = $("#notes").val();

        if (name.length <= 2 || name == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Fullname is required! Must not be less than 3 characters.');
            return false;
        }

        if (phone.length < 11 || phone == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Phone is required! Must not be less than 11 digits.');
            return false;
        }

        if (address == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Address is required!');
            return false;
        } 
        if (itemCount == "" ) {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Total Item Count is required!');
            return false;
        }

        if (parseInt(itemCount) == 0) {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Total Item Count cannot be zero!');
            return false;
        }

        
        var raw = JSON.stringify({
            "CustomerName": name,
            "CustomerPhone": phone,
            "CustomerAddress": address,
            "TotalItems": parseInt(itemCount),
            "Notes": notes
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        $("#action_loading").removeClass('hidden');
        $("#btn_quick_request").addClass('hidden');
        fetch("http://services.steezz24.com/quickorder/addquickorder", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.length == 0) {
                    $("#error-message").addClass('text-error');
                    $("#error-message").html("Could not add the request. Please try again");
                    $("#action_loading").addClass('hidden');
                    $("#btn_quick_request").removeClass('hidden');
                } else {
                    
                    $("#error-message").addClass('text-success');
                    $("#error-message").html("Thanks! The quick request has been placed.");
                    $("#action_loading").addClass('hidden');
                    $("#btn_quick_request").removeClass('hidden');
                }

            })
            .catch(error => {
                $("#error-message").addClass('text-error');
                $("#error-message").html(error);
                $("#action_loading").addClass('hidden');
                $("#btn_quick_request").removeClass('hidden');
            });
    });

    if ($("#customers_without_agent").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/quickorder", requestOptions)
            .then(response => response.json())
            .then(result => {
              
                $("#request_count").html(result.length + " New Customer Request(s)"); 
                
                htm = '';
                result.forEach(item => {
                    htm += "<div class='comment' id='row_" + item.id + "'>"
                    htm += "       <figure class='thumb-box'>"
                    htm += "            <img src='/assets/images/gallery/gallery-1.jpg' alt=''>"
                    htm += "        </figure>"
                    htm += "        <div class='comment-inner'>"
                    htm += "            <div class='comment-info clearfix'>"
                    htm += "                <h4>" + item.customerName + "</h4>"
                    htm += "                <span class='post-date'><i class='far fa-clock'></i>" + item.dateDropped + "</span>"
                    htm += "            </div>"
                    htm += "            <p>Contact: " + item.customerPhone + "</p>"
                    htm += "            <p>" + item.customerAddress + "</p>"
                    htm += "            <p>" + item.notes + "</p>"
                    htm += "            <img class='hidden' id='loader_" + item.id + "' src='/assets/images/gifs/loader_2.gif' alt='' ><a id='remove_" + item.id + "' href='javascript:removeRequest(" + item.id + ")' class='reply-btn'>Delete</a>"
                    htm += "        </div>"
                    htm += "    </div>"
                });
                $("#new_customer").html(htm);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

});


var removeRequest = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };
    var row = "#row_" + id;
    var loader = "#loader_" + id;
    var remove = "#remove_" + id;
    $(loader).removeClass('hidden');
    $(remove).addClass('hidden');
    fetch("http://services.steezz24.com/quickorder/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.message == "quick order deleted successfully") {
                $(row).hide('slow');
            } else {
                $(loader).addClass('hidden');
                $(remove).removeClass('hidden');
            }
        })
        .catch(error => { 
            $(loader).addClass('hidden'); 
            $(remove).removeClass('hidden');
        });
     
}

var sendSMS = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
     
    var requestOptions = {
        method: 'GET',
        headers: myHeaders, 
        redirect: 'follow'
    }; 

    fetch("http://services.steezz24.com/sms/request", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            $("#error-message").addClass('text-success');
            $("#error-message").html(result.message);
            $("#action_loading").addClass('hidden');
            $("#btn_new_customer").removeClass('hidden');

        })
        .catch(error => {
            $("#error-message").addClass('text-error');
            $("#error-message").html(error);
            $("#action_loading").addClass('hidden');
            $("#btn_new_customer").removeClass('hidden');
        });

}
