let taskElements = document.querySelectorAll(".task")
let columnElements = document.querySelectorAll(".column")
let addButtons = document.querySelectorAll(".addBtn")
let draggable
let parentColumn;

for(let btn of addButtons){
    btn.addEventListener("click", e => {
        console.log(e)
        parentColumn = e.target.parentElement.parentElement
        //console.log(parentColumn)
        createTask(parentColumn)
    })
}

console.log(taskElements)

addDragToTask()
for(let column of columnElements){
    addDragToColumn(column)
}

function addDragToTask(){
    for(let task of taskElements){
        task.addEventListener("dragstart", e =>{
            task.classList.add("dragging")
            draggable = document.querySelector(".dragging")
            console.log(e)
        })
    }
}
/*
function changeTaskLocationInColoumn(task)
{
    const draggable = document.querySelector('.dragging')
    const afterElement = getDragAfterElement(task,e.clientY)
    console.log(afterElement)
    if (afterElement==null)
    {
        task.appendChild(draggable)
    }
    else{
        task.insertBefore(draggable, afterElement)
    }
}
*/
function addDragToColumn(column){
    column.addEventListener("dragover", e => {
        //console.log("drag over")
        e.preventDefault()
        column.appendChild(draggable)
    })
    column.addEventListener("drop", e =>{
        column.classList.remove("dragging")
    })

}
function getDragAfterElement(coloumn,y)
{
    const draggableElements=[...coloumn.querySelectorAll('.task:not(.dragging)')]
    //console.log(draggableElements)
    return draggableElements.reduce((closest,child)=>
    {
        const box = child.getBoundingClientRect()
        //console.log(box)
        const offset = y - box.top - box.height/ 2
        console.log(offset)
        if(offset<0 && offset>closest.offset)
        {
            return{offset: offset, element: child}
        }
        else {
            return closest
        }
    },{offset: Number.NEGATIVE_INFINITY}).element
}
$("#saveBtn").click(()=>{
    createTask()
})
function createTask(parentColumn)
{
    let taskname=prompt("Task Name:","Task ")
    $(parentColumn).append(
        '<div class = "task" draggable="true">'+taskname+'</div>'
    )

    console.log(columnElements)
}