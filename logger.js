let links = [...document.querySelectorAll("a")].map(a => a.href);
console.log("🔗 Links on this page:", links);
alert(`Found ${links.length} links. Check console for details.`);
