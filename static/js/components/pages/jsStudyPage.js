scripter("components/shadowElement/squareElement.js");
scripter("components/pages/jsPages/20210204.js");
scripter("components/pages/jsPages/20210311.js");
scripter("components/pages/jsPages/20210317.js");
scripter("components/pages/jsPages/20210318.js");
scripter("components/pages/jsPages/20210320.js");
scripter("components/pages/jsPages/20210322.js");
scripter("components/pages/jsPages/20210323.js");
scripter("components/pages/jsPages/20210325.js");
scripter("components/pages/jsPages/20210328.js");


class JsStudyPage extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        customElements.define('js-20210204', Js20210204);
        customElements.define('js-20210311',Js20210311);
        customElements.define('js-20210317',Js20210317);
        customElements.define('js-20210318',Js20210318);
        customElements.define('js-20210320',Js20210320);
        customElements.define('js-20210322',Js20210322);
        customElements.define('js-20210323',Js20210323);
        customElements.define('js-20210325',Js20210325);
        customElements.define('js-20210328',Js20210328);
        
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
            code {
                color: white;
                background-color: gray;
                border-radius: 3px;
                font-family: courier, monospace;
                padding: 0 3px;
            }
        `
        const div = document.createElement('div');
        div.style.height = "100vh";
        div.style.width = "100vw";
        div.style.overflow = "auto";
        /**
         * TODO seperate divs and make contents list
         */
        div.innerHTML = `
            <div id="mainContentTitle">
                Javascript
            </div>
            <div id="mainContentText">
                <js-20210204></js-20210204>
                <js-20210311></js-20210311>
                <js-20210317></js-20210317>
                <js-20210318></js-20210318>
                <js-20210320></js-20210320>
                <js-20210322></js-20210322>
                <js-20210323></js-20210323>
                <js-20210325></js-20210325>
                <js-20210328></js-20210328>
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