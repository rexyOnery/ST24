var hasBank = false;
$(document).ready(function () {
   

    $("#btn_new_customer").click(function () {

        $("#error-message").html('');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("origin", "https://localhost:5001");

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
            "AccountId": localStorage.getItem("login_id"),
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
        fetch("http://services.steezz24.com/customeragents/createcustomer", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message != null) {
                    $("#error-message").addClass('text-error');
                    $("#error-message").html(result.message);
                    $("#action_loading").addClass('hidden');
                    $("#btn_new_customer").removeClass('hidden');
                } else {
                    location.href = "/agent/collections/?customer=" + result.id;
                }

            })
            .catch(error => {
                $("#error-message").addClass('text-error');
                $("#error-message").html(error);
                $("#action_loading").addClass('hidden');
                $("#btn_new_customer").removeClass('hidden');
            });
    });

    if ($("#my_customers").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/customeragents/" + localStorage.getItem("login_id"), requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                $("#request_count").html(result.length + " Customer(s)");
                htm = '';
                result.forEach(item => {
                    htm += "<div class='comment'>"
                    htm += "       <figure class='thumb-box'>"
                    htm += "            <img src='/assets/images/gallery/gallery-1.jpg' alt=''>"
                    htm += "        </figure>"
                    htm += "        <div class='comment-inner'>"
                    htm += "            <div class='comment-info clearfix'>"
                    htm += "                <h4>" + item.name + "</h4>"
                    htm += "                <span class='post-date'><i class='far fa-clock'></i>" + item.dateAdded + "</span>"
                    htm += "            </div>"
                    htm += "            <p>Contact: " + item.phone + "</p>"
                    htm += "            <p>" + item.location + "</p>"
                    if (item.processing) {
                        htm += "            <a href='/agent/customer-items/?custid=" + item.id + "' class='reply-btn'>View Items <i class='fas fa-check'></i></a>"
                    } else {
                        htm += "            <a href='/agent/collections/?custid=" + item.id + "' class='reply-btn'>Add Items</a>"
                    }
                    htm += "        </div>"
                    htm += "    </div>"
                });
                $("#my_customer").html(htm);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#assigned_customers").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/customeragents/assigned-customers/" + localStorage.getItem("login_id"), requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                $("#request_count").html(result.length + " Customer(s)");
                htm = '';
                result.forEach(item => {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='icon-box'><i class='flaticon-washing-machine-1'></i></div>"
                    htm += "    <h4>" + item.name + "</h4>"
                    htm += "    <p>" + item.location + "</p>"
                    htm += "    <p>" + item.phone + "</p>"
                    htm += "    <span><a href='/agent/collections/?custid=" + item.id + "'>Add Item</a></span>"
                    htm += "</div>"
                    htm += "</div>"
                    htm += "</div> "
                });
                $("#dashboard").html(htm);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#agent_dash_call").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        $("#agent_name").html(localStorage.getItem("users_name"));
        fetch("http://services.steezz24.com/customeragents/awaiting-customers/" + localStorage.getItem("login_id"), requestOptions)
            .then(response => response.json())
            .then(result => {
                $("#awaiting_delivery_count").html(result.length);
            })
            .catch(error => {

            });
    }



    if ($("#agent_commission").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/agentcommission/" + localStorage.getItem("login_id"), requestOptions)
            .then(response => response.json())
            .then(result => {

                var item = result;

                $("#grand_total").html(formatMoney(parseInt(item.totalGenerated)));
                $("#commission_total").html(formatMoney(parseInt(item.totalCommission)));
                hasBank = item.bank == '-' ? false : true;
                $("#commission_id").val(item.id);

                if (item.isRequest) {
                    $("#place_request_btn").addClass('hidden');
                    $("#request_placed").removeClass('hidden');
                }
                $("#loading").addClass('hidden')

            })
            .catch(error => {
                $("#loading").addClass('hidden')
            });
    }


    if ($("#awaiting_delivery").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/customeragents/awaiting-customers/" + localStorage.getItem("login_id"), requestOptions)
            .then(response => response.json())
            .then(result => {

                $("#ad_loader").html(result.length);

                htm = '';
                if (result.length > 0) {
                    result.forEach(item => {
                        htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                        htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                        htm += "<div class='inner-box'>"
                        htm += "    <div class='icon-box'><i class='flaticon-washing-machine-1'></i></div>"
                        htm += "    <h4>" + item.name + "</h4>"
                        htm += "    <p>" + item.location + "</p>"
                        htm += "    <p>" + item.phone + "</p>"
                        htm += "    <span><a href='/agent/customer-items/?custid=" + item.id + "'>View Item(s)</a></span>"
                        htm += "</div>"
                        htm += "</div>"
                        htm += "</div> "
                    });
                    $("#awaiting_delivery").html(htm);
                }
            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#item_collections").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/servicetypes", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                htm = '';
                result.forEach(item => {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 pricing-block' style='margin-bottom:50px'>"
                    htm += "    <div class='pricing-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                    htm += "        <div class='icon-box'><i class='" + item.icon + "'></i></div>"
                    htm += "        <div class='inner-box'>"
                    htm += "            <span>" + item.itemName + " Services</span>"
                    htm += "            <h3>" + item.laundryPrice + "</h3>"
                    htm += "            <div class='link'><a href='javascript: addToCart(" + item.id + ")'><i class='fas fa-angle-right'></i></a></div>"
                    htm += "            <div class='light-icon'><i class='" + item.icon + "'></i></div>"
                    htm += "        </div>"
                    htm += "    </div>"
                    htm += "</div> "
                });
                $("#item_collections").html(htm);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

});

var placeRequest = () => {
    if (!hasBank) {
        $("#commissiona").hide('slow');
        $("#comm_bank").show('slow')
    } else {
        placeDataRequest();
    }
}

var placeDataRequest = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "Id": $("#commission_id").val(),
        "IsRequest": true,
        "IsPaid": false
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://services.steezz24.com/agentcommission/place-commission/" + $("#commission_id").val(), requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.message == "Commission updated successfully") {
                $("#place_request_btn").addClass('hidden');
                $("#request_placed").removeClass('hidden');
            }

        })
        .catch(error => {

        });
}


var saveAndPlaceDataRequest = () => {

    if ($("#txtBank").val() == "") {
        $("#txtBank").focus();
        return false;
    }
    if ($("#txtAccountName").val() == "") {
        $("#txtAccountName").focus();
        return false;
    }
    if ($("#txtAccountNumber").val() == "") {
        $("#txtAccountNumber").focus();
        return false;
    }


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "Id": $("#commission_id").val(),
        "AccountNumber": $("#txtAccountNumber").val(),
        "AccountName": $("#txtAccountName").val(),
        "Bank": $("#txtBank").val(),
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#place_data_request_btn").addClass('hidden');
    $("#img_Roll").removeClass('hidden')
    fetch("http://services.steezz24.com/agentcommission/" + $("#commission_id").val(), requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.message == "Commission updated successfully") {
                $("#commissiona").show('slow');
                $("#comm_bank").hide('slow')
                $("#place_request_btn").addClass('hidden');
                $("#request_placed").removeClass('hidden');

                $("#place_data_request_btn").removeClass('hidden');
                $("#img_Roll").addClass('hidden')
            }

        })
        .catch(error => {
            $("#place_data_request_btn").removeClass('hidden');
            $("#img_Roll").addClass('hidden')
        });
}


var formatMoney = (number, decPlaces, decSep, thouSep) => {
    return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

var getProcess = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if ($("#phone").val() == "") {
        $("#msg").html("Please enter your phone number");
        $("#phone").focus();
        $("#msg").css('color', 'red');
        return false;
    }
    var raw = JSON.stringify({
        "Phone": $("#phone").val()
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#process_for").html("Process for " + $("#phone option:selected").text());
    $("#loader").removeClass('hidden');
    $("#btn_Status").addClass('hidden');
    $("#msg").html("");
    $("#item_status").html("");

    fetch("http://services.steezz24.com/customeragents/getitemprocess", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.id != 0) {
                var htm = "";
                localStorage.setItem("ProcessID", result.id);
                htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                htm += "<div class='inner-box'>"
                htm += "    <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                htm += "    <div class='icon-box'><i class='flaticon-washing-machine-1'></i></div>"
                htm += "    <h4>Clothes Collected</h4>"

                htm += "    <span style='background: #ffb81f;'>COMPLETED</span>"
                htm += "</div>"
                htm += "</div>"
                htm += "</div>"
                if (result.isProcessing == false) {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='400ms' data-wow-duration='1500ms'>"
                    htm += "    <div class='inner-box'>"
                    htm += "        <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                    htm += "        <div class='icon-box'><i class='flaticon-rinse'></i></div>"
                    htm += "        <h4>Processing</h4>"
                    htm += "    <img src='/assets/images/gifs/loader_1.gif' class='hidden' id='loader_2' width='150' height='100' />"
                    htm += "        <a href='javascript:markStep(2);'><span id='step_2'>IN PROGRESS</span></a>"
                    htm += "    </div>"
                    htm += "</div>"
                    htm += "</div>"
                } else {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='400ms' data-wow-duration='1500ms'>"
                    htm += "    <div class='inner-box'>"
                    htm += "        <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                    htm += "        <div class='icon-box'><i class='flaticon-rinse'></i></div>"
                    htm += "        <h4>Processing</h4>"

                    htm += "    <span style='background: #ffb81f;'>COMPLETED</span>"
                    htm += "    </div>"
                    htm += "</div>"
                    htm += "</div>"
                }
                if (result.ready == false) {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='300ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                    htm += "    <div class='icon-box'><i class='flaticon-calendar'></i></div>"
                    htm += "    <h4>Ready for Pick-up</h4>"
                    htm += "    <img src='/assets/images/gifs/loader_1.gif' class='hidden' id='loader_3' width='150' height='100' />"
                    htm += "    <a href='javascript:markStep(3);'><span id='step_3'>Step 03</span></a>"
                    htm += "</div>"
                    htm += "</div>"
                    htm += "</div>"
                } else {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='300ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                    htm += "    <div class='icon-box'><i class='flaticon-calendar'></i></div>"
                    htm += "    <h4>Ready for Pick-up</h4>"

                    htm += "    <span style='background: #ffb81f;'>ITEM READY</span>"
                    htm += "</div>"
                    htm += "</div>"
                    htm += "</div>"
                }
                if (result.collected == false) {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block fancybox-active'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='600ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='icon-box'><i class='flaticon-delivery'></i></div>"
                    htm += "    <h4>Collected</h4>"
                    htm += "    <img src='/assets/images/gifs/loader_1.gif' class='hidden' id='loader_4' width='150' height='100' />"
                    htm += "    <a href='javascript:markStep(4);'><span id='step_4'>Step 04</span></a>"
                    htm += "</div>"
                    htm += "</div>"
                    htm += "</div>"
                } else {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block fancybox-active'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='600ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='icon-box'><i class='flaticon-delivery'></i></div>"
                    htm += "    <h4>Collected</h4>"

                    htm += "    <span style='background: #ffb81f;'>COLLECTED</span>"
                    htm += "</div>"
                    htm += "</div>"
                    htm += "</div>"
                }
                $("#item_status").html(htm);
                $("#loader").addClass('hidden');
                $("#btn_Status").removeClass('hidden');
            }
            else {
                $("#loader").addClass('hidden');
                $("#btn_Status").removeClass('hidden');
                $("#msg").html("Sorry, number not on the system.")
            }
        })
        .catch(error => {
            $("#loader").addClass('hidden');
            $("#btn_Status").removeClass('hidden');
            $("#msg").html("Sorry, system error. Try again")
        });

}

var markStep = (id) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if ($("#phone").val() == "") {
        $("#msg").html("Please enter your phone number");
        $("#phone").focus();
        $("#msg").css('color', 'red');
        return false;
    }
    var raw = JSON.stringify({ 
        "Stage": id,
        "Id": localStorage.getItem("ProcessID")
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
   
    $("#btn_Status").addClass('hidden');
    $("#msg").html("");

    var loader = "#loader_" + id;
    $(loader).removeClass('hidden');

    fetch("http://services.steezz24.com/customeragents/setitemprocess/" + localStorage.getItem("ProcessID"), requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.id != 0) {
                var htm = "";

                htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                htm += "<div class='inner-box'>"
                htm += "    <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                htm += "    <div class='icon-box'><i class='flaticon-washing-machine-1'></i></div>"
                htm += "    <h4>Clothes Collected</h4>"
                
                htm += "    <span style='background: #ffb81f;'>COMPLETED</span>"
                htm += "</div>"
                htm += "</div>"
                htm += "</div>"
                if (result.isProcessing == false) {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='400ms' data-wow-duration='1500ms'>"
                    htm += "    <div class='inner-box'>"
                    htm += "        <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                    htm += "        <div class='icon-box'><i class='flaticon-rinse'></i></div>"
                    htm += "        <h4>Processing</h4>"
                    htm += "    <img src='/assets/images/gifs/loader_1.gif' class='hidden' id='loader_2' width='150' height='100' />"
                    htm += "        <a href='javascript:markStep(2);'><span id='step_2'>IN PROGRESS</span></a>"
                    htm += "    </div>"
                    htm += "</div>"
                    htm += "</div>"
                } else {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='400ms' data-wow-duration='1500ms'>"
                    htm += "    <div class='inner-box'>"
                    htm += "        <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                    htm += "        <div class='icon-box'><i class='flaticon-rinse'></i></div>"
                    htm += "        <h4>Processing</h4>"

                    htm += "    <span style='background: #ffb81f;'>COMPLETED</span>"
                    htm += "    </div>"
                    htm += "</div>"
                    htm += "</div>"
                }
                if (result.ready == false) {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='300ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                    htm += "    <div class='icon-box'><i class='flaticon-calendar'></i></div>"
                    htm += "    <h4>Ready for Pick-up</h4>"
                    htm += "    <img src='/assets/images/gifs/loader_1.gif' class='hidden' id='loader_3' width='150' height='100' />"
                    htm += "    <a href='javascript:markStep(3);'><span id='step_3'>Step 03</span></a>"
                    htm += "</div>"
                    htm += "</div>"
                    htm += "</div>"
                } else {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='300ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='arrow' style='background-image: url(assets/images/icons/arrow-1.png);'></div>"
                    htm += "    <div class='icon-box'><i class='flaticon-calendar'></i></div>"
                    htm += "    <h4>Ready for Pick-up</h4>"

                    htm += "    <span style='background: #ffb81f;'>ITEM READY</span>"
                    htm += "</div>"
                    htm += "</div>"
                    htm += "</div>"
                }
                if (result.collected == false) {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block fancybox-active'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='600ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='icon-box'><i class='flaticon-delivery'></i></div>"
                    htm += "    <h4>Item(s) Collected</h4>"
                    htm += "    <img src='/assets/images/gifs/loader_1.gif' class='hidden' id='loader_4' width='150' height='100' />"
                    htm += "    <a href='javascript:markStep(4);'><span id='step_4'>Step 04</span></a>"
                    htm += "</div>"
                    htm += "</div>"
                    htm += "</div>"
                } else {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 process-block fancybox-active'>"
                    htm += "<div class='process-block-one wow fadeInUp animated animated' data-wow-delay='600ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='icon-box'><i class='flaticon-delivery'></i></div>"
                    htm += "    <h4>Item(s) Collected</h4>"

                    htm += "    <span style='background: #ffb81f;'>COLLECTED</span>"
                    htm += "</div>"
                    htm += "</div>"
                    htm += "</div>"
                }
                $("#item_status").html(htm);
                $(loader).addClass('hidden');
                $("#btn_Status").removeClass('hidden');
            }
            else {
                $(loader).addClass('hidden');
                $("#btn_Status").removeClass('hidden');
                $("#msg").html("Sorry, number not on the system.")
            }
        })
        .catch(error => {
            $(loader).addClass('hidden');
            $("#btn_Status").removeClass('hidden');
            $("#msg").html("Sorry, system error. Try again")
        });


}
