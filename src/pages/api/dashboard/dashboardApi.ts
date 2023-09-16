import axios from 'axios'


const getProfileHeaderData =async (spotifyId)=>{
    
    let endpoint = createBaseEndpoint(spotifyId, "profileHeader")
    console.log(endpoint)
    try{
        const response = await axios.get(endpoint,{
            // withCredentials: spotifyId!==""? true:false
            withCredentials: true
            })
        console.log(response.data)
        return response.data
    }catch(error){

    }
}

const createBaseEndpoint=(spotifyId, dashboardSection)=>{
    let endpoint = "http://localhost:8080/api/v1"

    if(spotifyId!==""){
        endpoint+=`public/${spotifyId}/${dashboardSection}`
    }else{
        // endpoint+=`/auth/${dashboardSection}`
        endpoint+=`/me/${dashboardSection}`
    }
    return endpoint
}


export {
    getProfileHeaderData
}