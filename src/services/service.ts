import axios from "axios";
export const API_URL = 'http://localhost:11434/api/generate';

let controller: AbortController | null = null;

// Función para enviar el transcript u otros datos a la API
export const postData = async (requestData: {
    model: string;
    prompt: string;
    stream: boolean;
}) => {
    // Cancelar cualquier solicitud en curso si existe
    if (controller) {
        controller.abort();
    }

    // Crear un nuevo AbortController para la solicitud actual
    controller = new AbortController();

    try {
        const response = await axios.post(API_URL, requestData);
        console.log("Response Server Data:", response.data);
        return response.data; // Retorna la respuesta de la API
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al enviar los datos: ${error.message}`);
        }
        throw new Error('Error desconocido al enviar los datos');
    }
};