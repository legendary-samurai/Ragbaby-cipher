const al = "abcdefghijklmnopqrstuvwxyz";
// encode
const encodeForm = document.querySelector("#encode-form");
const encodeInputText = document.querySelector("#encode-input");
const encodeInputKey = document.querySelector("#encode-key");
const encodeButton = document.querySelector("#encode-btn");
const showEncodeText = document.querySelector("#show-encode-text");
const showEncodeKey = document.querySelector("#show-encode-key");
// decode
const decodeForm = document.querySelector("#decode-form");
const decodeInputText = document.querySelector("#decode-input");
const decodeInputKey = document.querySelector("#decode-key");
const decodeButton = document.querySelector("#decode-btn");
const showdecodeText = document.querySelector("#show-decode-text");
const showdecodeKey = document.querySelector("#show-decode-key");

encodeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (encodeInputText.value && encodeInputKey.value) {
    let text = encodeInputText.value.toLowerCase();
    let key = encodeInputKey.value.toLowerCase();
    let encodeResult = Encode(text, key);

    // show in dom
    showEncodeText.textContent = encodeResult;
    showEncodeKey.textContent = key;

    // reset inputs
    resetInputs(encodeInputText, encodeInputKey);
  }
});

decodeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (decodeInputText.value && decodeInputKey.value) {
    let text = decodeInputText.value;
    let key = decodeInputKey.value;
    let decodeResult = Decode(text, key);

    // show in dom
    showdecodeText.textContent = decodeResult;
    showdecodeKey.textContent = key;

    // reset inputs
    resetInputs(decodeInputText, decodeInputKey);
  }
});

function resetInputs(t, k) {
  t.value = "";
  k.value = "";
}

function Encode(text, key) {
  const alpha = makealpha(new Set(key));
  return text.replace(/[a-z]+/gi, (s) => make(alpha, s));
}

function Decode(text, key) {
  const alpha = makealpha(new Set(key));
  return text.replace(/[a-z]+/gi, (s) => make(alpha, s, false));
}

function make(alpha, word, encode = true) {
  const cmap = [...word].map((e) => (/[A-Z]/.test(e) ? 1 : 0));
  word = [...word.toLowerCase()].map((e, i) =>
    encode
      ? alpha[alpha.indexOf(e) + i + 1]
      : alpha[alpha.lastIndexOf(e) - (i + 1)]
  );
  return word.map((e, i) => (cmap[i] == 1 ? e.toUpperCase() : e)).join("");
}

function makealpha(key) {
  key = [...key].join("");
  return (key + [...al].filter((e) => !key.includes(e)).join("")).repeat(3);
}
