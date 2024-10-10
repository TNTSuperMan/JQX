import { React } from "./proxy";
const ID_TEXT  = 0;
const ID_ID    = 1;
const ID_CLASS = 2;
const ID_STYLE = 3;
const updateChilds = (e:JQXBase)=>{
    Array.prototype.splice.call(e,Infinity); //Clear
    const children = e.element.children;
    for(let i = 0;i < children.length;i++)
        Array.prototype.push.call(e, new JQXBase(children[i]));
}
export class JQXBase {
    element: Element;
    style: CSSStyleDeclaration | null;
    constructor(e:Element){
        this.element = e;
        if(e instanceof HTMLElement){
            this.style = new Proxy(e.style,{
                set(target, prop, value, receiver){
                    if(typeof value == "function"){
                        React(value,
                            e=>Reflect.set(target,prop,e,receiver),
                            this.Element, ID_STYLE )
                    }else{
                        return Reflect.set(target,prop,value,receiver);
                    }
                }
            })
        }
        updateChilds(this);
    }
    on( name: keyof ElementEventMap,
        callback: (this:Element, ev:Event)=>void){
        this.element.addEventListener(name, callback);
    }
    off( name: keyof ElementEventMap,
         callback: (this:Element, ev:Event)=>void){
        this.element.removeEventListener(name, callback);
    }
    get text(){return this.element.textContent}
    set text(value){
        if(typeof value == "function"){
            React(value,
                e=>{
                    this.element.textContent = e;
                    updateChilds(this);
                }, this.element, ID_TEXT );
        }else{
            this.element.textContent = value;
        }
    }
    get html(){return this.element.innerHTML}
    set html(value){
        if(typeof value == "function"){
            React(value,
                e=>{
                    this.element.innerHTML = e;
                    updateChilds(this);
                }, this.element, ID_TEXT );
        }else{
            this.element.innerHTML = value;
        }
    }
    get id(){return this.element.id}
    set id(value){
        if(typeof value == "function"){
            React(value,
                e=>this.element.id = e,
                this.element, ID_ID );
        }else{
            this.element.id = value;
        }
    }
    get class(){return this.element.className}
    set class(value){
        if(typeof value == "function"){
            React(value,
                e=>this.element.className = e,
                this.element, ID_CLASS );
        }else{
            this.element.className = value;
        }
    }
}
export let JQX:typeof JQXBase = JQXBase;

export const Extend = (createChildJQX:(base:typeof JQXBase)=>typeof JQXBase) => {
    JQX = createChildJQX(JQX);
}