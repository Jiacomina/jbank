$(document).ready(function () {
    document.getElementById('btn-upload').addEventListener('click', clickUpload);
    document.getElementById('btn-back').addEventListener("click", cancelUpload);
    $('#input-csv').change(function () {
        alert($(this).val())
    });
    $('#input-csv').on("change", function () {
        submitUpload();
    });

        $('.input-csv').each(function () {
          $($(this).parent().find('.input-file-btn input')).on('change', {dummy: this}, function(ev) {
            $(ev.data.dummy)
              .val($(this).val().replace(/\\/g, '/').replace(/.*\//, ''))
              .trigger('focusout');
          });
          $(this).on('focusin', function () {
              $(this).attr('readonly', '');
            }).on('focusout', function () {
              $(this).removeAttr('readonly');
            }).on('click', function () {
              $(this).parent().find('.input-file-btn').click();
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
};