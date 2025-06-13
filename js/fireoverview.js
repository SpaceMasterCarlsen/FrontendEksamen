import {fetchAnyUrl, deleteObjects, getObjectAsJson} from "./module.js";

console.log("Is in fire over view!");

document.addEventListener("DOMContentLoaded", () => fetchFire())

const url = "http://localhost:8080/fire";
const tableoverview = document.querySelector("table");

let fire = [];
async function fetchFire(){
    fire = await fetchAnyUrl(url)
    if(fire){
        fire.forEach(createTable)
    } else {
        alert("fejl ved kald til backend url" + url + " vil du vide mere så kig i console")
    }
}

function createTable(fire){
    let cellCount = 0;
    let rowCount = tableoverview.rows.length;
    let row = tableoverview.insertRow(rowCount)
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = fire.id
    cell = row.insertCell(cellCount++)
    cell.innerHTML = fire.name
    cell = row.insertCell(cellCount++)
    cell.innerHTML = fire.timestamp
    cell = row.insertCell(cellCount++)
    const toggleActive = document.createElement("button")
    toggleActive.textContent = fire.status ? "Active" : "De-Active"
    toggleActive.className = "toggleStatusBtn"
    toggleActive.addEventListener("click", () => toggleStatus(fire))
    cell.appendChild(toggleActive)
    cell = row.insertCell(cellCount++)
    cell.innerHTML = fire.latitude
    cell = row.insertCell(cellCount++)
    cell.innerHTML = fire.longitude
    cell = row.insertCell(cellCount++)
    row.id = fire.id
    const editfire = document.createElement("a")
    editfire.href = `edit-fire.html?id=${fire.id}`
    editfire.textContent = "Edit"
    editfire.setAttribute("value", "Edit")
    cell.appendChild(editfire)

    cell = row.insertCell(cellCount++)
    const deleteFire = document.createElement("input")
    deleteFire.type = "button"
    deleteFire.className = "deleteBtn"
    deleteFire.setAttribute("value", "Delete")
    cell.appendChild(deleteFire)
    deleteFire.onclick = function (){
        document.getElementById(fire.id).remove()
        deleteObjects((url + `/${fire.id}`) ,fire)
    }
}

async function toggleStatus(fire){
    const updatedFire = {...fire, status: !fire.status}
    getObjectAsJson((url + `/${fire.id}`), updatedFire, "PUT")
    fire.status = updatedFire.status
    const row = document.getElementById(fire.id)
    row.cells[3].querySelector("button").textContent = fire.status ? "Active" : "De-Active"
}