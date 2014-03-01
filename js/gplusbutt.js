(function () {
    var s,
        po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/client:plusone.js';

    s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    setTimeout(function () {
        document.querySelector("header").style.WebkitAnimationName = "slideout";
        document.querySelector("#buttons").style.opacity = 1;
    }, 600);
    gapi.client.request({
        path: "/plus/v1/people/me",
        callback: function () {
            console.log(arguments);
        }
    });
  }
  else {
    document.getElementById('signinButton').setAttribute('style', 'display: inline');
  }
}

$(".play").on("click", function () {
    var cdi,
        $countdown = $("#countdown"),
        cd = 3;
    $("#buttons").css("opacity", 0);

    console.log($countdown.show());
    $countdown.show().css("-webkit-animation-play-state", "running");

    cdi = setInterval(function () {
        if (0 == cd) {
            clearInterval(cdi);
            $countdown.hide().css("-webkit-animation-play-state", "paused");
        }
        else {
            $countdown.text(cd);
            cd--;
        }
    }, 1000);
});
