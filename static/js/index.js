window.addEventListener('load',()=>{
    const sidebarToggleButton = document.getElementById("sidebarToggleButton");
    sidebarToggleButton.addEventListener('click',()=>{
        sidebar.classList.toggle('sidebarClosed');
        sidebarToggleButton.classList.toggle('sidebarClosed');
    })
    
    const addButton = document.getElementById("addButton");
    const customElementTestDiv = document.getElementById("customElementTestDiv");
    addButton.addEventListener('click', ()=>{
        const indexElement = document.createElement('index-element');
        indexElement.setAttribute('length', '100');
        indexElement.setAttribute('color', 'var(--birthColor)');
        customElementTestDiv.appendChild(indexElement);
    })
})
