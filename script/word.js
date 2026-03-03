const LoadLessionWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessionsWords(data.data));
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
          <h2 class="text-2xl font-bold">${word.word}</h2>
          <p class="text-xl font-medium">Meaning /Pronounciation</p>
          <div class="text-4xl font-semibold font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
          <div class="flex justify-between items-center">
            <button
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
