
export async function fetchData({url, method = 'GET', headers = {
'Content-Type': 'application/json'
},body = {}}) {
    if(method !== 'GET'){
        const response = await fetch(url,{
        method,
        headers,
        body
        })
        return response
    }else{
        const response = await fetch(url)
        return response
    }
    
}