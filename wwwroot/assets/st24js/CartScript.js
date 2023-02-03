$(document).ready(function () {



    if (localStorage.getItem("CartItems") != null) {

        var cart = JSON.parse(localStorage.getItem("CartItems"));
        if (cart.length == 0) {
            localStorage.removeItem('CartItems');
            $("#show_cart_my_cart").addClass('hidden');
        } else {
            $("#show_cart_my_cart").removeClass('hidden');
            $("#cart_counter").html(cart.length);
        }
    }
    if ($("#display_cart_items").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var arr = JSON.parse(localStorage.getItem("CartItems"));

        var raw = [];
        console.log(arr);
        arr.forEach((item, i) => {
            if (item != null) {
                var _item = item;
                raw.push(_item);
            }
        })

        console.log(JSON.stringify(raw));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/servicetypes/cart", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                var htm = '';
                var total = "0.00";
                result.forEach(item => {
                    htm += "<div id='cart_item_" + item.id + "' class='news-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                    htm += "<div class='inner-box'>"
                    htm += "    <div class='lower-content'>"
                    htm += "        <h3><a href='#'>" + item.itemName + "</a> <span class='pull-right rounded-circle'><a class='text-danger' href='javascript:removeBigCart(" + item.id + ");'>x</a></span></h3>"
                    htm += "        <ul class='post-info'>"
                    htm += "            <li><i class='far fa-money-bill-wave'></i>Price: &#8358;<a id='price_" + item.id + "' href='#'>" + item.laundryPrice + ".00</a> x <span id='mult_" + item.id + "'>1</span></li>"
                    htm += "            <li><i class='far fa-money-bill-alt'></i>Total: &#8358;<a id='total_" + item.id + "' href='#'>" + item.laundryPrice + ".00</a></li>"
                    htm += "        </ul>"

                    htm += "        <div class='link'>"
                    htm += "            <a href='javascript: doMinus(" + item.id + ");'><i class='fas fa-angle-left'></i></a>"
                    htm += "            <a id='qty_" + item.id + "' href='#'>1</a>"
                    htm += "            <a href='javascript: doPlus(" + item.id + ");'><i class='fas fa-angle-right'></i></a>"
                    htm += "        </div>"
                    htm += "    </div>"
                    htm += "</div>"
                    htm += "</div>"
                    total = parseFloat(total) + parseFloat(item.laundryPrice);
                });
                $("#shopping_cart").html(htm);
                $("#grand_total").html(formatMoney(total));
                $("#grand_total_due").html(formatMoney(total));
                $("#reset_total").val(total);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#display_my_cart_items").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var customer_id = location.search.split('=')[1];


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/items/" + customer_id, requestOptions)
            .then(response => response.json())
            .then(result => {
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
                    var all_total = 0;
                    fetch("http://services.steezz24.com/customeragents/get-grand-prices-paid/" + customer_id, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                           
                            result.forEach(item => {
                                var sums_totals = item.grandTotal;
                                var grand_total_ps = sums_totals.split('.')[0];
                                var split_ps = grand_total_ps.split(',');
                                var ns = "";
                                split_ps.forEach(item => {
                                    ns += item;
                                })
                                all_total += parseInt(ns);
                                
                                $("#grand_total_paid").html(formatMoney(all_total));
                                $("#print_total").html(formatMoney(all_total));
                            })
                        })
                    
                    $("#paid-button").removeClass('hidden');
                    
                    
                } else {
                    $("#pay-now-button").removeClass('hidden');
                    $("#grand_total").html(formatMoney(total));
                }
                $("#shopping_cart").html(htm);
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
                    console.log("gRAND_sum "+sums_G_totals)

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
        

        fetch("http://services.steezz24.com/items/getagent/" + customer_id, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                $("#customer_name").html(result)
            })
    }

    if ($("#display_daily_items").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var customer_id = location.search.split('=')[1];


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/items/daly-items/" + customer_id, requestOptions)
            .then(response => response.json())
            .then(result => {
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
                    $("#date").html(item.dateDropped);
                     
                });
                $("#grand_total_paid").html(formatMoney(total));
                $("#paid-button").removeClass('hidden');
                $("#shopping_cart").html(htm); 
            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }


});

var disc_count = "";
var btn_pay_later = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var customer_id = location.search.split('=')[1];

    var CartRef = JSON.parse(localStorage.getItem("CartItems"));
    var raw = [];

    var grand_total = $("#grand_total").html();
    var disc_applied = disc_count == "" ? 0 : disc_count;;
    var express_price = $("#express_price").val() == "" ? "0" : $("#express_price").val();
    var grand_total_due = $("#grand_total_due").html();

    CartRef.forEach((item, i) => {
        var qty = "#qty_" + item.ItemId;
        var price = "#price_" + item.ItemId;
        var total = "#total_" + item.ItemId;

        var cartItem = {
            GrandTotal: grand_total,
            DiscApplied: disc_applied,
            ExpressPrice: express_price,
            GrandTotalDue: grand_total_due,
            ServiceTypeId: item.ItemId,
            Quantity: parseInt($(qty).html()),
            price: parseFloat($(price).html()),
            Total: $(total).html(),
            DateDropped: getDate(),
            Collected: false,
            CustomerAgentId: customer_id,
            BadStock: false,
            Reason: '-',
            DateCollected: '-',
            ExpectedDate: 3,
            TransactionId: 'Not Determined',
            Paid: false
        };

        raw.push(cartItem);

    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };
    $("#btns_controller").addClass('hidden');
    $("#btns_loader").removeClass('hidden');
    fetch("http://services.steezz24.com/items/additem", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            localStorage.removeItem("CartItems");
            location.href = "/agent/customers"; 
        })
        .catch(error => {
            $("#btns_controller").removeClass('hidden');
            $("#btns_loader").addClass('hidden');
        });

}

var addToCart = (id) => {
    var found = false;
    var CartRef = JSON.parse(localStorage.getItem("CartItems"));
    CartRef = CartRef || [];
    CartRef.forEach((item, i) => {
        if (item.ItemId == id) {
            found = true;
        }
    })
    if (!found) {
        const item = {
            ItemId: id
        };
        CartRef.push(item)

        localStorage.setItem("CartItems", JSON.stringify(CartRef));
        console.log(JSON.parse(localStorage.getItem("CartItems")));
        $("#show_cart_my_cart").removeClass('hidden');
        $("#cart_counter").html(CartRef.length);
    }
}

var removeFromCart = (id) => {

    var CartRef = JSON.parse(localStorage.getItem("CartItems"));

    var CartItems = CartRef.filter(filterCart);

    function filterCart(itemId) {
        //console.log("Item_Id: " + JSON.stringify(itemId));
        return itemId.ItemId != id;
    }

    if (CartItems.length == 0) {
        $("#show_cart_my_cart").addClass('hidden');
        $("#cart_counter").html(CartItems.length);
    }

    localStorage.setItem("CartItems", JSON.stringify(CartItems));

    $("#cart_counter").html(CartItems.length);

    if (CartItems.length == 0) {
        localStorage.removeItem('CartItems');
        location.href = "/agent/customers";
    }
}

var removeBigCart = (id) => {
    var grand_total = $("#grand_total").html();

    var qty = "#qty_" + id;
    var price = "#price_" + id;
    var cart_item = "#cart_item_" + id;

    var count = parseInt($(qty).html());
    var _total_ = parseInt($(price).html()) * count;

    var grand_total_p = grand_total.split('.')[0];
    var split_p = grand_total_p.split(',');
    var n = "";
    split_p.forEach(item => {
        n += item;
    })
    grand_total_p = parseFloat(n);


    console.log(grand_total_p); console.log(_total_)


    var _grand_total_ = parseInt(grand_total_p) - parseInt(_total_);

    console.log(_grand_total_)

    $("#grand_total").html(formatMoney(_grand_total_));
    $("#grand_total_due").html(formatMoney(_grand_total_));

    $(cart_item).slideToggle('slow');

    removeFromCart(id);
}

var doPlus = (i) => {
    var grand_total = $("#grand_total").html();

    var qty = "#qty_" + i;
    var price = "#price_" + i;
    var total = "#total_" + i;
    var mult = "#mult_" + i;

    var count = parseInt($(qty).html()) + 1
    var _total_ = parseInt($(price).html()) * count;

    var grand_total_p = grand_total.split('.')[0];
    var split_p = grand_total_p.split(',');
    var n = "";
    split_p.forEach(item => {
        n += item;
    })
    grand_total_p = parseFloat(n);

    var _grand_total_ = parseInt(grand_total_p) + parseInt($(price).html());

    $("#grand_total").html(formatMoney(_grand_total_));
    $("#grand_total_due").html(formatMoney(_grand_total_));

    $(total).html(formatMoney(_total_));
    $(qty).html(count);
    $(mult).html(count);
}

var doMinus = (i) => {
    var grand_total = $("#grand_total").html();

    var qty = "#qty_" + i;
    var price = "#price_" + i;
    var total = "#total_" + i;
    var mult = "#mult_" + i;

    if ($(qty).html() != "1") {

        var count = (parseInt($(qty).html()) - 1) == 0 ? "1" : parseInt($(qty).html()) - 1;
        var _total_ = parseInt($(price).html()) * count;

        var grand_total_p = grand_total.split('.')[0];
        var split_p = grand_total_p.split(',');
        var n = "";
        split_p.forEach(item => {
            n += item;
        })
        grand_total_p = parseFloat(n);

        var _grand_total_ = parseInt(grand_total_p) - parseInt($(price).html());

        $("#grand_total").html(formatMoney(_grand_total_));
        $("#grand_total_due").html(formatMoney(_grand_total_));

        $(total).html(formatMoney(_total_));
        $(qty).html(count);
        $(mult).html(count);
    }
}

var formatMoney = (number, decPlaces, decSep, thouSep) => {
    return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

var take_to_cart = () => {
    location.href = '/agent/cart/?custid=' + location.search.split('=')[1];
}


function make_payment() {

    var grand_total = $("#grand_total_due").html();
    var grand_total_p = grand_total.split('.')[0];
    var split_p = grand_total_p.split(',');
    var g_total = "";
    split_p.forEach(item => {
        g_total += item;
    })

    var email = "receipts@steezz24.com";
    var phone_number = "08088160309";
    var firstname = "Steezz";
    var lastname = "Laundry";

    var handler = PaystackPop.setup({
        key: 'pk_live_a321b4d6b5da91e4990ba3659a1021052df216d9', // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: g_total * 100,
        firstname: firstname,//document.getElementById("first-name").value,
        lastname: lastname,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
            document.querySelector("#payment-failed").style.display = 'block';
        },
        callback: function (response) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var customer_id = location.search.split('=')[1];

            var CartRef = JSON.parse(localStorage.getItem("CartItems"));
            var raw = [];

            var grand_total = $("#grand_total").html();
            var disc_applied = disc_count == "" ? 0 : disc_count;;
            var express_price = $("#express_price").val() == "" ? "0" : $("#express_price").val();
            var grand_total_due = $("#grand_total_due").html();

            CartRef.forEach((item, i) => {
                var qty = "#qty_" + item.ItemId;
                var price = "#price_" + item.ItemId;
                var total = "#total_" + item.ItemId;

                var cartItem = {
                    GrandTotal: grand_total,
                    DiscApplied: disc_applied,
                    ExpressPrice: express_price,
                    GrandTotalDue: grand_total_due,
                    ServiceTypeId: item.ItemId,
                    Quantity: parseInt($(qty).html()),
                    price: parseFloat($(price).html()),
                    Total: $(total).html(),
                    DateDropped: getDate(),
                    Collected: false,
                    CustomerAgentId: customer_id,
                    BadStock: false,
                    Reason: '-',
                    DateCollected: '-',
                    ExpectedDate: 3,
                    TransactionId: 'Offline Payment',
                    Paid: true
                };

                raw.push(cartItem);

            })

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(raw),
                redirect: 'follow'
            };
            $("#btns_controller").addClass('hidden');
            $("#btns_loader").removeClass('hidden');
            fetch("http://services.steezz24.com/items/additem", requestOptions)
                .then(response => response.json())
                .then(result => {
                    update_Offline_Payment('Online Payment');
                    //localStorage.removeItem("CartItems");
                    //location.href = "/agent/customers";
                })
                .catch(error => {
                    console.log(error);
                    $("#btns_controller").removeClass('hidden');
                    $("#btns_loader").addClass('hidden');
                });
            
            // $("#menu-success-2").showMenu();
            //  window.location = "verify.php?reference=" + response.reference;
        }
    });
    handler.openIframe();
}

function verifyTransactionOnBackend(transactionId) { 

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var customer_id = location.search.split('=')[1];

    var CartRef = JSON.parse(localStorage.getItem("CartItems"));
    var raw = [];

    
     
    CartRef.forEach((item, i) => {
        var qty = "#qty_" + item.ItemId;
        var price = "#price_" + item.ItemId;
        var total = "#total_" + item.ItemId;

        var cartItem = {

            ServiceTypeId: item.ItemId,
            Quantity: parseInt($(qty).html()),
            price: parseFloat($(price).html()),
            Total: $(total).html(),
            DateDropped: getDate(),
            Collected: false,
            CustomerAgentId: customer_id,
            BadStock: false,
            Reason: '-',
            DateCollected: '-',
            ExpectedDate: 3,
            TransactionId: 'Online Payment',
            Paid: true
        };

        raw.push(cartItem);

    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };

    fetch("http://services.steezz24.com/items/additem", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            localStorage.removeItem("CartItems");
            location.href = "/agent/customers";
        })
        .catch(error => {
            console.log(error);
        });
}

var Offline_payment = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var param = window.location.search;
    const urlParams = new URLSearchParams(param);
    var customer_id = urlParams.get('id');
    //var customer_id = location.search.split('=')[1];

    var CartRef = JSON.parse(localStorage.getItem("CartItems"));
    var raw = [];

    var grand_total = $("#grand_total").html();
    var disc_applied = disc_count == "" ? 0 : disc_count;;
    var express_price = $("#express_price").val() == "" ? "0" : $("#express_price").val();
    var grand_total_due = $("#grand_total_due").html();

    CartRef.forEach((item, i) => {
        var qty = "#qty_" + item.ItemId;
        var price = "#price_" + item.ItemId;
        var total = "#total_" + item.ItemId;

        var cartItem = {
            GrandTotal: grand_total,
            DiscApplied: disc_applied,
            ExpressPrice: express_price,
            GrandTotalDue: grand_total_due,
            ServiceTypeId: item.ItemId,
            Quantity: parseInt($(qty).html()),
            price: parseFloat($(price).html()),
            Total: $(total).html(),
            DateDropped: getDate(),
            Collected: false,
            CustomerAgentId: customer_id,
            BadStock: false,
            Reason: '-',
            DateCollected: '-',
            ExpectedDate: 3,
            TransactionId: 'Offline Payment',
            Paid: true
        };

        raw.push(cartItem);

    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };
    $("#btns_controller").addClass('hidden');
    $("#btns_loader").removeClass('hidden');
    fetch("http://services.steezz24.com/items/additem", requestOptions)
        .then(response => response.json())
        .then(result => {
            update_Offline_Payment("Offline Payment")
           
            //location.href = "/agent/customers";
        })
        .catch(error => {
            $("#btns_controller").removeClass('hidden');
            $("#btns_loader").addClass('hidden');
            console.log(error);
        });
}

var late_online_payment = () => {

    var grand_total = $("#grand_total_due").html();
    var grand_total_p = grand_total.split('.')[0];
    var split_p = grand_total_p.split(',');
    var g_total = "";
    split_p.forEach(item => {
        g_total += item;
    })
    var email = "receipts@steezz24.com";
    var phone_number = "08088160309";
    var firstname = "Steezz";
    var lastname = "Laundry";

    var handler = PaystackPop.setup({
        key: 'pk_live_a321b4d6b5da91e4990ba3659a1021052df216d9', // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: g_total * 100,
        firstname: firstname,//document.getElementById("first-name").value,
        lastname: lastname,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
            document.querySelector("#payment-failed").style.display = 'block';
        },
        callback: function (response) {
            update_Offline_Payment('Online Payment');
            // $("#menu-success-2").showMenu();
            //  window.location = "verify.php?reference=" + response.reference;
        }
    });
    handler.openIframe();
}

var late_online_payment_private = () => {

    var grand_total = $("#grand_total_due").html();
    var grand_total_p = grand_total.split('.')[0];
    var split_p = grand_total_p.split(',');
    var g_total = "";
    split_p.forEach(item => {
        g_total += item;
    })
    var email = "receipts@steezz24.com";
    var phone_number = "08088160309";
    var firstname = "Steezz";
    var lastname = "Laundry";

    var handler = PaystackPop.setup({
        key: 'pk_live_a321b4d6b5da91e4990ba3659a1021052df216d9', // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: g_total * 100,
        firstname: firstname,//document.getElementById("first-name").value,
        lastname: lastname,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
            document.querySelector("#payment-failed").style.display = 'block';
        },
        callback: function (response) {
            update_Offline_Payment_private('Online Payment');
            // $("#menu-success-2").showMenu();
            //  window.location = "verify.php?reference=" + response.reference;
        }
    });
    handler.openIframe();
}
 

var update_Offline_Payment = (mode) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

     var customer_id = location.search.split('=')[1];

    var raw = JSON.stringify({
        "paymode": mode 
    }); 

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#pay_prg").removeClass('hidden');
    $("#pay_box").addClass('hidden');

    fetch("http://services.steezz24.com/customeragents/update-payment/" + customer_id , requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            //localStorage.removeItem("CartItems");
            location.href = "/agent/customer-items/?custid=" + customer_id
        })
        .catch(error => {
            console.log(error);
            $("#pay_prg").addClass('hidden');
            $("#pay_box").removeClass('hidden');
        });
}



var update_Offline_Payment_private = (mode) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var param = window.location.search;
    const urlParams = new URLSearchParams(param);
    var customer_id = urlParams.get('id');
    //var customer_id = location.search.split('=')[1];

    var raw = JSON.stringify({
        "paymode": mode
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#pay_prg").removeClass('hidden');
    $("#pay_box").addClass('hidden');

    fetch("http://services.steezz24.com/customeragents/update-payment/" + customer_id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            localStorage.removeItem("CartItems");
            location.href = "/agent/customer-items/?custid=" + customer_id
        })
        .catch(error => {
            console.log(error);
        });
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

var printPage = function () {
    var contents = $("#dvContents").html();
    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
    frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();
    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>Steez Laundry</title>');
    frameDoc.document.write('</head><body>');
    //Append the external CSS file. 
    frameDoc.document.write('<link href="/assets/css/font-awesome-all.css" rel="stylesheet">');
    frameDoc.document.write('<link href="/assets/css/flaticon.css" rel="stylesheet">');
    frameDoc.document.write('<link href="/assets/css/owl.css" rel="stylesheet">');
    frameDoc.document.write('<link href="/assets/css/bootstrap.css" rel="stylesheet">');
    frameDoc.document.write('<link href="/assets/css/jquery.fancybox.min.css" rel="stylesheet">');
    frameDoc.document.write('<link href="/assets/css/animate.css" rel="stylesheet">');
    frameDoc.document.write('<link href="/assets/css/color.css" rel="stylesheet">');
    frameDoc.document.write('<link href="/assets/css/style.css" rel="stylesheet">');
    frameDoc.document.write('<link href="/assets/css/responsive.css" rel="stylesheet">');
    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        frame1.remove();
    }, 500);
}

var mark_collected = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };

    var customer_id = location.search.split('=')[1];

    $("#collect_prg").removeClass('hidden')
    $("#collect_box").addClass('hidden');

    fetch("http://services.steezz24.com/customeragents/" + customer_id, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            finalize()
        })
        .catch(error => console.log('error', error));

}

var finalize = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };

    var customer_id = location.search.split('=')[1];

    fetch("http://services.steezz24.com/items/set-item-collected/" + customer_id, requestOptions)
        .then(response => response.text())
        .then(result => {
            location.href = "/agent/customers"
            console.log(result)
        })
        .catch(error => console.log('error', error));

}

var calculate_reset = () => {
    
    $("#grand_total_due").html($("#grand_total").html());
    $("#express_price").val('');
}

var apply_discount = (d) => {

    var split_due = $("#grand_total").html().split('.')[0];
    var split_p = split_due.split(',');

    var n = "";
    split_p.forEach(item => {
        n += item;
    })

    disc_count = d;
    var reset_value =  parseFloat(n);
    var disc_percent = parseInt(d);
    var disc_calc = disc_percent / 100;
    var discount = disc_calc * reset_value
    var display_discount = reset_value - discount
    $("#grand_total_due").html(formatMoney(display_discount));

}

var calculate_express = () => {

    if ($("#express_price").val() != "") {
        var split_due = $("#grand_total_due").html().split('.')[0];
        var split_p = split_due.split(',');

        var n = "";
        split_p.forEach(item => {
            n += item;
        })

        var express_price = parseFloat(n) + parseFloat($("#express_price").val())
        $("#grand_total_due").html(formatMoney(express_price));
    }
}