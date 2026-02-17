import axios from "axios";

//para rodar local
// const api = axios.create({
//     baseURL: "/api"
// });

// para rodar no vercel
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});
export default api;