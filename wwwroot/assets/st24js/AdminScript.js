$(document).ready(function () {

    $("#btn_login").click(function () {

        $("#error-message").html('');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("origin", "http://steezz24.com");

        var email = $("#email").val();
        var password = $("#password").val();

        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
        if (email == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Email is required.');
            return false;
        }

        if (!pattern.test(email)) {
            $("#error-message").addClass('text-warning');
            $("#error-message").html(email + ' is not a valid e-mail address');
            return false;
        }

        if (password == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Password is required!');
            return false;
        }

        var raw = JSON.stringify({
            "Email": email,
            "Password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        $("#action_loading").removeClass('hidden');
        $("#btn_login").addClass('hidden');
        fetch("http://services.steezz24.com/accounts/authenticate", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.message != null) {
                    $("#error-message").addClass('text-error');
                    $("#error-message").html(result.message);
                    $("#action_loading").addClass('hidden');
                    $("#btn_login").removeClass('hidden');
                } else {
                    localStorage.setItem("login_id", result.id);
                    localStorage.setItem("user_role", result.role);
                    localStorage.setItem("users_name", result.name);
                    if (result.role == "User") {
                        location.href = "/agent/dashboard";
                    } else {
                        location.href = "/admin/dash-board";
                    }
                }
            })
            .catch(error => {
                $("#error-message").addClass('text-error');
                $("#error-message").html(error);
                $("#action_loading").addClass('hidden');
                $("#btn_login").removeClass('hidden');
            });
    });


    $("#btncreate").click(function () {

        $("#error-message").html('');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("origin", "http://steezz24.com");

        var email = $("#email").val();
        var fullname = $("#fullname").val();
        var phone = $("#phone").val();
        var state = $("#state").val();
        var location = $("#location").val();
        var password = $("#password").val();
        var cnfpassword = $("#cnfpassword").val();

        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
        if (email == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Email is required.');
            return false;
        }

        if (!pattern.test(email)) {
            $("#error-message").addClass('text-warning');
            $("#error-message").html(email + ' is not a valid e-mail address');
            return false;
        }

        if (fullname.length <= 2 || fullname == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Fullname is required! Must not be less than 3 characters.');
            return false;
        }

        if (phone.length < 11 || phone == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Phone is required! Must not be less than 11 digits.');
            return false;
        }

        if (state == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('State is required!');
            return false;
        }

        if (location == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Location is required!');
            return false;
        }

        if (password == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Password is required!');
            return false;
        }

        if (cnfpassword == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Password Confirmation is required!');
            return false;
        }

        if (password != cnfpassword) {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Invalid password confirmation! Please verify your password.');
            return false;
        }


        var raw = JSON.stringify({
            "Email": email,
            "Name": fullname,
            "Phone": phone,
            "State": state,
            "Location": location,
            "Password": password,
            "ConfirmPassword": cnfpassword,
            "AcceptTerms": true
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        $("#action_loading").removeClass('hidden');
        $("#btncreate").addClass('hidden');
        fetch("http://services.steezz24.com/accounts/register", requestOptions)
            .then(response => response.json())
            .then(result => {
                var res = result.message;
                $("#error-message").addClass('text-success');
                $("#error-message").html(res);
                $("#action_loading").addClass('hidden');
                $("#btncreate").removeClass('hidden');
            })
            .catch(error => {
                $("#error-message").addClass('text-error');
                $("#error-message").html(error);
                $("#action_loading").addClass('hidden');
                $("#btncreate").removeClass('hidden');
            });
    });

    $("#btn_create_item").click(function () {

        $("#error-message").html('');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("origin", "http://steezz24.com");

        var item_name = $("#item_name").val();
        var laundry_price = $("#laundry_price").val();
        var iron_price = $("#iron_price").val();
        var icon = $("#icon").val();



        if (item_name == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('item name is required!');
            return false;
        }
        if (laundry_price == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('laundry priceis required!');
            return false;
        }
        if (iron_price == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('iron price is required!');
            return false;
        }

        var raw = JSON.stringify({
            "ItemName": item_name,
            "LaundryPrice": laundry_price,
            "IronPrice": iron_price,
            "Icon": icon
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        $("#action_loading").removeClass('hidden');
        $("#btn_create_item").addClass('hidden');
        fetch("http://services.steezz24.com/servicetypes/create", requestOptions)
            .then(response => response.json())
            .then(result => {

                $("#error-message").addClass('text-success');
                $("#error-message").html(result.message);
                $("#action_loading").addClass('hidden');
                $("#btn_create_item").removeClass('hidden');

            })
            .catch(error => {
                $("#error-message").addClass('text-error');
                $("#error-message").html(error);
                $("#action_loading").addClass('hidden');
                $("#btn_create_item").removeClass('hidden');
            });

    });


    $("#btn_request_reset").click(function () {

        $("#error-message").html('');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("origin", "http://steezz24.com");

        var email = $("#email").val();

        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
        if (email == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Email is required.');
            return false;
        }

        if (!pattern.test(email)) {
            $("#error-message").addClass('text-warning');
            $("#error-message").html(email + ' is not a valid e-mail address');
            return false;
        }



        var raw = JSON.stringify({
            "Email": email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        $("#action_loading").removeClass('hidden');
        $("#btn_request_reset").addClass('hidden');
        fetch("http://services.steezz24.com/accounts/forgot-password", requestOptions)
            .then(response => response.json())
            .then(result => {
                var res = result.message;
                $("#error-message").addClass('text-success');
                $("#error-message").html(res);
                $("#action_loading").addClass('hidden');
                $("#btn_request_reset").removeClass('hidden');
            })
            .catch(error => {
                $("#error-message").addClass('text-error');
                $("#error-message").html(error);
                $("#action_loading").addClass('hidden');
                $("#btn_request_reset").removeClass('hidden');
            });
    });


    $("#btn_reset_password").click(function () {

        $("#error-message").html('');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("origin", "http://steezz24.com");

        var password = $("#password").val();
        var cnfpassword = $("#cnfpassword").val();

        if (password == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Password is required!');
            return false;
        }

        if (cnfpassword == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Password Confirmation is required!');
            return false;
        }

        if (password != cnfpassword) {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('Invalid password confirmation! Please verify your password.');
            return false;
        }

        var Token = location.search.split('=')[1];

        var raw = JSON.stringify({
            "Token": Token,
            "Password": password,
            "ConfirmPassword": cnfpassword
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        $("#action_loading").removeClass('hidden');
        $("#btn_reset_password").addClass('hidden');
        fetch("http://services.steezz24.com/accounts/reset-password", requestOptions)
            .then(response => response.json())
            .then(result => {
                var res = result.message;
                $("#error-message").addClass('text-success');
                $("#error-message").html(res);
                $("#action_loading").addClass('hidden');
                $("#btn_reset_password").removeClass('hidden');
            })
            .catch(error => {
                $("#error-message").addClass('text-error');
                $("#error-message").html(error);
                $("#action_loading").addClass('hidden');
                $("#btn_reset_password").removeClass('hidden');
            });
    });



    if ($("#email_verified").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var Token = location.search.split('token=')[1];

        var raw = JSON.stringify({
            "Token": Token
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/accounts/verify-email", requestOptions)
            .then(response => response.json())
            .then(result => {
                var res = result.message;
                if (res == 'Verification failed') {
                    $("#action_loading").addClass('hidden');
                    $("#not_okay").removeClass('hidden');
                }
                else {
                    $("#action_loading").addClass('hidden');
                    $("#okay").removeClass('hidden');
                }
            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }


    if ($("#customers_without_agent").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/customeragents/customers-without-agent", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                $("#request_count").html(result.length + " New Customer Request(s)");
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
                    htm += "            <a href='/admin/agentassignment/?custid=" + item.id + "' class='reply-btn'>assign Agent</a>"
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

    if ($("#get_agent").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/accounts/agents", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                htm = '';
                result.forEach(item => {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 team-block'>"
                    htm += "    <div class='team-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                    htm += "    <div class='inner-box'>"
                    htm += "        <figure class='image-box'><a href='javascript:assign_agent_to_customer(" + item.id + ");'><img src='"+item.photo+"' alt=''></a></figure>"
                    htm += "        <div class='lower-content'>"
                    htm += "            <h5><a href='#'>" + item.name + " (" + item.phone + ")</a></h5>"
                    htm += "            <span class='designation'>" + item.location + "</span>"
                    htm += "        </div>"
                    htm += "    </div>"
                    htm += "    </div>"
                    htm += "</div>"
                });
                $("#view_agent").html(htm);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#get_current_agent").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/accounts", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                htm = '';
                result.forEach(item => {
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 team-block' id='row_" + item.id + "'>"
                    htm += "    <div class='team-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                    htm += "    <div class='inner-box'>"
                    htm += item.photo == '-' ? "<figure id='fig_" + item.id + "' class='image-box'><img id='preview_" + item.id + "' src='/assets/images/team/team-1.jpg' alt=''></figure>" : "<figure id='fig_" + item.id + "' class='image-box'><img width='469' height='508' src='" + item.photo + "' alt=''></figure>"
                    htm += "            <img class='hidden' id='loader_" + item.id + "' src='/assets/images/gifs/loader_2.gif' alt='' > "
                    htm += "        <div class='lower-content'>"
                    htm += "            <h5><a href='#'>" + item.name + " (" + item.phone + ")</a></h5>"
                    htm += "            <span class='designation'>" + item.location + "</span>"
                    htm += "            <span class='post-date pull-right'><a href='/admin/daily-transactions/?agent=" + item.id + "'>View Transaction</a></span>"
                    htm += "        </div>"
                    htm += "    </div>"
                    htm += "    </div>"
                    htm += "</div>"
                });
                $("#view_current_agent").html(htm);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#get_all_current_client").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var agent_id = location.search.split('=')[1];

        fetch("http://services.steezz24.com/customeragents/customer-dailys/" + agent_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                htm = '';
                if (result.length > 0) {
                    result.forEach(item => {
                        htm += "<div class='col-lg-3 col-md-6 col-sm-12 pricing-block'>"
                        htm += "<div class='pricing-block-one wow fadeInUp animated animated' data-wow-delay='600ms' data-wow-duration='1500ms'>"
                        htm += "<div class='icon-box'><i class='flaticon-washing-machine-1'></i></div>"
                        htm += "<div class='inner-box'>"
                        htm += "    <span>" + item.name + "</span>"
                        htm += "    <h3>" + item.phone + "</h3>"
                        htm += "    <div class='link'><a href='/admin/daily-items/?custid=" + item.id + "'><i class='fas fa-angle-right'></i></a></div>"
                        htm += "    <div class='light-icon'><i class='flaticon-washing-machine-1'></i></div>"
                        htm += "</div>"
                        htm += "</div>"
                        htm += "</div>"
                        $("#agent_name").html(item.agentName);
                    });
                    $("#current_client").html(htm);
                    $("#loading").addClass('hidden');
                } else {
                    $("#msg").removeClass('hidden')
                    $("#loading").addClass('hidden');
                }
            })
            .catch(error => {
                console.log(error);
                $("#loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#get_all_agent").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/accounts", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                htm = '';
                result.forEach(item => {

                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 team-block' id='row_" + item.id + "'>"
                    htm += "    <div class='team-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                    htm += "    <div class='inner-box'>"
                    htm += item.photo == '-' ? "<figure id='fig_" + item.id + "' class='image-box'><img id='preview_" + item.id + "' src='/assets/images/team/team-1.jpg' alt=''></figure>" : "<figure id='fig_" + item.id + "' class='image-box'><img width='469' height='508' src='" + item.photo + "' alt=''></figure>"
                    htm += "            <img class='hidden' id='loader_" + item.id + "' src='/assets/images/gifs/loader_2.gif' alt='' > "
                    htm += "        <div class='lower-content'>"
                    htm += "            <h5><label>" + item.name + " (" + item.phone + ")<input onchange='javascript: uploadFile(" + item.id + ");' id='attach_" + item.id + "' type='file' style='display:none' />"; if (item.photo == '-') { "<i  class='fa fa-upload' style='cursor:pointer'></i>" } +"</label></h5>"
                    htm += "            <span class='designation'>" + item.location + "</span>"
                    htm += "            <span id='remove_" + item.id + "' class='post-date pull-left'><a href='javascript:removeagent(" + item.id + ")'>Remove</a></span>"
                    htm += "            <span class='post-date pull-right'><a href='/admin/agent-customers/?agent=" + item.id + "'>View Customers</a></span>"
                    htm += "        </div>"
                    htm += "    </div>"
                    htm += "    </div>"
                    htm += "</div>"
                });
                $("#view_all_agent").html(htm);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }


    if ($("#get_about_agent").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/accounts", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                htm = '';
                var count = 1;
                result.forEach(item => {
                    if (count <= 4) {
                        htm += "<div class='col-lg-3 col-md-6 col-sm-12 team-block'>"
                        htm += "<div class='team-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                        htm += "<div class='inner-box'>"
                        htm += "<figure class='image-box'><a href='#'><img src='" + item.photo + "' alt=''></a></figure>"
                        htm += "<div class='lower-content'>"
                        htm += "<ul class='social-links clearfix'>"
                        htm += "<li><a href='#'><i class='fab fa-twitter'></i></a></li>"
                        htm += "<li><a href='#'><i class='fab fa-facebook-square'></i></a></li>"
                        htm += "<li><a href='#'><i class='fab fa-instagram'></i></a></li>"
                        htm += "</ul>"
                        htm += "<h5><a href='#'>" + item.name + "</a></h5>"
                        htm += "<span class='designation'>Staff</span>"
                        htm += "</div>"
                        htm += "</div>"
                        htm += "</div>"
                        htm += "</div>"
                        count++;
                    }
                });
                $("#get_about_agent").html(htm);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }


    if ($("#all_agent_customers").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var agent_id = location.search.split('agent=')[1];

        fetch("http://services.steezz24.com/customeragents/" + agent_id, requestOptions)
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
                        htm += "            <a href='/admin/customer-items/?custid=" + item.id + "' class='reply-btn'>View Items <i class='fas fa-check'></i></a>"
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

    if ($("#admin_collections").length != 0) {
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
                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 pricing-block'>"
                    htm += "    <div class='pricing-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                    htm += "        <div class='icon-box'><i class='" + item.icon + "'></i></div>"
                    htm += "        <div class='inner-box'>"
                    htm += "            <span>" + item.itemName + " Services</span>"
                    htm += "            <h3>&#8358;" + formatMoney(parseInt(item.laundryPrice)) + "</h3>"
                    htm += "            <div class='link'><a href='/admin/edit-collection/?id=" + item.id + "'><i class='fas fa-angle-right'></i></a></div>"
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

    if ($("#edit_collections").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var item_id = location.search.split('=')[1];

        fetch("http://services.steezz24.com/servicetypes/" + item_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);

                $("#item_name").val(result.itemName);
                $("#laundry_price").val(result.laundryPrice);
                $("#iron_price").val(result.ironPrice);
                $("#icon").val(result.icon);

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    $("#btn_edit_item").click(function () {
        $("#error-message").html('');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("origin", "http://steezz24.com");

        var laundry_price = $("#laundry_price").val();
        var iron_price = $("#iron_price").val();
        var icon = $("#icon").val();



        if (laundry_price == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('laundry priceis required!');
            return false;
        }
        if (iron_price == '') {
            $("#error-message").addClass('text-warning');
            $("#error-message").html('iron price is required!');
            return false;
        }

        var raw = JSON.stringify({
            "LaundryPrice": laundry_price,
            "IronPrice": iron_price,
            "Icon": icon
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        var item_id = location.search.split('=')[1];

        $("#action_loading").removeClass('hidden');
        $("#btn_edit_item").addClass('hidden');
        fetch("http://services.steezz24.com/servicetypes/" + item_id, requestOptions)
            .then(response => response.json())
            .then(result => {

                location.href = "/admin/collections";
            })
            .catch(error => {
                $("#error-message").addClass('text-error');
                $("#error-message").html(error);
                $("#action_loading").addClass('hidden');
                $("#btn_edit_item").removeClass('hidden');
            });
    })

    if ($("#admin_dash").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/customeragents/customers-without-agent", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                $("#request_count").html(result.length);
            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });


        fetch("http://services.steezz24.com/quickorder", requestOptions)
            .then(response => response.json())
            .then(result => {

                $("#quick_request_count").html(result.length);

            });

        fetch("http://services.steezz24.com/customeragents/get-all-awaiting-customers", requestOptions)
            .then(response => response.json())
            .then(result => {

                $("#awaiting_delivery_count").html(result.length);

            });



    }

    if ($("#admin_awaiting_delivery").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/customeragents/get-all-awaiting-customers/", requestOptions)
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
                        htm += "    <span><a href='/admin/customer-items/?custid=" + item.id + "'>View Item(s)</a></span>"
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

    if ($("#transaction_history").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/items/financialyear", requestOptions)
            .then(response => response.json())
            .then(result => {

                var month = '';
                htm = '';
                var grand_otal = 0;
                var total = 0;
                var jan_total = 0;
                var feb_total = 0;
                var mar_total = 0;
                var apr_total = 0;
                var may_total = 0;
                var jun_total = 0;
                var jul_total = 0;
                var aug_total = 0;
                var sep_total = 0;
                var oct_total = 0;
                var nov_total = 0;
                var dec_total = 0;

                var done = false;

                result.forEach(item => {

                    var sum_total = item.total;
                    var grand_total_p = sum_total.split('.')[0];
                    var split_p = grand_total_p.split(',');
                    var n = "";
                    split_p.forEach(item => {
                        n += item;
                    })
                    grand_total_p = parseFloat(n);

                    total = parseInt(grand_total_p);

                    grand_otal += parseInt(grand_total_p);

                    month = getMonth(item.dateDropped);

                    if (month == 0) {
                        jan_total += total;
                        $("#jan").removeClass('hidden');
                    }
                    if (month == 1) {
                        feb_total += total;
                        $("#feb").removeClass('hidden');
                    }

                    if (month == 2) {
                        mar_total += total;
                        $("#mar").removeClass('hidden');
                    }

                    if (month == 3) {
                        apr_total += total;
                        $("#apr").removeClass('hidden');
                    }

                    if (month == 4) {
                        may_total += total;
                        $("#may").removeClass('hidden');
                    }

                    if (month == 5) {
                        jun_total += total;
                        $("#jun").removeClass('hidden');
                    }

                    if (month == 6) {
                        jul_total += total;
                        $("#jul").removeClass('hidden');
                    }

                    if (month == 7) {
                        aug_total += total;
                        $("#aug").removeClass('hidden');
                    }

                    if (month == 8) {
                        sep_total += total;
                        $("#sep").removeClass('hidden');
                    }

                    if (month == 9) {
                        oct_total += total;
                        $("#oct").removeClass('hidden');
                    }

                    if (month == 10) {
                        nov_total += total;
                        $("#nov").removeClass('hidden');
                    }

                    if (month == 11) {
                        dec_total += total;
                        $("#dec").removeClass('hidden');
                    }
                    done = true;
                });

                if (done)
                    $("#loading").addClass('hidden');
                $("#jan_total").html("&#8358;" + formatMoney(jan_total));
                $("#feb_total").html("&#8358;" + formatMoney(feb_total));
                $("#mar_total").html("&#8358;" + formatMoney(mar_total));
                $("#apr_total").html("&#8358;" + formatMoney(apr_total));
                $("#may_total").html("&#8358;" + formatMoney(may_total));
                $("#jun_total").html("&#8358;" + formatMoney(jun_total));
                $("#jul_total").html("&#8358;" + formatMoney(jul_total));
                $("#aug_total").html("&#8358;" + formatMoney(aug_total));
                $("#sep_total").html("&#8358;" + formatMoney(sep_total));
                $("#oct_total").html("&#8358;" + formatMoney(oct_total));
                $("#nov_total").html("&#8358;" + formatMoney(nov_total));
                $("#dec_total").html("&#8358;" + formatMoney(dec_total));

                $("#grand_total").html("&#8358;" + formatMoney(grand_otal));

            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    if ($("#x_monthly_transaction_history").length != 0) {


        var weekdays = (year, week_number) => {

            firstDay = new Date(2022, 0, 1).getDay();

            var d_actual = new Date(year, 0, 1);
            d_actual.setDate(d_actual.getDate() + (week_number * 7));
            var actuall_month = d_actual.getMonth();

            var year = year;
            var week = week_number;
            var d = new Date("Jan 01, " + year + " 01:00:00");
            var w = d.getTime() - (3600000 * 24 * (firstDay - 1)) + 604800000 * (week - 1)
            var n1 = new Date(w);
            var n2 = new Date(w + 518400000)

            //console.log(n1.toString());
            //console.log(n2.toString());


            var month = n2.getMonth() + 1;
            const _d = new Date(n1);
            var day = _d.getDate();

            const _d2 = new Date(n2);
            var day2 = _d2.getDate();

            //console.log("less a day: " + new Date(month+"/"+(day2-1)+"/"+year));

            //console.log(day +" "+day2+" month:"+month) 

            var last_day_of_week = day2;

            var first_day_of_the_week = getMonday(new Date(month + "/" + last_day_of_week + "/" + year));

            var y = year, m = actuall_month;
            var first_day_of_the_month = new Date(y, m, 1);
            var last_day_of_the_month = new Date(y, m + 1, 0);

            console.log("first_day_of_month: " + first_day_of_the_month);
            console.log("first_day_of_the_week: " + first_day_of_the_week);
            console.log("last_day_of_week: " + last_day_of_week)
            console.log("last_day_of_month: " + last_day_of_the_month);

            if ((new Date(month + "/" + first_day_of_the_week + "/" + year).getMonth()) == actuall_month) {
                var n_d = new Date(month + "/" + first_day_of_the_week + "/" + year);
                console.log(n_d)
            }

            do {
                if (new Date(month + "/" + last_day_of_week + "/" + year).getMonth() > actuall_month) {
                    last_day_of_week -= 1;
                    console.log("less a day: " + new Date(month + "/" + last_day_of_week + "/" + year));

                } else {

                    if ((new Date(month + "/" + first_day_of_the_week + "/" + year).getMonth()) + 1 == actuall_month) {

                        console.log("plus a day: " + new Date(month + "/" + first_day_of_the_week + "/" + year));
                        first_day_of_the_week += 1;

                    }
                }
            } while (first_day_of_the_week <= last_day_of_week);


        }
        weekdays(2022, 28);



    }



    if ($("#monthly_transaction_history").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var month_number = location.search.split('=')[1];

        fetch("http://services.steezz24.com/items/financialmonth/" + month_number, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                var htm = "";
                var g_total = 0;
                result.forEach(item => {
                    if (item.customerName != "") {
                        htm += "<div class='col-lg-3 col-md-6 col-sm-12 pricing-block'>"
                        htm += "<div class='pricing-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                        htm += "  <div class='icon-box'><i class='flaticon-save-money'></i></div>"
                        htm += "    <div class='inner-box'>"
                        htm += "        <span>" + item.customerName + "</span>"
                        htm += "        <h3>&#8358;" + formatMoney(parseInt(item.total)) + "</h3>"
                        htm += "        <div class='link'><a href='/admin/usertransactions?id=" + month_number + "&agent=" + item.customerName + "'><i class='fas fa-angle-right'></i></a></div>"
                        htm += "        <div class='light-icon'><i class='flaticon-save-money'></i></div>"
                        htm += "    </div>"
                        htm += "</div>"
                        htm += "</div > "
                        g_total += parseInt(item.total);
                    }
                });
                $("#week_1").html(htm);
                $("#grand_total").html("&#8358;" + formatMoney(g_total));
                $("#week_1").removeClass('hidden');
                $("#loading").addClass('hidden');
            })
            .catch(error => {
                console.log(error);
                $("#loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#monthly_user_monthly_transaction_history").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");



        var month_number = "";
        var agent_name = "";
        const params = new URLSearchParams(window.location.search);
        if (params.has('id')) {
            month_number = params.get('id');
        }
        if (params.has('agent')) {
            agent_name = params.get('agent');
        }

        var raw = JSON.stringify({
            "Month": month_number,
            "AgentName": agent_name
        });

        var requestOptions = {
            method: 'POST',
            body: raw,
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch("http://services.steezz24.com/items/usersforfinancialmonth", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                var htm = "";
                var htm_false = "";
                var agent = "";
                result.forEach(item => {
                    if (item.agentName == agent_name) {
                        var sum_total = item.total;
                        var grand_total_p = sum_total.split('.')[0];
                        var split_p = grand_total_p.split(',');
                        var n = "";
                        split_p.forEach(item => {
                            n += item;
                        })
                        grand_total_p = parseFloat(n);

                        var total = parseInt(grand_total_p);
                        if (item.isPaid == true) {
                            htm += "<br/><br /><div class='col-lg-3 col-md-6 col-sm-12 pricing-block'>"
                            htm += "<div class='pricing-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                            htm += "  <div class='icon-box'><i class='flaticon-save-money'></i></div>"
                            htm += "    <div class='inner-box'>"
                            htm += "        <span>" + item.customer + "</span>"
                            htm += "        <h3>&#8358;" + formatMoney(parseInt(total)) + "</h3>"
                            htm += "        <div class='link'><a href='/admin/itemdetails?month=" + item.transactionDate + "&userid=" + item.customerId + "'><i class='fas fa-angle-right'></i></a></div>"
                            htm += "        <div class='light-icon'><i class='flaticon-save-money'></i></div>"
                            htm += "    </div>"
                            htm += "</div>"
                            htm += "</div><br/><br /> "
                            agent = item.agentName;
                        } else {
                            htm_false += "<br/><br /><div class='col-lg-3 col-md-6 col-sm-12 pricing-block'>"
                            htm_false += "<div class='pricing-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                            htm_false += "  <div class='icon-box'><i class='flaticon-save-money'></i></div>"
                            htm_false += "    <div class='inner-box'>"
                            htm_false += "        <span>" + item.customer + "</span>"
                            htm_false += "        <h3>&#8358;" + formatMoney(parseInt(total)) + "</h3>"
                            htm_false += "        <div class='link'><a href='/admin/customeritemdetails?month=" + item.transactionDate + "&userid=" + item.customerId + "'><i class='fas fa-angle-right'></i></a></div>"
                            htm_false += "        <div class='light-icon'><i class='flaticon-save-money'></i></div>"
                            htm_false += "    </div>"
                            htm_false += "</div>"
                            htm_false += "</div><br/><br /> "
                            agent = item.agentName;
                        }
                    }
                });
                $("#week_1").html(htm);
                $("#week_htm_false").html(htm_false);
                $("#grand_total").html(agent);
                $("#week_1").removeClass('hidden');
                $("#loading").addClass('hidden');
            })
            .catch(error => {
                console.log(error);
                $("#loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#display_customer_cart_details").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var customer_id = "";
        var month_number = "";

        const params = new URLSearchParams(window.location.search);
        if (params.has('month')) {
            month_number = params.get('month');
        }
        if (params.has('userid')) {
            customer_id = params.get('userid');
        }

        var raw = JSON.stringify({
            "CustomerId": customer_id,
            "Month": month_number
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/items/usersforfinancialmonthitems", requestOptions)
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
                    fetch("http://services.steezz24.com/customeragents/get-grand-prices/" + customer_id, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            result.forEach(item => {
                                $("#paid-button").removeClass('hidden');
                                $("#grand_total_paid").html(item.grandTotal);
                                $("#print_total").html(item.grandTotal);
                            })
                        })

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


        fetch("http://services.steezz24.com/customeragents/get-grand-prices/" + customer_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                result.forEach(item => {
                    $("#grand_total_due").html(item.grandTotal);
                    $("#express_charge").html(item.express);
                    $("#percent_off").html(item.discount);
                })
            })

        fetch("http://services.steezz24.com/items/getagent/" + customer_id, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                $("#customer_name").html(result)
            })
    }

    if ($("#monthly_transaction_history_xs").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var month_number = location.search.split('=')[1];

        fetch("http://services.steezz24.com/items/financialmonth/" + month_number, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                var month = '';
                htm = '';
                var grand_otal = 0;
                var total = 0;
                var week_1_total = 0;
                var week_2_total = 0;
                var week_3_total = 0;
                var week_4_total = 0;
                var week_5_total = 0;
                var week_6_total = 0;

                var done = false;
                result.forEach(item => {

                    $("#history_month").html(display_Month(item.dateDropped));

                    var sum_total = item.total;
                    var grand_total_p = sum_total.split('.')[0];
                    var split_p = grand_total_p.split(',');
                    var n = "";
                    split_p.forEach(item => {
                        n += item;
                    })
                    grand_total_p = parseFloat(n);

                    total = parseInt(grand_total_p);

                    grand_otal += parseInt(grand_total_p);



                    const weekNumOfDate = getWeekNumOfMonthOfDate(new Date(item.dateDropped))


                    if (weekNumOfDate == 1) {
                        week_1_total += total;
                        $("#week_1").removeClass('hidden');
                    }

                    if (weekNumOfDate == 2) {
                        week_2_total += total;
                        $("#week_2").removeClass('hidden');
                    }

                    if (weekNumOfDate == 3) {
                        week_3_total += total;
                        $("#week_3").removeClass('hidden');
                    }

                    if (weekNumOfDate == 4) {
                        week_4_total += total;
                        $("#week_4").removeClass('hidden');
                    }

                    if (weekNumOfDate == 5) {
                        week_5_total += total;
                        $("#week_5").removeClass('hidden');
                    }

                    if (weekNumOfDate == 6) {
                        week_6_total += total;
                        $("#week_6").removeClass('hidden');
                    }
                    done = true;
                });

                if (done)
                    $("#loading").addClass('hidden');
                $("#week_1_total").html("&#8358;" + formatMoney(week_1_total));
                $("#week_2_total").html("&#8358;" + formatMoney(week_2_total));
                $("#week_3_total").html("&#8358;" + formatMoney(week_3_total));
                $("#week_4_total").html("&#8358;" + formatMoney(week_4_total));
                $("#week_5_total").html("&#8358;" + formatMoney(week_5_total));
                $("#week_6_total").html("&#8358;" + formatMoney(week_6_total));

                $("#grand_total").html("&#8358;" + formatMoney(grand_otal));
            })
            .catch(error => {
                console.log(error);
                $("#action_loading").addClass('hidden');
                $("#not_okay").removeClass('hidden');
            });
    }

    if ($("#agent_commission_settings").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var htm = "";
        $("#loading").removeClass('hidden');
        fetch("http://services.steezz24.com/agentcommission/", requestOptions)
            .then(response => response.json())
            .then(result => {

                result.forEach(item => {
                    htm += "<div class='col-lg-4 col-md-6 col-sm-12 news-block'>"
                    htm += "        <div class='news-block-one wow fadeInUp animated animated animated' data-wow-delay='00ms' data-wow-duration='1500ms' style='visibility: visible; animation-duration: 1500ms; animation-delay: 0ms; animation-name: fadeInUp;'>"
                    htm += "            <div class='inner-box'>"
                    htm += "                <figure class='image-box'><a href='#'><img src='" + item.pixture + "' height='100' alt=''></a></figure>"
                    htm += "                <div class='lower-content'>"
                    htm += "                    <span class='post-date'>" + item.name + "</span>"
                    htm += "                     <h3><a href='#'>Amount Generated: &#8358;" + formatMoney(parseInt(item.totalGenerated)) + "</a></h3>"
                    htm += "                    <h3><a href='#'>Total Commission: &#8358;" + formatMoney(parseInt(item.totalCommission)) + "</a></h3>"
                    htm += "                    <h3><a href='#'>Percentage Allocated: " + item.percentage + "%</a></h3>"

                    htm += "                    <ul class='post-info'>"
                    htm += "                        <li><i class='far fa-user'></i><a href='javascript:setAgentCommissionVisible(" + item.id + ");'>Set Agent Commission</a></li>"
                    htm += "                        <li class='hidden' style='display:none' id='li-" + item.id + "'>"
                    htm += "                            <div class='mt-2'>"
                    htm += "                                <input type='text' id='txtComm_" + item.id + "' maxlength='2' onkeyup='if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g, '')' class='form-control' /><br />"
                    htm += "                                <img id='img_" + item.id + "' src='/assets/images/gifs/loader_1.gif' class='hidden' />"
                    htm += "                                <div id='error-message-" + item.id + "'></div>"
                    htm += "                                <a id='btnSet_" + item.id + "' class='btn btn-danger text-white' href='javascript:setAgentCommission(" + item.id + ")'>Set Commission</a>"
                    htm += "                            </div>"
                    htm += "                        </li>"
                    if (item.isRequest) {
                        htm += "                        <li id='bank_li_" + item.id + "'><i class='far fa-user'></i><a href='javascript:viewbankdetails(" + item.id + ");'>Agent has requested for payment</a></li>"
                    }
                    htm += "                        <li class='hidden' style='display:none' id='bank_" + item.id + "'>"
                    htm += "                            <div class='mt-2'>"
                    htm += "                                <b>Bank: " + item.bank + "</b><br />"
                    htm += "                                <b>Account Number: " + item.accountNumber + "</b><br />"
                    htm += "                                <b>Account Name: " + item.accountName + "</b><br /><br />"
                    htm += "                                <img id='img_r_" + item.id + "' src='/assets/images/gifs/loader_1.gif' class='hidden' />"
                    htm += "                                <div id='error-message-r-" + item.id + "'></div>"
                    htm += "                                <a id='btnReset_" + item.id + "' class='btn btn-danger text-white' href='javascript:reSetAgentCommission(" + item.id + ")'>Commission Paid</a>"
                    htm += "                            </div>"
                    htm += "                        </li>"
                    htm += "                    </ul>"
                    htm += "                </div>"
                    htm += "            </div>"
                    htm += "        </div>"
                    htm += "    </div>"

                });
                $("#commission_div").html(htm);
                $("#loading").addClass('hidden');
            })
            .catch(error => {

                $("#loading").addClass('hidden');
            });


    }

})


var viewComm = false;
var setAgentCommissionVisible = (id) => {
    var li = "#li-" + id;
    if (viewComm == false) {
        $(li).show('slow')
        viewComm = true;
    } else {
        $(li).hide('slow')
        viewComm = false;
    }
}

var setAgentCommission = (id) => {
    var li = "#li-" + id;
    var img = "#img_" + id;
    var btnSet = "#btnSet_" + id;
    var txtComm = "#txtComm_" + id;
    var errorMessage = "#error-message-" + id;

    var raw = JSON.stringify({
        "Id": id,
        "Percentage": $(txtComm).val(),
        "IsRequest": false,
        "IsPaid": false
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("origin", "http://steezz24.com");

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $(btnSet).addClass('hidden');
    $(img).removeClass('hidden');
    fetch("http://services.steezz24.com/agentcommission/place-commission/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message != "Commission updated successfully") {
                $(errorMessage).addClass('text-error');
                $(errorMessage).html(result.message);
                $(btnSet).removeClass('hidden');
                $(img).addClass('hidden');
            } else {

                setTimeout(() => {
                    $(btnSet).removeClass('hidden');
                    viewComm = false;
                    $(li).hide('slow')
                    $(errorMessage).html("");
                }, 3000);

                $(errorMessage).addClass('text-success');
                $(img).addClass('hidden');
                $(errorMessage).html("Commission updated successfully");

            }
        })
        .catch(error => {
            $(errorMessage).addClass('text-error');
            $(errorMessage).html(error);
            $(btnSet).removeClass('hidden');
            $(img).addClass('hidden');
        });
}

var reSetAgentCommission = (id) => {
    var bank_li = "#bank_li_" + id;
    var bank = "#bank_" + id;
    var img = "#img_r_" + id;
    var btnSet = "#btnReset_" + id;
    var errorMessage = "#error-message-r-" + id;

    var raw = JSON.stringify({
        "Id": id,
        "TotalGenerated": "0",
        "TotalCommission": "0",
        "IsRequest": false,
        "IsPaid": false
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("origin", "http://steezz24.com");

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $(btnSet).addClass('hidden');
    $(img).removeClass('hidden');
    fetch("http://services.steezz24.com/agentcommission/place-commission/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message != "Commission updated successfully") {
                $(errorMessage).addClass('text-error');
                $(errorMessage).html(result.message);
                $(btnSet).removeClass('hidden');
                $(img).addClass('hidden');
            } else {

                setTimeout(() => {
                    $(btnSet).removeClass('hidden');
                    viewComm = false;
                    $(bank).hide('slow')
                    $(bank_li).hide('slow')
                    $(errorMessage).html("");
                }, 3000);

                $(errorMessage).addClass('text-success');
                $(img).addClass('hidden');
                $(errorMessage).html("Commission updated successfully");

            }
        })
        .catch(error => {
            $(errorMessage).addClass('text-error');
            $(errorMessage).html(error);
            $(btnSet).removeClass('hidden');
            $(img).addClass('hidden');
        });
}

var viewBank = false;
var viewbankdetails = (id) => {
    var li = "#bank_" + id;
    if (viewBank == false) {
        $(li).show('slow')
        viewBank = true;
    } else {
        $(li).hide('slow')
        viewBank = false;
    }
}


var getMonth = (date) => {
    //const d = new Date();

    let msec = Date.parse(date);
    const d = new Date(msec).getMonth();
    return d;

    //var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //var monthly = d.getUTCMonth();
    //let month = months[monthly];

    //var month_disp = "";
    //do {
    //    let month = months[monthly];
    //    month_disp += month + " ";
    //    monthly -= 1;
    //} while (monthly >= 0);

    //return month;
}

var display_Month = (date) => {
    const d = new Date(date);

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthly = d.getUTCMonth();
    let month = months[monthly];
    return month;
}

Date.prototype.getWeekOfMonth = function () {
    var firstDay = new Date(this.setDate(1)).getDay();
    var totalDays = new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
    return Math.ceil((firstDay + totalDays) / 7);
}

//var totalWeeks = new Date("July 17, 2022").getWeekOfMonth();
//console.log('Total Weeks in the Month are :' + totalWeeks);

///////

const getWeekNumOfMonthOfDate = (d) => {
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    return Math.ceil((d.getDate() + (firstDay - 1)) / 7);
}





var getDate = () => {

    const d = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekday[d.getUTCDay()];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[d.getUTCMonth()];

    let dayNumber = d.getUTCDate();

    let year = d.getUTCFullYear();

    return day + ", " + month + " " + dayNumber + ", " + year;

}

var assign_agent_to_customer = (id) => {


    $("#error-message").html('');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("origin", "http://steezz24.com");

    var agent_id = id;
    var custpmer_id = location.search.split('=')[1];


    var raw = JSON.stringify({
        "AgentId": agent_id
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#action_loading").removeClass('hidden');
    $("#btn_login").addClass('hidden');
    fetch("http://services.steezz24.com/customeragents/assign-agent/" + custpmer_id, requestOptions)
        .then(response => response.json())
        .then(result => {

            location.href = "/admin";
        })
        .catch(error => {
            $("#error-message").addClass('text-error');
            $("#error-message").html(error);
            $("#action_loading").addClass('hidden');
            $("#btn_login").removeClass('hidden');
        });
}

var removeagent = (id) => {
    var loader = "#loader_" + id;
    var fig = "#fig_" + id;
    var remove = "#remove_" + id;
    var row = "#row_" + id;

    $(loader).removeClass('hidden');
    $(fig).addClass('hidden');
    $(remove).addClass('hidden');

    $("#error-message").html('');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("origin", "http://steezz24.com");


    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    $("#action_loading").removeClass('hidden');
    $("#btn_login").addClass('hidden');
    fetch("http://services.steezz24.com/accounts/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.message == "Account deleted successfully") {
                $(row).hide('slow');
            } else {
                $(loader).addClass('hidden');
                $(fig).removeClass('hidden');
                $(remove).removeClass('hidden');
            }
        })
        .catch(error => {
            $("#error-message").addClass('text-error');
            $("#error-message").html(error);
            $(loader).addClass('hidden');
            $(fig).removeClass('hidden');
            $(remove).removeClass('hidden');
        });


}

var uploadFile = (id) => {
    var attach = "#attach_" + id;
    var loader = "#loader_" + id;
    var preview = "preview_" + id;


    $(loader).removeClass('hidden');

    let imageFile = $(attach)[0].files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.createElement("img");
        img.onload = async function (event) {
            // Dynamically create a canvas element
            var canvas = document.createElement("canvas");

            // var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");

            // Actual resizing
            var MAX_WIDTH = 469;
            var MAX_HEIGHT = 508;

            var width = img.width;
            var height = img.height;

            // Change the resizing logic
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width = width * (MAX_HEIGHT / height);
                    height = MAX_HEIGHT;
                }
            }

            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            ctx.webkitImageSmoothingEnabled = true;
            ctx.msImageSmoothingEnabled = true;
            ctx.imageSmoothingEnabled = true;
            // Show resized image in preview element
            var dataurl = canvas.toDataURL(imageFile.type);
            document.getElementById(preview).src = dataurl;

            //let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

            //let formData = new FormData();
            //formData.append("image", imageBlob, "image.png");
            var raw = JSON.stringify({
                "Photo": dataurl
            });


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            await fetch("http://services.steezz24.com/uploadpix/" + id, requestOptions)
                .then(response => response.json())
                .then(data => {

                    $(loader).addClass('hidden');

                })
                .catch(error => $(loader).addClass('hidden'));

        }
        img.src = e.target.result;


    }
    reader.readAsDataURL(imageFile);


}

if ($("#quick_request_countX").length != 0) {
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
            $("#quick_request_count").html(result.length);

        });
}

//let imgInput = document.getElementById('image-input');
//imgInput.addEventListener('change', function (e) {
//    if (e.target.files) {
//        let imageFile = e.target.files[0];
//        var reader = new FileReader();
//        reader.onload = function (e) {
//            var img = document.createElement("img");
//            img.onload = function (event) {
//                // Dynamically create a canvas element
//                var canvas = document.createElement("canvas");

//                // var canvas = document.getElementById("canvas");
//                var ctx = canvas.getContext("2d");

//                // Actual resizing
//                var MAX_WIDTH = 469;
//                var MAX_HEIGHT = 508;

//                var width = img.width;
//                var height = img.height;

//                // Change the resizing logic
//                if (width > height) {
//                    if (width > MAX_WIDTH) {
//                        height = height * (MAX_WIDTH / width);
//                        width = MAX_WIDTH;
//                    }
//                } else {
//                    if (height > MAX_HEIGHT) {
//                        width = width * (MAX_HEIGHT / height);
//                        height = MAX_HEIGHT;
//                    }
//                }

//                var canvas = document.createElement("canvas");
//                canvas.width = width;
//                canvas.height = height;
//                var ctx = canvas.getContext("2d");
//                ctx.drawImage(img, 0, 0, width, height); 

//                ctx.mozImageSmoothingEnabled = true;
//                ctx.webkitImageSmoothingEnabled = true;
//                ctx.msImageSmoothingEnabled = true;
//                ctx.imageSmoothingEnabled = true;
//                // Show resized image in preview element
//                var dataurl = canvas.toDataURL(imageFile.type);
//                document.getElementById("preview").src = dataurl;
//            }
//            img.src = e.target.result;
//        }
//        reader.readAsDataURL(imageFile);
//    }
//});

var formatMoney = (number, decPlaces, decSep, thouSep) => {
    return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}



if ($("#daily_customers_history").length > 0) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    
    var param = window.location.search;
    const urlParams = new URLSearchParams(param);

    if (!(urlParams.has('day') && urlParams.has('id'))) {
        location.href = "/admin/dailysales"
    }
    var month_number = urlParams.get('day');
    var agent_id = urlParams.get('id');

    var raw = JSON.stringify({
        "Day": month_number,
        "AgentId":agent_id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#display_sales").removeClass("hidden");
    $("#top_sales").addClass("hidden");
    $("#loading").removeClass('hidden');
    $("#btn_Status").addClass("hidden");
    $("#week_1").addClass('hidden');
    fetch("http://services.steezz24.com/items/daily_customer_data/", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            var htm = "";
            var name = "";
            var g_total = 0;
            var i_total = 0;
            var addData = false;
            result.forEach(item => { 
                
                if (name == "") {
                    name = item.customerName;
                    i_total += parseInt(item.total);
                } else {
                    if (name == item.customerName) {
                        i_total += parseInt(item.total);
                    }
                    else {
                        addData = true;
                    }
                }
                if (addData == true) {

                    htm += "<div class='col-lg-3 col-md-6 col-sm-12 pricing-block'>"
                    htm += "<div class='pricing-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
                    htm += "  <div class='icon-box'><i class='flaticon-save-money'></i></div>"
                    htm += "    <div class='inner-box'>"
                    htm += "        <span>" + name + "</span>"
                    htm += "        <h3>&#8358;" + formatMoney(parseInt(i_total)) + "</h3>"

                    htm += "        <div class='light-icon'><i class='flaticon-save-money'></i></div>"
                    htm += "    </div>"
                    htm += "</div>"
                    htm += "</div > "
                     
                    addData = false;
                    g_total += parseInt(i_total); 
                    name = item.customerName;
                    i_total = parseInt(item.total); 
                }
            });
            g_total += parseInt(i_total);
            htm += "<div class='col-lg-3 col-md-6 col-sm-12 pricing-block'>"
            htm += "<div class='pricing-block-one wow fadeInUp animated animated' data-wow-delay='00ms' data-wow-duration='1500ms'>"
            htm += "  <div class='icon-box'><i class='flaticon-save-money'></i></div>"
            htm += "    <div class='inner-box'>"
            htm += "        <span>" + name + "</span>"
            htm += "        <h3>&#8358;" + formatMoney(parseInt(i_total)) + "</h3>"

            htm += "        <div class='light-icon'><i class='flaticon-save-money'></i></div>"
            htm += "    </div>"
            htm += "</div>"
            htm += "</div > "
            
            $("#top_sales").removeClass("hidden");
            $("#week_1").html(htm);
            $("#btn_Status").removeClass("hidden");
            $("#grand_total").html("&#8358;" + formatMoney(g_total));
            $("#week_1").removeClass('hidden');
            $("#loading").addClass('hidden');
        })
        .catch(error => {
            console.log(error);
            $("#loading").addClass('hidden');
            $("#btn_Status").removeClass("hidden");
            $("#not_okay").removeClass('hidden');
        });
}