document.getElementById('changeUrlButton').addEventListener('click', function() {
    var originalContent = document.body.innerHTML;

    history.pushState(null, '', 'about:blank');

    document.body.innerHTML = originalContent;
});
