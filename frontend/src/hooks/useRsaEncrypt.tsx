import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil";
import { decodeToken } from "react-jwt";
import { JSEncrypt } from "jsencrypt";
import { toast } from "react-toastify";

export const useRsaEncrypt = (): { encrypt: (text: string) => false | React.ReactText } => {
  const authToken = useRecoilValue(authState);

  const encrypt = (text: string) => {
    const decodedToken: any = decodeToken(authToken || "");
    if (!decodedToken) return toast.error("Invalid Token");

    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(decodedToken.key);
    const encrypted = encrypt.encrypt(text);

    return encrypted;
  };

  return { encrypt };
};
