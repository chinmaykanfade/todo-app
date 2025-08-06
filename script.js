console.log("script is connected");

 function addTask(){
let task=document.getElementById("taskInput").value;
let li=document.createElement("li");
 let button=document.createElement("button");
 button.textContent="❌";
button.onclick=function(){
    li.remove();
}
let textNode = document.createTextNode(task);
li.appendChild(textNode);
li.appendChild(button);  // add button next to the text


 
document.getElementById("taskList").appendChild(li);
document.getElementById("taskInput").value="";
}