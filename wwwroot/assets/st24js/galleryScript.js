$(document).ready(function () {

    $("#btn_create_gallery").click(function () {
        $("#btn_create_gallery").addClass('hidden')
        $("#action_loading").removeClass('hidden')
        let imageFile = $("#attach_gal")[0].files[0];
        var readerGal = new FileReader();
        readerGal.onload = function (e) {
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
                //document.getElementById(preview).src = dataurl;

                //let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

                //let formData = new FormData();
                //formData.append("image", imageBlob, "image.png");

                var raw = JSON.stringify({
                    "Photo": dataurl
                });


                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                await fetch("http://services.steezz24.com/gallery/addgallery", requestOptions)
                    .then(response => response.json())
                    .then(data => {

                        getGallery();

                    })
                    .catch(error => {
                        $("#btn_create_gallery").removeClass('hidden')
                        $("#action_loading").addClass('hidden')
                    });

            }
            img.src = e.target.result;


        }
        readerGal.readAsDataURL(imageFile);

    });


});


var getAdminGallery = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://services.steezz24.com/gallery", requestOptions)
        .then(response => response.json())
        .then(result => {
            htm = '';
            if (result.length > 0) {
                result.forEach(item => {
                    htm += "<div class='col-lg-4 col-md-6 col-sm-12 gallery-block' id='rew_" + item.id + "'>"
                    htm += "<div class='gallery-block-one'>"
                    htm += "<div class='inner-box'>"
                    htm += "<figure class='image-box'><img src='" + item.photo + "' width='469' height='508' alt=''></figure>"
                    htm += "<div class='view-btn'><a href='" + item.photo + "' class='lightbox-image' data-fancybox='gallery'></a></div>"
                    htm += "</div>"
                    htm += "        <div class='lower-content'>"
                    htm += "            <span id='remove_" + item.id + "' class='post-date pull-left'><a href='javascript:removeGallery(" + item.id + ")'>Remove</a></span>"

                    htm += "        </div>"
                    htm += "</div>"
                    htm += "</div> "
                });
                $("#gal_section").html(htm);
                $("#btn_create_gallery").removeClass('hidden')
                $("#action_loading").addClass('hidden')
            }
        })
        .catch(error => {
            console.log(error);
            $("#btn_create_gallery").removeClass('hidden')
            $("#action_loading").addClass('hidden')
        });

}


var getGallery = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://services.steezz24.com/gallery", requestOptions)
        .then(response => response.json())
        .then(result => {
            htm = '';
            if (result.length > 0) {
                result.forEach(item => {
                    htm += "<div class='col-lg-4 col-md-6 col-sm-12 gallery-block' id='rew_" + item.id + "'>"
                    htm += "<div class='gallery-block-one'>"
                    htm += "<div class='inner-box'>"
                    htm += "<figure class='image-box'><img src='" + item.photo + "' width='469' height='508' alt=''></figure>"
                    htm += "<div class='view-btn'><a href='" + item.photo + "' class='lightbox-image' data-fancybox='gallery'></a></div>"                    
                    htm += "</div>"
                    htm += "</div> "
                    htm += "</div> "
                });
                $("#gal_section").html(htm); 
            }
        })
        .catch(error => {
            console.log(error); 
        });

}


var removeGallery = (id) => {
    var row = "#row_" + id;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("origin", "http://steezz24.com");


    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("http://services.steezz24.com/gallery/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.message == "gallery item deleted successfully") {
                $(row).hide('slow');
            }
        })
        .catch(error => {

        });

}
