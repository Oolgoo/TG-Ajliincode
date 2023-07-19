import cryptoJs from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;
const iv = 'abcdefghijklmnop' // 16자리 iv

export const encrypt = (data?: string) => {
    if (secretKey) {
        // const encrypted = cryptoJs.AES.encrypt(JSON.stringify(data), secretKey).toString();
        // return encrypted;
        if(data){
        const cipher = cryptoJs.AES.encrypt(data, cryptoJs.enc.Utf8.parse(secretKey), {
            iv: cryptoJs.enc.Utf8.parse(iv),
            padding: cryptoJs.pad.Iso10126,
            mode: cryptoJs.mode.CBC,
        });
    
        return cipher.toString();
    }

    } else {
        throw new Error("secretKey not exist");

    }
}