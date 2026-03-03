const loadLession = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => {
      //   console.log(json);
      displayLessions(json.data);
    });
};

// display show data
const displayLessions = (lessons) => {
  // 1. Get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. Get into every levels
  for (const lesson of lessons) {
    console.log(lesson);
    // 3. Create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary">
            <i class="ri-book-open-fill text-xl py-5"></i>Level - ${lesson.level_no}
        </button>
    `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLession();
