$(document).ready(function () {
    
    $("button").click(function () {
        alert('You clicked on "'+$(this).text()+'"');
    });

    $("button").stickybuttons();
});
