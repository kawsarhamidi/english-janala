const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};

const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promis off response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
    const lessonBottons = document.querySelectorAll(".lesson-btn");
    lessonBottons.forEach(btn=> btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWord(data.data);
    });
};

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
};

// "data": {
// "word": "Vague",
// "meaning": "অস্পষ্ট",
// "pronunciation": "ভেইগ",
// "level": 2,
// "sentence": "His explanation was too vague to understand.",
// "points": 2,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "unclear",
// "indistinct",
// "ambiguous"
// ],
// "id": 22
// }

const displayWordDetails = (word) => {
    const detailBox = document.getElementById("details-container");
    detailBox.innerHTML = `
    <div class="">
        <h2 class="text-2xl font-bold">${word.word}
          (<i class="fa-solid fa-microphone-lines"></i> 
          : ${word.pronunciation}
            )</h2>
      </div>
      <div class="">
        <h2 class="font-bold"> Meaning
        </h2>
        <p class="">${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Sentence
        </h2>
        <p class="">${word.sentence}</p>
      </div>
      <div class="">
        <h2 class="font-bold">parts Of Speech
        </h2>
        <p class="">${word.partsOfSpeech}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Synonym</h2>
        <div class="">${createElements(word.synonyms)}</div>
      </div>
    
    `;
    document.getElementById("details_modal").showModal();
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `<div class="text-center  col-span-full py-10 rounded-xl space-y-6 font-bangla">
                <img class="mx-auto" src="./assets/alert-error.png" />
              <p class="font-medium text-xl text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
              <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
            </div>`;
        return;
    }
//     {
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"
// },
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `<div 
            class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            
              <h2 class="font-bold text-2xl">${word.word ? word.word : "Word not found"}</h2>
              <p class="font-semibold">${word.pronunciation ? word.pronunciation : "Word pronunciation not found"}</p>
              <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "Word meaning not found"}</div>
              <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>`;
        wordContainer.append(card);
        
    });
    manageSpinner(false);
};

const displayLessons = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2. get into evey lessons 
    for (let lesson of lessons) {
        // 3. create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =  `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" href="" 
        class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> lesson - ${lesson.level_no}
        </button>`;
    // 4. append into container
    levelContainer.append(btnDiv);
    }
     
};
loadLessons();