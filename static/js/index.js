window.addEventListener('DOMContentLoaded', () => {
    scripter("actions/sidebarToggle.js");
    scripter("actions/pageSwitch.js");
    scripter("pages/indexPage.js");
    scripter("pages/jsStudyPage.js");
    scripter("pages/batchStudyPage.js");
    scripter("shadowElement/squareElement.js");
    scripter("workers/multiplyWorker.js");
})

window.addEventListener('load',()=>{
    pageSwitch.switchHandler();
    sidebarToggle.sidebarToggleBtnEventHandler();
})