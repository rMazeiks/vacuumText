function change(e) {
    var event = e || window.event;
    process()
}

$(document).ready(function () {
    $('#input').bind('input propertychange', process);
});


function process() {
    var c = $("#input")[0].value;

    //punctuation
    if ($('input#set-three').is(':checked')) {
        c = c.replace(/\.\.\./g, "…");// combine 3 dots.
    }
    if ($('input#set-punct').is(':checked')) {
        c = c.replace(/\s*([\.,!?…;])/g, "$1"); // remove spaces before the points
        c = c.replace(/([\.,!?…;])[\.,!?…]+/g, "$1"); // multiple punctuation mark removal
        c = c.replace(/\n[\.,!?…;]/g, "\n");  // delete punct. marks after newline
        c = c.replace(/([\.,!?…;])\s*/g, "$1 ");  // punktuation mark with any spaces to ". " or similar
        c = c.replace(/[\.!?] ([a-z])/g, " $1");  // delete punct. marks before small characters. But not "..." and "," or ;
    }

    //spaces
    if ($('input#set-space').is(':checked')) {
        c = c.replace(/[ ]+/g, " "); // multiple space character removal
        c = c.replace(/\s*\n\s*/g, "\n"); // remove space before+after newline.
    }

    //lines
    if ($('input#set-mult-nl').is(':checked')) {
        c = c.replace(/[\n\r]+/g, "\n");  //delete multiple newlines.
    }
    if ($('input#set-fix-nl').is(':checked')) {
        c = c.replace(/\n([a-z])/g, " $1");  // delete newlines followed by small letter
    }

    //other
    if ($('input#set-odd-chars').is(':checked')) {
        c = c.replace(/[<>@#]/g, ""); // remove weird characters
    }
    if ($('input#set-dash').is(':checked')) {
        c = c.replace(/ [- –]* /g, "–"); // replace multiple dashes with spaces before and after with one long dash.
    }
    if ($('input#set-quote').is(':checked')) {
        c = c.replace(/\'\'/g, "\""); // replace two single quotes with a double quote
        c = c.replace(/[\"\'][\"\' \*]+/g, "\""); // replace [" or '] + multiple quote-like characters with "
    }

    $("#output")[0].value = c;
}