console.log("script is connected");

 function addTask(){
let task=document.getElementById("taskInput").value;
let li=document.createElement("li");
 let deletebutton=document.createElement("button");
 deletebutton.textContent="❌";
 deletebutton.classList.add("del-btn");
 
deletebutton.onclick=function(){
    li.remove();
}
let donebutton=document.createElement("button");
donebutton.textContent="✅";
donebutton.classList.add("done-btn");
donebutton.onclick=function(){
    li.style.textDecoration="line-through";
    li.style.opacity="0.6"
}

let textNode = document.createTextNode(task);
let taskitem=document.createElement("div");
taskitem.classList.add("taskitem");
li.appendChild(textNode);
li.appendChild(deletebutton);  
li.appendChild(donebutton);
li.appendChild(taskitem);

donebutton.innerHTML="<span class='tick'>✅</span>"
 
document.getElementById("taskList").appendChild(li);
document.getElementById("taskInput").value="";
}
