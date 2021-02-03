window.addEventListener('load',()=>{
    const sidebarToggleButton = document.getElementById("sidebarToggleButton");
    sidebarToggleButton.addEventListener('click',()=>{
        sidebar.classList.toggle('sidebarClosed');
        sidebarToggleButton.classList.toggle('sidebarClosed');
    })
})
