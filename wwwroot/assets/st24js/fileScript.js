 
    const input = document.getElementById('fileinput');
    var uri = 'http://medicall-002-site5.ctempurl.com/api/Upload';
    const id = localStorage.getItem("userid");

    // Event handler executed when a file is selected
    const onSelectFile = () => upload();

    // Add a listener on your input
    // It will be triggered when a file will be selected
    input.addEventListener('change', onSelectFile, false);
    // This will upload the file after having read it
    const upload = () => {
        $('#snackbar-9').toast('show');
        $("#up").addClass('hidden'); 
        $("#procdiv").removeClass('hidden');
        $("#fileinput").addClass('hidden');
        
        var pix = $("#fileinput")[0].files[0];

        var formdata = new FormData();
        formdata.append("", pix);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        fetch(uri + "/uploadfiles/" + id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok '+response);
                    $('#snackbar-9').toast('hide');
                    $("#menu-warning-1").showMenu();
                    $("#up").removeClass('hidden'); 
                    $("#procdiv").addClass('hidden');
                    $("#fileinput").removeClass('hidden');
                }
                else {
                    console.log('Network response was ok: goto wait for call interface');
                    if (localStorage.getItem("designation") == 'health' || localStorage.getItem("type") == "health") {
                        $("#quiz-1").showMenu();
                    }
                    else {
                        if (localStorage.getItem("designation") == "tutor" || localStorage.getItem("type") == "tutor") {
                            location.href = "/tutors/settings";
                        }
                        else {

                        }
                    }

                }
                return response.json();
            })
            .then(data => {
            /* process your data further */
                if (localStorage.getItem("designation") == 'health' || localStorage.getItem("type") == "health") {
                    $("#quiz-1").showMenu();
                }
                else {
                    if (localStorage.getItem("designation") == "tutor" || localStorage.getItem("type") == "tutor") {
                        location.href = "/tutors/settings";
                    }
                    else {

                    }
                }
                
            }) 
            //.then(result => uploadOk(result))
            .catch(error => showError());
    };

function showError() {
    $("#up").removeClass('hidden'); 
    $("#procdiv").addClass('hidden');
    $("#fileinput").removeClass('hidden');
    $("#menu-warning-file-upload").showMenu()
}