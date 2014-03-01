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
