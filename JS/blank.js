<script>
    document.addEventListener('DOMContentLoaded', () => {
    history.replaceState({ page: "home" }, "", window.location.href);

    const openBlankLink = document.getElementById('openBlankLink');

    openBlankLink.addEventListener('click', (event) => {
    event.preventDefault();

    const newTab = window.open('about:blank', '_blank');
    if (!newTab) {
    alert("Couldn't manage to open a new tab :(");
    return;
}

    const newTabBody = newTab.document.body;
    Object.assign(newTabBody.style, { padding: '0', margin: '0', border: 'hidden' });

    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, { width: '100%', height: '100%', border: 'hidden' });
    iframe.src = window.location.href;

    iframe.onload = () => {
    const links = iframe.contentDocument.querySelectorAll('a[target="_blank"]');
    links.forEach(link => {
    link.addEventListener('click', (event) => {
    event.preventDefault();
    iframe.contentWindow.location.href = link.href;
});
});
};

    newTabBody.appendChild(iframe);
});