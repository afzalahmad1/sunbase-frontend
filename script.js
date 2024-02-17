let formArr = [];
let dragItem = null;
let sortableForm = document.getElementById("form");
let items=[];

// function call onClick

function generateToken() {
  let arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "c",
    "y",
    "z",
  ];
  let token = '';
  for(let i=0 ; i<arr.length; i++){
    let length = arr.length - 1 ;
    let idx = Math.floor(Math.random() * length);
    token += arr[idx];
  }
  return token;
}

function addComponent(type) {
//   console.log(type);
  let token = generateToken();
  let label = type[0].toUpperCase() + type.slice(1,type.length);
//   console.log(label);
  let obj = {
    id: token,
    type: type,
    label: label,
    placeholder: type + '....',
    options: ['option1', 'option2', 'option3', 'option4','option5'],

  };
  formArr.push(obj)
  displayForm();
}

function deleteComponent(id){
    // console.log(id);
    for(let i=0 ;i<formArr.length ; i++){
        if(formArr[i].id === id){
            formArr.splice(i,1)
        }
    }
    displayForm();
}



// creating form  data
function displayForm(){
    let form = document.getElementById("form");
    form.innerHTML = "";
    formArr.map((data,idx)=>{
        if(data.type === 'text'){
            form.innerHTML += `
            <div class="input-container item" draggable="true">
                <div class="label-container">
                    <label >Sample Label</label>
                    <div onclick="deleteComponent('${data.id}')" class="delete-icon"><i class="fa-solid fa-trash"></i></div>
                </div>
                <input type =${data.type} placeholder=${data.placeholder} />
            </div>
            `
        }else if(data.type === 'textarea'){
            form.innerHTML += `
               <div class="item" draggable="true">
                    <div class="label-container">
                        <div>Text Area </div>
                        <div onclick="deleteComponent('${data.id}')" class="delete-icon"><i class="fa-solid fa-trash"></i></div>
                    </div>
                   <textarea placeholder=${data.placeholder}  class="textarea"></textarea>
               </div>
            `
        }else if(data.type === 'button'){
            form.innerHTML += `
              <div class="btn-container item" draggable="true">
                <div class="label-container">
                   <div>Sample Button </div>
                   <div onclick="deleteComponent('${data.id}')" class="delete-icon"><i class="fa-solid fa-trash"></i></div>
                </div>
                 <button >${data.label}</button>
              </div>
            `
        }else if(data.type === 'select'){
            let html = `
                  <div class="select-container item" draggable="true"><div class="label-container">
                  <div>Select</div>
                  <div onclick="deleteComponent('${data.id}')" class="delete-icon"><i class="fa-solid fa-trash"></i></div>
              </div><select>
            `;
            data.options.forEach(opt =>{
                html += `
                  <option>${opt}</option>
                `
            })
            html += '</select></div>';

            form.innerHTML += html;

        }
    })
   items = sortableForm.querySelectorAll(".item");
//    console.log('items',items);
   items.forEach(item => {
    item.addEventListener("dragstart", () => {
        // Adding dragging class to item after a delay
        setTimeout(() => item.classList.add("dragging"), 0);
    });
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
});
}




const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // console.log(draggingItem);
    // Getting all items except currently dragging and making array of them
    let siblings = [...sortableForm.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    // Inserting the dragging item before the found sibling
    sortableForm.insertBefore(draggingItem, nextSibling);
}



sortableForm.addEventListener("dragover", initSortableList);
sortableForm.addEventListener("dragenter", e => e.preventDefault());

//
let btn = document.getElementById("btn").addEventListener('click',()=>{
    console.log(formArr);
})
