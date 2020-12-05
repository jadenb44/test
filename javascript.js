(function s(){
     // format val to n number of decimal places
    // modified version of Danny Goodman's (JS Bible)
    function formatDecimal(val, n) {
        n = n || 2;
        var str = "" + Math.round ( parseFloat(val) * Math.pow(10, n) );
        while (str.length <= n) {
            str = "0" + str;
        }
        var pt = str.length - n;
        return str.slice(0,pt) + "." + str.slice(pt);
    }
    
    function getRadioVal(form, name) {
        var radios = form.elements[name];
        var val;
        
        for (var i=0, len=radios.length; i<len; i++) {
            if ( radios[i].checked == true ) {
                val = radios[i].value;
                break;
            }
        }
        return val;
    }
    
    function getToppingsTotal(e) {
        var form = this.form;
        var val = parseFloat( form.elements['topping_total'].value );
        
        if ( this.checked == true ) {
            val += parseFloat(this.value);
        } else {
            val -= parseFloat(this.value);
        }
        
        form.elements['topping_total'].value = formatDecimal(val);
        updatePizzaTotal(form);
    }
    
    function getSizePrice(e) {
        this.form.elements['p_size_total'].value = parseFloat( this.value );
        updatePizzaTotal(this.form);
    }
    
    function updatePizzaTotal(form) {
        var p_size_total = parseFloat( form.elements['p_size_total'].value );
        var topping_total = parseFloat( form.elements['topping_total'].value );
        form.elements['total'].value = formatDecimal( p_size_total + topping_total );
        localStorage.setItem("Toppings_Total",topping_total );
        localStorage.setItem("Size", p_size_total);
        localStorage.setItem("Total", p_size_total + topping_total);
    }

    
    
    var form = document.getElementById('newform');

    var el = document.getElementById('p_toppings');

    // input in toppings container element
    var tops = el.getElementsByTagName('input');

    for (var i=0, len=tops.length; i<len; i++) {
        if ( tops[i].type === 'checkbox' ) {
            tops[i].onclick = getToppingsTotal;
        }
    }

    var sz = form.elements['p_size'];
    
    for (var i=0, len=sz.length; i<len; i++) {
        sz[i].onclick = getSizePrice;
    }
    
    // set sz_tot to value of selected
    form.elements['p_size_total'].value = formatDecimal( parseFloat( getRadioVal(form, 'p_size') ) );
    updatePizzaTotal(form);
})
