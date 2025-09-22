
export default async function FecthRequest ({ URI, method = "GET", body="" }){
    if (method === "GET"){
        const result = await fetch(URI)
        return await result.json()
    }else{
       const result = await fetch(URI,{
        method,
        headers: {"content-type": "application/json"},
        body
       })
        return await result.json() 
    }
}