
jQuery('#submit-button').on("click", function () {
    var data = {
        enfant: jQuery('form').find('[data-name=enfant]').val(),
        mois: jQuery('form').find('[data-name=mois]').val(),
        jours: jQuery('form').find('[data-name=jours]').val(),
        periodes: []
    };
    
    jQuery('table').find('tbody').find('tr').each((tr) => {
        data.periodes.push({
            periode: jQuery(tr).find('[data-name=periode]').val(),
            motif: jQuery(tr).find('[data-name=motif]').val(),
        });
    });
    
    console.log(data);
});