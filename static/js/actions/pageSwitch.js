const pageSwitch = {
    get switchHandler(){
        const handler = () => {
            const mainContent = document.getElementById("mainContent");
            
            const indexLink = document.getElementById("indexLink");
            const jsStudyLink = document.getElementById("jsStudyLink");
            const batchStudyLink = document.getElementById("batchStudyLink");
    
            if(jsStudyLink){
                jsStudyLink.addEventListener('click',()=>{
                    mainContent.innerHTML = "<jsstudy-page></jsstudy-page>";
                })
            }
            if(indexLink){
                indexLink.addEventListener('click',()=>{
                    mainContent.innerHTML = "<index-page></index-page>";
                })
            }
            if(batchStudyLink){
                batchStudyLink.addEventListener('click',()=>{
                    mainContent.innerHTML = "<batchstudy-page></batchstudy-page>";
                })
            }
        }
        unscripter("actions/pageSwitch.js");
        return handler;
    }
}