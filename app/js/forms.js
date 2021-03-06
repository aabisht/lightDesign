(function ($) {

    // Focus input 
    LD.inputFocus = function() {
        $('.form-control').each(function(index, element){
            var _this = $(this);

            if(
                element.value.length > 0 ||
                $(element).is(':focus') ||
                element.autofocus ||
                (_this.attr('placeholder') && _this.attr('placeholder') !== null)
            ) {
                _this.siblings('label').addClass('active');
            } else if (element.validity) {
                _this.siblings('label').toggleClass('active', element.validity.badInput === true);
            } else {
                _this.siblings('label').removeClass('active');
            }

        });
    };


    // Custom File Input
    LD.fileInput = function() {
        $(document).on('focus', '.form-file-control', function() {
            $(this).siblings('.form-control[type="file"]').click();
        });
        $(document).on('input', '.form-control[type="file"]', function() {
            var files = $(this)[0].files;
            var file_names = [];
            for (var i=0; i < files.length; i++) {
                file_names.push(files[i].name)
            }
            $(this).siblings('.form-control')[0].value = file_names.join(', ');
        });
    };
    
    LD.textareaAutoResize = function($textareaSelector) {
        var content = $textareaSelector.val();
        content = content.replace(/\n/g, '<br>');
        $textareaSelector.siblings('.hidden-textarea-wrapper').html(content + '<br>');
        $textareaSelector.css('height', $textareaSelector.siblings('.hidden-textarea-wrapper').height());
    };

})(jQuery);

$(document).ready(function() {
    LD.inputFocus();
    $(document).on('input', '.form-control', function(){
        if ((this.value.length !== 0) || ($(this).attr('placeholder') && $(this).attr('placeholder') !== null)) {
            $(this).siblings('label').addClass('active')
        } else {
            $(this).siblings('label').removeClass('active')
        }
    });

    LD.fileInput();

    var $textareaSelector = 'textarea.form-control';
    $($textareaSelector).each(function() {
        $(this).before('<div class="hidden-textarea-wrapper"></div>');
        if($(this).val().length <= 0) {
            $(this).siblings('.hidden-textarea-wrapper').css('min-height', $(this).height());
        }
    });
    $(document).on('input', $textareaSelector, function(){
        LD.textareaAutoResize($(this));
    });

});