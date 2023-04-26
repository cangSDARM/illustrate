globalThis.illustrate = {
  printMode: () => {
    // add printmode css
    let inject = document.createElement("link");
    inject.setAttribute("rel", "stylesheet");
    inject.setAttribute("href", "printmode.css");
    document.head.appendChild(inject);
    // open everything up
    // TODO:
    // [].forEach.call(document.querySelectorAll(".record, .calculation"), (el) => {
    //   el.classList.add("selected");
    //   el.classList.add("annotate");
    // });
    // [].forEach.call(document.querySelectorAll("codesample"), (el) => {
    //   el.classList.add("show");
    // });
    [].forEach.call(document.querySelectorAll("*"), (el) => {
      el.onclick = null;
    });
  }
};
