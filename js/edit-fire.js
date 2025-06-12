console.log("Are in edit fire")

import {getObjectAsJson} from "./module.js"

document.addEventListener("DOMContentLoaded", initForm)
let fireForm;

async function initForm(){
    fireForm = document.querySelector("#fireForm")
    const params = new URLSearchParams(window.location.search);
    const fireId = params.get("id");
    if(!fireId){
        alert("Fire id is missing")
        return
    }

    const fire = await fetchFire(fireId);
    if (fire) {
        fillForm(fire);
        fireForm.action = `http://localhost:8080/fire/${fireId}`; // 👈 Sæt korrekt PUT URL
    }

    fireForm.addEventListener("submit", handleFormSubmit);
}

async function fetchFire(id) {
    try {
        const response = await fetch(`http://localhost:8080/fire/${id}`);
        if (!response.ok) throw new Error("Fire not found");
        return await response.json();
    } catch (err) {
        console.error("Error fetching fire:", err);
        alert("Kunne ikke hente fire data");
    }

}

function fillForm(fire) {
    fireForm.name.value = fire.name;
    fireForm.timestamp.value = fire.timestamp.replace(" ", "T").substring(0, 16);
    fireForm.status.value = fire.status;
    fireForm.latitude.value = fire.latitude;
    fireForm.longitude.value = fire.longitude;
}

async function handleFormSubmit(event){
    event.preventDefault()
    const form = event.currentTarget
    const url = form.action
    try{
        const formData = new FormData(form)
        const response = await postFormDataAsJson(url, formData)
        if(response.ok){
            alert("updated fire")
        }
    } catch (error){
        alert(error.message)
        console.log(error)
    }
}

async function postFormDataAsJson(url, formData){
    console.log(url)
    console.log(formData)
    const plainFormData = Object.fromEntries(formData.entries())
    const resp = await getObjectAsJson(url, plainFormData, "PUT")
    return resp
}
