const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElement.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLession = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => {
      //   console.log(json);
      displayLessions(json.data);
    });
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
  // console.log(document.querySelector(".active"));
};

const LoadLessionWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // remove all cative class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); // add active class
      displayLessionsWords(data.data);
    });
};

const loadWordsDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// display show word details
const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div class="font-bold text-3xl">
       ${word.word} (<i class="ri-mic-ai-fill text-2xl"></i> : ${word.pronunciation})
    </div>
    <div class="">
       <h2 class="font-bold">Meaning</h2>
       <p class="font-bangla">${word.meaning}</p>
    </div>
    <div class="">
      <h2 class="font-bold">Example</h2>
      <p>${word.sentence}</p>
    </div>
    <div class="space-y-3">
      <p class="font-bold">Synonyms</p>
      <div class="flex gap-3">${createElement(word.synonyms)}</div>
    </div>
  `;
  document.getElementById("word_modal").showModal();
};

// display show words
const displayLessionsWords = (words) => {
  // 1. Get the container & empty
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div
        class="text-center flex flex-col col-span-full items-center justify-center space-y-5 rounded-md p-10 "
        >
        <img src="./assets/alert-error.png" alt="" />
        <p class="text-2xl font-bangla">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-medium text-5xl font-bangla">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  // 2. Get into every words
  words.forEach((word) => {
    // 3. Create Element
    const card = document.createElement("div");
    card.innerHTML = `
      <div
          class="bg-white py-14 px-7 rounded-md text-center shadow-xl space-y-4"
        >
          <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="text-xl font-medium">Meaning /Pronounciation</p>
          <div class="text-4xl font-semibold font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায়নি"}"</div>
          <div class="flex justify-between items-center">
          <button
              onclick="loadWordsDetails(${word.id})"
              class="bg-gray-500/20 hover:bg-[#3b25c1] hover:text-white py-0.5 px-2 rounded-md"
            >
              <i class="ri-information-2-fill text-3xl"></i>
            </button>
            <button
              class="btn bg-gray-500/20 hover:bg-[#3b25c1] hover:text-white py-0.5 px-2 rounded-md cursor-pointer"
            >
              <i class="ri-volume-up-fill text-3xl"></i>
            </button>
          </div>
        </div>
    `;

    // 4. append into container
    wordContainer.append(card);
  });
  manageSpinner(false);
};

// display show lessons
const displayLessions = (lessons) => {
  // 1. Get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. Get into every levels
  for (const lesson of lessons) {
    // 3. Create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}"
        onclick="LoadLessionWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="ri-book-open-fill text-xl py-5"></i>Level - ${lesson.level_no}
        </button>
    `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLession();

document.getElementById("btn-search").addEventListener("click", function () {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLessionsWords(filterWords);
    });
  input.value = "";
});
