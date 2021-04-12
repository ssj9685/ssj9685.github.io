scripter("components/pages/indexPage.js");
scripter("components/pages/jsStudyPage.js");
scripter("components/pages/batchStudyPage.js");

class ComponentActions{
    constructor(){
        this.pageElementDefineHandler();
        this.pageSwitchEventHandler();
    }

    pageSwitchEventHandler = () => {
        const mainContent = document.getElementById("mainContent");
        const pageLinks = document.querySelectorAll("[id*='page-link']");

        pageLinks.forEach(link => {
            link.addEventListener('click',()=>{
                const page = link.id.replace("-link","");
                mainContent.innerHTML = `<${page}></${page}>`;
            })
        })
    }

    pageElementDefineHandler = () => {
        customElements.define('jsstudy-page', JsStudyPage);
        customElements.define('batchstudy-page', BatchStudyPage);
        customElements.define('index-page', IndexPage);
    }
}
