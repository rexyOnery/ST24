$(document).ready(function () {

    if ($("#get_all_agent").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://services.steezz24.com/accounts/my_mini_agents", requestOptions)
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

});