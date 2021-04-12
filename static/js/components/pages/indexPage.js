class IndexPage extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const style = document.createElement('style');
        style.innerHTML = `
            #mainContentTitle{
                border-bottom: 0.1rem solid black;
                padding:0.8rem;
            }
            #mainContentText{
                padding:0.8rem;
                white-space: pre-line;
                overflow: auto;
            }
        `
        const div = document.createElement('div');
        div.innerHTML = `
            <div id="mainContentTitle">
                홈화면
            </div>
            <div id="mainContentText">
                공부는 계속 했지만 완전 초보 개발자이다.
            </div> 
        `
        shadow.appendChild(style);
        shadow.appendChild(div);
    }
    connectedCallback() {
        
    }

    disconnectedCallback() {
        
    }

    adoptedCallback() {
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        
    }
}