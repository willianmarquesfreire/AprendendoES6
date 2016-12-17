//Parei em => https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations

import WElement from './elements/WElement'
import InjectionPool from './util/InjectionPool'
import { Injectable, Inject } from './util/WDInject'
import World from './world/World'
import WImage from './elements/WImage'
import WCanvas from './elements/WCanvas'
import WType from './enums/WType'
import WBallon from './reusable_objects/WBallon'
import WHeart from './reusable_objects/WHeart'
import WClockOne from './reusable_objects/WClockOne'
import WBall from './reusable_objects/WBall'
import WBallShadow from './reusable_objects/WBallShadow'
import WMoveRandomOne from './events/WMoveRandomOne'
import WFallMove from './events/WFallMove'
import WMouseFollow from './events/WMouseFollow'
import WMimeType from './enums/WMimeType'
import WCanvasQuality from './enums/WCanvasQuality'


// @Injectable : Indica que a classe é injetável
// @Inject(Lista de Injeções) : Lista de injeções a serem feitas
// 
@Injectable()
class Teste1 {
    constructor() {
        console.log("Classe 1 = Construiu")
    }
    method(ola) {
        console.log(ola)
    }
    get testegetter() {
        return "Classe 1 = Teste do Getter"
    }
}

@Injectable()
class Teste2 {
    constructor() {
        console.log("Classe 2 = Construiu")
    }
    get teste2getter() {
        return "Classe 2 = Teste do Getter - Classe 2"
    }
}

@Injectable()
@Inject('Teste1', 'Teste2')
class TesteInject {

    constructor() {
        console.log(this.Teste1.testegetter)
        console.log(this.Teste2.teste2getter)
        console.log('iniciou e injetou tudo')
    }
}


console.log('Pool de Injeções: ', InjectionPool.list())
@InjectLoader('TesteInject')
class load {

    constructor() {
        console.log('Iniciou todas, inclusive eu =D')
    }
}