document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionItem = button.parentElement;
    const content = accordionItem.querySelector(".accordion-content");
    const icon = accordionItem.querySelector(".icon");

    // active hidden
    document.querySelectorAll(".accordion-item").forEach((item) => {
      if (item !== accordionItem) {
        item.querySelector(".accordion-content").style.maxHeight = null;
        item.querySelector(".icon").innerText = "+";
        item.classList.remove("bg-white"); // remove color
      }
    });

    // toggle active
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.innerText = "+";
      icon.classList.add("text-2xl", "font-bold");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.innerText = "-";
      icon.classList.add("text-2xl", "font-bold");
    }
  });
});
