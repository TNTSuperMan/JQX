## $
- \$(selector: String): JQXObject(from document.querySelector)
- \$(dom: HTMLElement): JQXObject(from argument)
- \$(data: Object): Proxy
## JQXObject
#### Functions
- JQXObject.on(name: String, callback: Function): JQXObject(this)
- JQXObject.off(name: String, callback: Function): JQXObject(this)
- JQXObject.remove(): undefined
- JQXObject.append(HTML: String): JQXObject(this)
- JQXObject.next(): JQXObject(nextElementSibling)
#### Properties
- JQXObject.html: Function()
- JQXObject.text: Function()
- JQXObject.style: Function(CSSStyleDeclaration)
- JQXObject.class: Function(DOMTokenList)
- JQXObject.id: Function()