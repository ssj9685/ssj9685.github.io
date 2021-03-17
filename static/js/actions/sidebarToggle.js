const sidebarToggle = {
    get sidebarToggleBtnEventHandler() {
        const handler = () => {
            const sidebarToggleButton = document.getElementById("sidebarToggleButton");
            if(sidebarToggleButton){
                sidebarToggleButton.addEventListener('click',()=>{
                    sidebar.classList.toggle('sidebarClosed');
                    sidebarToggleButton.classList.toggle('sidebarClosed');
                })
            }
        }
        unscripter("actions/sidebarToggle.js");
        return handler;
    }
}
