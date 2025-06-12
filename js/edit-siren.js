console.log("Are in edit siren")

import {getObjectAsJson} from "./module.js"

document.addEventListener("DOMContentLoaded", initForm)
let sirenForm;

async function initForm(){
    sirenForm = document.querySelector("#sirenForm")
    const params = new URLSearchParams(window.location.search);
    const sirenId = params.get("id");
    if(!sirenId){
        alert("siren id is missing")
        return
    }

    const siren = await fetchSiren(sirenId);
    if (siren) {
        fillForm(siren);
        sirenForm.action = `http://localhost:8080/siren/${sirenId}`;
    }

    sirenForm.addEventListener("submit", handleFormSubmit);
}

async function fetchSiren(id) {
    try {
        const response = await fetch(`http://localhost:8080/siren/${id}`);
        if (!response.ok) throw new Error("Fire not found");
        return await response.json();
    } catch (err) {
        console.error("Error fetching siren:", err);
        alert("Kunne ikke hente siren data");
    }

}

function fillForm(siren) {
    sirenForm.locationName.value = siren.locationName;
    sirenForm.operationalStatus.value = siren.operationalStatus;
    sirenForm.isInWorkingCondition.checked = siren.isInWorkingCondition;
    sirenForm.latitude.value = siren.latitude;
    sirenForm.longitude.value = siren.longitude;
}

async function handleFormSubmit(event){
    event.preventDefault()
    const form = event.currentTarget
    const url = form.action
    try{
        const formData = new FormData(form)
        const response = await postFormDataAsJson(url, formData)
        if(response.ok){
            window.location.href = "../pages/overview-of-sirens.html"
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
