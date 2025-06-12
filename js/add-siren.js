console.log("is in add siren Form")

import {getObjectAsJson} from "./module.js"

document.addEventListener("DOMContentLoaded", createFormEventListener)
let sirenForm;

function createFormEventListener(){
    sirenForm = document.querySelector("#sirenForm")
    sirenForm.addEventListener("submit", handleFormSubmit)
}

async function handleFormSubmit(event){
    event.preventDefault()
    const form = event.currentTarget
    const url = form.action
    try{
        const formData = new FormData(form)
        const response = await postFormDataAsJson(url, formData)
    } catch (error){
        alert(error.message)
        console.log(error)
    }
}

async function postFormDataAsJson(url, formData){
    console.log(url)
    console.log(formData)
    const plainFormData = Object.fromEntries(formData.entries())
    plainFormData.siren = {}
    plainFormData.siren.id = plainFormData.sirenId
    plainFormData.isInWorkingCondition = formData.has("isInWorkingCondition")
    const resp = await getObjectAsJson(url, plainFormData, "POST")
    return resp
}
