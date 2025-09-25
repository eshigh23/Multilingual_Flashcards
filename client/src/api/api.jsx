import axios from 'axios'


export const returnHelloApi = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:5000/hello")
        console.log("response:", response)
        return response.data
    } catch (e) {
        throw e
    }
}