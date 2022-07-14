let form=document.getElementById('form')
let textInput=document.getElementById('textInput')
let dateInput=document.getElementById('dateInput')
let textarea=document.getElementById('textarea')
let msg=document.getElementById('msg')
let add=document.getElementById('add')
let tasks=document.getElementById('tasks')

let data=[];

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    formValidation()
});

let formValidation=()=>{
    if(textInput.value==""){
        msg.innerHTML="* task title cannot be blank"
    }
    else{
        msg.innerHTML=""
        acceptData();

        //close the modal after submission
        add.setAttribute('data-bs-dismiss','modal')
        add.click();

        //iife=> immediadely invoke function expression
        (()=>{
            add.setAttribute('data-bs-dismiss','');
        })();
    }
};



let acceptData=()=>{
    //adding tasks inside data
    data.push({
        text:textInput.value,
        date:dateInput.value,
        description:textarea.value
    });

    localStorage.setItem('tasks',JSON.stringify(data));

    
    showTasks();

    console.log(data);
}

let showTasks=()=>{
    tasks.innerHTML=""
    data.map((item,index)=>{
        return(
            tasks.innerHTML+=`
            <div id="${index}">
              <span class="fw-bold">${item.text}</span>
              <span class="small text-secondary">${item.date}</span>
              <p>${item.description}</p>  
              <span class="options">
                <i 
                class="bi bi-pencil-square"
                onclick="editTask(this)"
                data-bs-toggle="modal" 
                data-bs-target="#form"
                ></i>
                <i 
                class="bi bi-trash"
                onclick="deleteTask(this)"
                data-bs-toggle="modal" 
                data-bs-target="#form"
                ></i>
              </span>
            </div>`
        )
    })
    resetForm()
}
let resetForm=()=>{
    textInput.value='';
    dateInput.value='';
    textarea.value='';
}

let deleteTask=(e)=>{
    console.log(e);
    e.parentElement.parentElement.remove()
    data.splice(e.parentElement.parentElement.id,1)

    localStorage.setItem('tasks',JSON.stringify(data));

    console.log(data);
}

let editTask=(e)=>{
    let selectedTask=e.parentElement.parentElement;
    console.log(selectedTask.children[0]);

    textInput.value=selectedTask.children[0].innerHTML;
    dateInput.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;

    deleteTask(e);
}

(() => {
    data = JSON.parse(localStorage.getItem('tasks')) || [];
    showTasks();
  })();



