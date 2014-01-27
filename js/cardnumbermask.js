(function ($) {
    'use strict';
    function getMaskedStr(str, last) {
        var output;
        if (str.length > last) {
            output = new Array(str.length - last + 1).join('x') + str.slice(-last);
        } else {
            output = str;
        }
        return output;
    }
    
    $.fn.maskCardNumber = function (hidden, lastIntact) {
        var num, num_tmp, num_arr, num_str;
        this.keydown(function (e) {
            var charCode = e.which || event.keyCode;
            if (charCode >= 48 && charCode <= 57) {
                jQuery(this).val(getMaskedStr(jQuery(this).val(), lastIntact - 1));
                jQuery(hidden).val(jQuery(hidden).val() + (charCode - 48));
            } else if (charCode === 8) {
                num_tmp = jQuery(hidden).val();
                num_arr = num_tmp.split("");
                delete num_arr[num_tmp.length - 1];
                num_str = num_arr.join("");
                jQuery(this).val(getMaskedStr(num_str, lastIntact));
                jQuery(hidden).val(num_str);
                e.preventDefault();
            } else {
                e.preventDefault();
                console.log(charCode);
            }
        });
        
        return this;
    };
}(jQuery));