class Js20210318 extends HTMLElement{
    static get observedAttributes() {
        return [];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'closed'});
        this.getShadow = () => shadow;
        const div = document.createElement('div');
        div.innerHTML = `
            20210318

            웹 워커 실습을 진행하였다.
            쓰레드와 비슷한 개념으로 작업을 던져놓고 기존 작업을 다시 진행할 수 있어서 효율적인 기술이다.
            <input type="text" id="firstMulNum" value="0">
            <input type="text" id="secondMulNum" value="0">
            <div id="workerMultiplyResult">
        `
        shadow.appendChild(div);
        this.workerHandler();
    }
    connectedCallback() {
        
    }

    disconnectedCallback() {
        
    }

    adoptedCallback() {
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        
    }

    workerHandler = () => {
        const shadow = this.getShadow();
        if (window.Worker) {
            const multiplyWorker = window.workerService.multiplyWorker;

            const firstMulNum = shadow.getElementById('firstMulNum');
            const secondMulNum = shadow.getElementById('secondMulNum');
            const workerMultiplyResult = shadow.getElementById("workerMultiplyResult");

            firstMulNum.addEventListener('change', () => {
              multiplyWorker.postMessage([firstMulNum.value, secondMulNum.value]);
            })
            secondMulNum.addEventListener('change', () => {
              multiplyWorker.postMessage([firstMulNum.value, secondMulNum.value]);
            })
    
            multiplyWorker.addEventListener('message',e => {
                workerMultiplyResult.textContent = e.data;
            })
        }
        else {
            console.log('not supported');
        }
    }
}