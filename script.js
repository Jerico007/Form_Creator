{
  /* <div class="component-holder">
  <div class="heading">
    <p class="label">Sample Label</p>
    <button class="delete">
      <span class="material-symbols-outlined">delete</span>
    </button>
  </div>
  <input type="text" placeholder="Sample text"></input>
</div>; */
}

let id = generateUUID();

// main form body
const mainForm = document.getElementById("main-form");

// Component buttons
const Input = document.getElementById("input");
const Select = document.getElementById("select");
const TextArea = document.getElementById("textarea");
const Save = document.getElementById("save");

// Event listeners for components buttons
Input.onclick = (e) => {
  addInputs(e.target.id);
};

Select.onclick = (e) => {
  addInputs(e.target.id);
};

TextArea.onclick = (e) => {
  addInputs(e.target.id);
};

Save.onclick = saveFormData;

// Mainform drag events
// mainForm.ondragover = allowDrop;

// mainForm.ondrop = handleOnDrop

// function to generate UUID
function generateUUID() {
  const hexDigits = "0123456789abcdef";
  let uuid = "";
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += "-";
    } else if (i === 14) {
      uuid += "4";
    } else if (i === 19) {
      uuid +=
        hexDigits.substr((Math.random() * 4) | 0, 1) +
        "89ab"[Math.floor(Math.random() * 2)];
    } else {
      uuid += hexDigits.substr((Math.random() * 16) | 0, 1);
    }
  }
  return uuid;
}

// function to add Inputs into the form
function addInputs(type) {
  const componentHolder = document.createElement("div");
  componentHolder.className = `component-holder ${type}`;
  componentHolder.id = id;
  componentHolder.draggable = true;
  componentHolder.ondragstart = handleDragStart;
  componentHolder.ondragover = allowDrop;
  componentHolder.ondrop = handleOnDrop;
  componentHolder.innerHTML = `<div class="heading">
   <p class="label">Sample Label</p>
   <button class="delete" onclick="deleteInput(event)">
     <span class="material-symbols-outlined">delete</span>
   </button>
 </div>
 ${
   type === "input"
     ? '<input type="text" placeholder="Sample Placeholder"></input>'
     : type === "select"
     ? '<select><option value="Select 1">Select 1</option><option value="Select 2">Select 2</option><option value="Select 3">Select 3</option></select>'
     : type === "textarea"
     ? '<textarea placeholder="Sample Placeholder"></textarea>'
     : ""
 }
`;
  mainForm.appendChild(componentHolder);
  id = generateUUID();
}

// Function to delete the Inputs
function deleteInput(e) {
  const InputChild = e.target.parentElement.parentElement.parentElement;
  mainForm.removeChild(InputChild);
}

// Function to save the form data
function saveFormData() {
  if (Array.from(mainForm.children).length > 0) {
    const data = Array.from(mainForm.children).map((val) => {
      let obj = {};

      if (val.classList[1] === "textarea" || val.classList[1] === "input") {
        obj = {
          id: val.id,
          type: val.classList[1],
          label: val.children[0].children[0].innerText,
          placeholder: val.children[1].placeholder,
        };
      } else {
        obj = {
          id: val.id,
          type: val.classList[1],
          label: val.children[0].children[0].innerText,
          options: Array.from(val.children[1]).map((option) => {
            return option.value;
          }),
        };
      }
      return obj;
    });

    // Stringifying JSON data
    console.log(JSON.stringify(data, null, 4));
  }
}

// Function to allow Drop event on dragOver
function allowDrop(e) {
  e.preventDefault();
}

// Function to handle drop event when item has been dropped
function handleOnDrop(e) {
  e.preventDefault();
 
  let dragId = e.dataTransfer.getData("dragId");
  if (
    e.target.parentElement.parentElement.hasAttribute("id") &&
    e.target.parentElement.parentElement.id !== dragId &&
    e.target.parentElement.parentElement.id !== "main-form"
  ) {
    const parent = e.target.parentElement.parentElement;

    const element = document.getElementById(dragId);

    parent.insertAdjacentElement("beforebegin", element);
  } else if (
    e.target.parentElement.hasAttribute("id") &&
    e.target.parentElement.id !== dragId &&
    e.target.parentElement.id !== "main-form"
  ) {
    const parent = e.target.parentElement;

    const element = document.getElementById(dragId);

    parent.insertAdjacentElement("beforebegin", element);
  } else if (
    e.target.hasAttribute("id") &&
    e.target.id !== dragId &&
    e.target.id !== "main-form"
  ) {
    const parent = e.target;

    const element = document.getElementById(dragId);

    parent.insertAdjacentElement("beforebegin", element);
  }
  return;
}

// Function to handle drag event when item has been dragged
function handleDragStart(e) {
  e.dataTransfer.setData("dragId", e.target.id);
}
