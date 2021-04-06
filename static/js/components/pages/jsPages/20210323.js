class Js20210323 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210323

            webrtcservice 리팩토링 및 negotiation event시의 외부 로직을 변경하였다.
            negotiation event시에 remote 부분은 외부에서 호출되는 부분으로 websocket과의 연동이 필요하다.
            또한 현재는 call 버튼을 누를 때마다 추가 피어를 구성하는데 이 버그를 수정하여야 한다.

            밑의 내용은 서버측으로 추후에 따로 분리해야겠다.
            nodejs를 활용하여 static 서버를 구축하였다.
            도메인 또한 등록하였는데 freenom이라는 곳에서 무료로 등록하였다.
            certbot을 활용하여 ssl 인증서를 받았다.
            <code>certbot certonly -d shindev.ml --manual --preferred-challenges dns</code>
            명령어를 실행하면 아래와 같이 나오는데 dns 관리하는 곳으로 가서 해당하는 값으로 TXT 레코드 추가하면 된다.
            <img src="static/img/certbotCmd.png"/>
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