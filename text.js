const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
};

const synonyms = ["hello", "hi", "konnichiwa"];
createElements(synonyms);
