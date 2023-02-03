 

$(document).ready(function () {

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    $("#btn_contact").click(() => {
        var name = $("#username").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        $("#msg").html('');
        if (name == "" || name.length < 3) {
            $("#msg").html("Please enter your name");
            $("#username").focus();
            $("#msg").css('color', 'red');
            return false;
        }
        if (email == "" ) {
            $("#msg").html("Please enter your email address");
            $("#email").focus();
            $("#msg").css('color', 'red');
            return false;
        }
        if (!validateEmail(email)) {
            $("#msg").html("Please enter a valid email address.");
            $("#email").focus();
            $("#msg").css('color', 'red');
            return false;
        }
        if (phone == "") {
            $("#msg").html("Please enter your phone number");
            $("#phone").focus();
            $("#msg").css('color', 'red');
            return false;
        }
        if (subject == "") {
            $("#msg").html("Please enter the subject of your message");
            $("#subject").focus();
            $("#msg").css('color', 'red');
            return false;
        }
        if (message == "" ) {
            $("#msg").html("Please enter the message");
            $("#message").focus();
            $("#msg").css('color', 'red');
            return false;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Name": name,
            "Subject": subject,
            "Phone": phone,
            "message": message,
            "email": email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        $("#loader").removeClass('hidden');
        $("#btn_contact").addClass('hidden');

        fetch("http://services.steezz24.com/accounts/sendmail", requestOptions)
            .then(response => response.json())
            .then(result => {
                $("#msg").html(result.message);
                $("#msg").css('color', 'green');

                $("#loader").addClass('hidden');
                $("#btn_contact").removeClass('hidden');
                 
            })
            .catch(error => {
                $("#msg").html(error);
                $("#msg").css('color', 'red');
                $("#loader").addClass('hidden');
                $("#btn_contact").removeClass('hidden');
            });
    });

    if ($("#pricing").length != 0) {

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
                var htm = ''; 
                result.forEach(item => {

                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 pricing-block' style='margin-bottom:20px'>"
                    htm += "<div class='pricing-block-one wow fadeInUp animated animated' data-wow-delay='600ms' data-wow-duration='1500ms'>"
                    htm += "    <div class='icon-box'><i class='" + item.icon + "'></i></div>"
                    htm += "    <div class='inner-box'>"
                    htm += "        <span>" + item.itemName + "</span>"
                    htm += "        <h3>&#8358;" + item.laundryPrice + "</h3>"
                    htm += "        <div class='light-icon'><i class='" + item.icon + "'></i></div>"
                    htm += "    </div>"
                    htm += "</div>"
                    htm += "</div>" 

                }); 
                $("#pricing").html(htm);
            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });

    }

});


if ($("#search_result_cart").length != 0) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var param = window.location.search;
    const urlParams = new URLSearchParams(param);
    var customer_id = urlParams.get('id');
    var _cust_phone = urlParams.get('phone');

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://services.steezz24.com/items/" + customer_id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            var print = '';
            var htm = '';
            var total = 0;
            var paid = false;
            
            result.forEach(item => {
                //addToCart(item.ServiceTypeId);
                var sum_total = item.total;
                var grand_total_p = sum_total.split('.')[0];
                var split_p = grand_total_p.split(',');
                var n = "";
                
                split_p.forEach(item => {
                    n += item;
                })
                grand_total_p = parseFloat(n);

                htm += "<div id='cart_item_" + item.id + "' class='news-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                htm += "<div class='inner-box'>"
                htm += "    <div class='lower-content'>"
                htm += "        <h3><a href='#'>" + item.itemName + "</a> </h3>"
                htm += "        <ul class='post-info'>"
                htm += "            <li><i class='far fa-money-bill-wave'></i>Price: &#8358;<a href='#'>" + formatMoney(parseInt(item.price)) + "</a> x <span>" + item.quantity + " " + item.itemName + "</span></li>"

                htm += "        </ul>"

                htm += "        <div class='link'>"
                htm += "            <span id='qty_" + item.id + "' href='#'>&#8358;" + formatMoney(grand_total_p) + "</span>"
                htm += "        </div>"
                htm += "    </div>"
                htm += "</div>"
                htm += "</div>"

                print += "<div class='lower-content' style='font-size:xx-large; padding-bottom:15px'>"
                print += "<span><a href='#'>" + item.itemName + "</a> </span> - &#8358;<span>" + formatMoney(parseInt(item.price)) + "</span> x <span>" + item.quantity + "</span>  <span class='pull-right' href='#'>&#8358;" + formatMoney(grand_total_p) + "</span>"
                print += "</div>"

                total = parseInt(total) + parseInt(grand_total_p);
                paid = item.paid;

               
                $("#customerName").html(item.customerName);
                $("#phone").html(item.phone);
                $("#address").html(item.location);
                $("#p_date").html(item.dateDropped);
                $("#date").html(item.dateDropped);

                $("#print_name").html("Customer Name: " + item.customerName);
                $("#print_phone").html("Customer Phone: " + item.phone);
                $("#print_address").html("Customer Address: " + item.location);
                $("#print_date").html("Date Colledted: " + item.dateCollected + "<p><br /></p>");

                $("#p_phone").html(item.phone);
                $("#p_address").html(item.location);
                $("#print_date").html(getDate());
                 

            });

            if (paid) {
                //var all_total = 0;
                //fetch("http://services.steezz24.com/customeragents/get-grand-prices-paid/" + customer_id, requestOptions)
                //    .then(response => response.json())
                //    .then(result => {

                //        result.forEach(item => {
                //            var sums_totals = item.grandTotal;
                //            var grand_total_ps = sums_totals.split('.')[0];
                //            var split_ps = grand_total_ps.split(',');
                //            var ns = "";
                //            split_ps.forEach(item => {
                //                ns += item;
                //            })
                //            all_total += parseInt(ns);

                //            $("#grand_total_paid").html(formatMoney(all_total));
                //            $("#print_total").html(formatMoney(all_total));
                //        })
                //    })

                 
                $("#g_grand_0").addClass('hidden')
                $("#pay_box").addClass('hidden')

            } else {
                $("#pay-now-button").removeClass('hidden');
                $("#grand_total").html(formatMoney(total));
            }
            $("#search_result_cart").html(htm);
            $("#printBody").html(print);
        })
        .catch(error => {
            console.log(error);
            $("#action_loading").addClass('hidden');
            $("#not_okay").removeClass('hidden');
        });

    var sums_G_totals = 0;
    var sums_Ex_totals = 0;
    var sums_Disc_totals = 0;
    fetch("http://services.steezz24.com/customeragents/get-grand-prices/" + customer_id, requestOptions)
        .then(response => response.json())
        .then(result => {

            result.forEach(item => {
                var sums_totals = item.grandTotal;
                var grand_total_ps = sums_totals.split('.')[0];
                var split_ps = grand_total_ps.split(',');
                var ns = "";
                split_ps.forEach(item => {
                    ns += item;
                });
                sums_G_totals += parseInt(ns);
                console.log("gRAND_sum " + sums_G_totals)

                var ex_totals = item.express;
                var ex_totals_ps = ex_totals.split('.')[0];
                var rx_split_ps = ex_totals_ps.split(',');
                var ens = "";
                rx_split_ps.forEach(item => {
                    ens += item;
                });
                sums_Ex_totals += parseInt(ens);

                sums_Disc_totals += parseInt(item.discount);

                console.log("format: " + formatMoney(sums_G_totals))

                $("#grand_total_due").html(formatMoney(sums_G_totals));
                $("#express_charge").html(formatMoney(sums_Ex_totals));
                $("#percent_off").html(sums_Disc_totals);
            })
        })


    fetch("http://services.steezz24.com/items/getcustomer/" + customer_id, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            $("#customer_name").html(result)
        })

    var raw = JSON.stringify({
        "Phone": _cust_phone
    });

    var requestOptions_2 = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    $("#loader").removeClass('hidden');
    $("#btn_Status").addClass('hidden');
    $("#msg").html("");
    var processing = "";
    fetch("http://services.steezz24.com/customeragents/getitemprocess", requestOptions_2)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.isProcessing == true) {
                $("#Status").html("Processing");
                $("#pay_box").addClass('hidden')
            }
            if (result.ready == true)
                $("#Status").html("ready for pick-up")
            if (result.collected == true) {
                $("#Status").html("Collected");

                $("#div_address_0").addClass('hidden');
                $("#div_phone_0").addClass('hidden');
                $("#g_grand_0").addClass('hidden')
                $("#pay_box").addClass('hidden')
            }
            if (result.collected == false && result.isProcessing == false && result.ready == false) {
                $("#Status").html("In Progress");
                $("#div_address_0").addClass('hidden');
                $("#div_phone_0").addClass('hidden');
                //$("#g_grand_0").addClass('hidden')
                $("#pay_box").addClass('hidden')
            }

        });

    
    
}


var formatMoney = (number, decPlaces, decSep, thouSep) => {
    return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}


var getDate = () => {

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date();
    let day = weekday[d.getUTCDay()];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[d.getUTCMonth()];

    let dayNumber = d.getUTCDate();

    let year = d.getUTCFullYear();

    return day + ", " + month + " " + dayNumber + ", " + year;

}


var getUserItemStatus = () => {

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
    $("#loader").removeClass('hidden');
    $("#btn_Status").addClass('hidden');
    $("#msg").html("")
    fetch("http://services.steezz24.com/servicetypes/search", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (!isNaN(result))
                location.href = "/searchresult/?id=" + result + "&phone=" + $("#phone").val();
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
