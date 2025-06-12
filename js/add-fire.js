console.log("is in add fire")

import {getObjectAsJson} from "./module.js"

document.addEventListener("DOMContentLoaded", createFormEventListener)
let fireForm;

function createFormEventListener(){
    fireForm = document.querySelector("#fireForm")
    fireForm.addEventListener("submit", handleFormSubmit)
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
    plainFormData.fire = {}
    plainFormData.fire.id = plainFormData.fireId
    const resp = await getObjectAsJson(url, plainFormData, "POST")
    return resp
}
