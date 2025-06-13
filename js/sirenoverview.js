import {fetchAnyUrl, deleteObjects} from "./module.js";

console.log("Is in siren over view!");

document.addEventListener("DOMContentLoaded", () => fetchSiren())

const url = "http://localhost:8080/siren";
const tableoverview = document.querySelector("table");

let siren = [];
async function fetchSiren(){
    siren = await fetchAnyUrl(url)
    if(siren){
        siren.forEach(createTable)
    } else {
        alert("fejl ved kald til backend url" + url + " vil du vide mere så kig i console")
    }
}

function createTable(siren){
    let cellCount = 0;
    let rowCount = tableoverview.rows.length;
    let row = tableoverview.insertRow(rowCount)
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = siren.id
    cell = row.insertCell(cellCount++)
    cell.innerHTML = siren.locationName
    cell = row.insertCell(cellCount++)
    cell.innerHTML = siren.operationalStatus
    cell = row.insertCell(cellCount++)
    cell.innerHTML = siren.isInWorkingCondition
    cell = row.insertCell(cellCount++)
    cell.innerHTML = siren.latitude
    cell = row.insertCell(cellCount++)
    cell.innerHTML = siren.longitude
    cell = row.insertCell(cellCount++)
    row.id = siren.id
    const editSiren = document.createElement("a")
    editSiren.href = `edit-siren.html?id=${siren.id}`
    editSiren.textContent = "Edit"
    editSiren.className = "niceBtn"
    cell.appendChild(editSiren)

    cell = row.insertCell(cellCount++)
    const deleteSiren = document.createElement("input")
    deleteSiren.type = "button"
    deleteSiren.className = "deleteBtn"
    deleteSiren.setAttribute("value", "Delete")

    cell.appendChild(deleteSiren)
    deleteSiren.onclick = function (){
        document.getElementById(siren.id).remove()
        deleteObjects((url + `/${siren.id}`) ,siren)
    }
}