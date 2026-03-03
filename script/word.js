const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElement.join(" ");
};

const removeActive = () => {
  const lessonBtn = document.getElementById(".lesson-btn");
  console.log(lessonBtn);
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

const LoadLessionWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLessionsWords(data.data);
    });
};

const loadWordsDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

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
    <div class="">
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
};
