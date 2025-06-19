import { useState } from "react";

export function useApiMessage() {
  const [info, setInfo] = useState({ message: "", type: "" });

  const callApiWithMessage = async (apiCall) => {
    try {
      const res = await apiCall();
      // console.log("API Response:", res);
      
      if (res.success === false) {
        // Si el mensaje es un array, únelos con saltos de línea
        const msg = Array.isArray(res.message)
          ? res.message.join('\n')
          : res.message;
        setInfo({ message: msg, type: "error" });
        throw new Error(msg);
      } else {
        setInfo({ message: res.message, type: "success" });
      }
      return res;
    } catch (error) {
      // Si el mensaje es un array, únelos con saltos de línea
      let msg =
        (Array.isArray(error?.message)
          ? error.message.join('\n')
          : error?.message) ||
        "Ocurrió un error inesperado";
      setInfo({ message: msg, type: "error" });
      throw error;
    }
  };

  const clearInfo = () => setInfo({ message: "", type: "" });

  return { info, callApiWithMessage, clearInfo, setInfo };
}