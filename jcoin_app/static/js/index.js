$(document).ready(function () {
    document.getElementById('btn-upload').addEventListener('click', clickUpload);
    document.getElementById('btn-back').addEventListener("click", cancelUpload);
    document.getElementById('btn-submit').addEventListener("click", submitUpload);

    // read csv input field on change
    $('#input-csv').each(function () {
        $($(this).parent().find('.input-file-btn input')).on('change', {
            dummy: this
        }, function (ev) {
            $(ev.data.dummy)
                .val($(this).val().replace(/\\/g, '/').replace(/.*\//, ''))
                .trigger('focusout');
            // validate the field input
            validateInput();

        });
        $(this).on('focusin', function () {
            $(this).attr('readonly', '');
        }).on('focusout', function () {
            $(this).removeAttr('readonly');
        }).on('click', function () {
            $(this).parent().find('.input-file-btn').click();
        }).on('change', function () {
            validateInput();
        });
    });
});

function clickUpload() {
    console.log("click upload");
    document.getElementById("option-group").style.display = "none";
    $('#input-group').show();
    $('#btn-back').show();
    $('#btn-submit').show();
};

function cancelUpload() {
    console.log("cancel upload");
    document.getElementById("option-group").style.display = "block";
    document.getElementById("input-group").style.display = "none";
    document.getElementById("btn-back").style.display = "none";
    document.getElementById("btn-submit").style.display = "none";
};

function submitUpload() {
    console.log("submit upload");
    if(validateInput()){
        alert('yes!')
    } else{
        alert("no!");
    }
};

function validateInput() {

    const value = $('#input-csv').val();
    // input is valid
    if (value.endsWith(".csv") || value.endsWith(".CSV")) {
        $('#input-csv').addClass('is-valid');
        $('#input-csv').removeClass('is-invalid');
        $('#fileHelp').hide();
        return true;
    }
    // input is invalid
    else {
        $('#input-csv').addClass('is-invalid');
        $('#input-csv').removeClass('is-valid');
        $('#fileHelp').hide();
        return false;
    }
}