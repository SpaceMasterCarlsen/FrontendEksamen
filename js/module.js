console.log("is in module!");

async function getObjectAsJson(url, obj, httpVerb){
    const objAsJson = JSON.stringify(obj);
    console.log(objAsJson);
    const fetchOption = {
        method: httpVerb,
        headers: {
            "Content-Type": "application/json",
        },
        body: objAsJson
    };
    const response = await fetch(url, fetchOption)
}

async function deleteObjects(url, obj) {
    const fetchOption = {
        method: "DELETE",
    }
    const response = await fetch(url, fetchOption)
    console.log(response)
}


function fetchAnyUrl(url){
    return fetch(url).then(res => res.json().catch(err => console.log("error handel: " + err)));
}

export {fetchAnyUrl, getObjectAsJson, deleteObjects}