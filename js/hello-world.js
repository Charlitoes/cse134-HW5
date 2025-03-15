// Define the custom <hello-world> element
class HelloWorld extends HTMLElement {
    constructor() {
      super();
      // When the element is created, log the message to the console
      console.log("Hello world!");
    }
  }
  
  // Register the custom element
  customElements.define('hello-world', HelloWorld);