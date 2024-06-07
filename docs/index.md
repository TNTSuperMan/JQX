## $
- \$(selector: String): JQXObject(from document.querySelector)
- \$(html: String): JQXObject(from document.createElement)
- \$(dom: HTMLElement): JQXObject(from argument)
## $$
- \$$(selector: String): Array[JQXObject](from document.querySelectorAll)
## JQXObject
#### Functions
- JQXObject.on(name: String, callback: Function): JQXObject(this)
- JQXObject.off(name: String, callback: Function): JQXObject(this)
- JQXObject.remove(): undefined
- JQXObject.append(HTML: String): JQXObject(this)
- JQXObject.next(): JQXObject(nextElementSibling)
#### Properties
- JQXObject.html: String
- JQXObject.text: String
- JQXObject.style: CSSStyleDeclaration
- JQXObject.class: DOMTokenList
- JQXObject.id: String