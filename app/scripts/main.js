/*eslint-disable */
/*global $*/
'use strict';
// Closes the Responsive Menu on Menu Item Click
$('.overlay-menu ul li a').click(function() {
    $('.button_container:visible').click();
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Navigation show/hide
$('.toggle').click(function() {
    if ($('#overlay.open')) {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    }
});

// jQuery Parallax. More info here-> https://github.com/IanLunn/jQuery-Parallax
$(function(){
    // apply parallax effect only when body has the ".parallax-page" class
    if ($('body').hasClass('parallax-page')) {
        //.parallax(xPosition, speedFactor, outerHeight) options:
        //xPosition - Horizontal position of the element
        //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
        //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
        $('#parallax-slide').parallax('50%', 0.1);
        $('#products').parallax('50%', 0.1);
        $('#portfolio').parallax('50%', 0.1);
        $('#page-aboutus').parallax('50%', 0.1);
    }
});
// Contact form
$(function() {
    // validate contact form on keyup and submit
    $("#contactForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                lettersonly: true
            },
            email: {
                required: true,
                minlength: 6,
                email: true
            },
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 15
            },
            message: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Minimum 2 characters",
                lettersonly: "Only letters please!"
            },
            email: {
                required: "Please enter your email address",
                minlength: "Minimum 6 characters",
                email: "That's an invalid email"
            },
            phone: {
                required: "Please enter your phone number",
                digits: "Only digits (no spaces)",
                minlength: "Minimum 10 characters",
                maxlength: "Maximum 15 characters"
            },
            message: {
                required: "Please enter your message",
                minlength: "Minimum 6 characters"
            }
        },
        success: function(label) {
            label.addClass("valid").text("Perfect!");
        },
        submitHandler: function(element) {

            var ajaxform = $(element),
                url = ajaxform.attr('action'),
                type = ajaxform.attr('method'),
                data = {};

            $(ajaxform).find('[name="submit"]').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Sending...');


            ajaxform.find('[name]').each(function(index, value) {
                var field = $(this),
                    name = field.attr('name'),
                    value = field.val();

                data[name] = value;

            });

            $.ajax({
                url: url,
                type: type,
                data: data,
                success: function(response) {
                    if (response.type == 'success') {
                        $("#contactForm").before("<div class='alert alert-success' role='alert'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + response.text + "</div>");
                        $(ajaxform).each(function() {
                            this.reset();
                            $(this).find('[name="submit"]').html('<i class="fa fa-paper-plane fa-fw"></i> Send');
                        }).find('.valid').each(function() {
                            $(this).remove('label.valid');
                        })
                    } else if (response.type == 'error') {
                        $("#contactForm").before("<div class='alert alert-danger' role='alert'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + response.text + "</div>");
                        $(ajaxform).find('[name="submit"]').html('<i class="fa fa-paper-plane fa-fw"></i> Send');
                    }
                }
            });

            return false;
        }
    });

});
