document.addEventListener('DOMContentLoaded', () => {
    const openBlankLink = document.getElementById('openBlankLink');

    openBlankLink.addEventListener('click', (event) => {
        event.preventDefault();

        // Create new tab with basic HTML structure
        const newTab = window.open('about:blank', '_blank');
        if (!newTab) return;

        // Write basic HTML structure to the new tab
        newTab.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    html, body { margin: 0; padding: 0; height: 100%; }
                    iframe { border: none; width: 100%; height: 100%; }
                </style>
            </head>
            <body>
                <iframe id="contentFrame"></iframe>
            </body>
            </html>
        `);

        // Get reference to the iframe
        const iframe = newTab.document.getElementById('contentFrame');

        // Set iframe source after a short delay
        setTimeout(() => {
            iframe.src = window.location.href;
        }, 100);

        // Add navigation handling
        iframe.onload = () => {
            iframe.contentWindow.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' && e.target.target === '_blank') {
                    e.preventDefault();
                    iframe.contentWindow.location.href = e.target.href;
                }
            });
        };
    });
});
