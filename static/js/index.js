scripter("actions/sidebarActions.js");
scripter("actions/componentActions.js");
scripter("services/workerService.js");
scripter("services/webRTCService.js");

window.addEventListener('load', ()=>{
    this.componentActions = new ComponentActions();
    this.sidebarActions  = new SidebarActions();
    this.workerService = new WorkerService();
    this.webRtcService =  new WebRTCService();
})