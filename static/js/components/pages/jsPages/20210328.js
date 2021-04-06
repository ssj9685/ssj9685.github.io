class Js20210328 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210328
            daemon server를 구축하여 백그라운드 프로세스로 돌아가도록 하였고, 이에 맞게 CLI 창에서 프로세스 kill 할 수 있는 프로그램도 구축하였다.
            현재는  pid를 파일로 관리하여 그 파일에서 pid를 긁어서 다른 프로그램에서 종료하도록 되어있다. 더 나은 프로세스를 생각해봐야겠다.
            또한 log 관리 프로그램을 구축하였다. log 파일을 별도로 관리하고 실시간으로 log를 모니터링 할 수 있는 프로그램 또한 구축하였다.
            효율적인 패키지 관리를 위해서 절대경로를 지정하는 방법을 공부해야겠다.
        `
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