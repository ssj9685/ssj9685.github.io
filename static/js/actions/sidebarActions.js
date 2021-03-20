class SidebarActions{
    constructor(){
        this.sidebarToggleHandler();
    }
    sidebarToggleHandler = () => {
        const sidebarToggleButton = document.getElementById("sidebarToggleButton");
        if(sidebarToggleButton){
            sidebarToggleButton.addEventListener('click',()=>{
                sidebar.classList.toggle('sidebarClosed');
                sidebarToggleButton.classList.toggle('sidebarClosed');
            })
        }
    }
}