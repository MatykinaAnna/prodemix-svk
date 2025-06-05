import { useEffect, useState } from "react";
import { baseUrl } from "../../shared/variable";
import CryptoJS from 'crypto-js';

const Neuronet1 = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const token = window.localStorage.getItem('accessToken') // Получите токен аутентификации после успешного логина

    const checkAuthorization = async () => {
        try {
            const response = await fetch(`${baseUrl}/swagger/index.html`,
                {
                    method: 'GET',
                    headers: {                   'Authorization': `Bearer ${token}`
                }           });
            if (response.ok) {
                console.log(response)  
                return response.text        
            } else {
                console.error('Unauthorized access to Swagger');          
            }
        } catch (error) {           console.error('Error accessing Swagger UI:', error);
        }  
    };

    useEffect(() => {
        checkAuthorization().then((html)=>{
            console.log()
            const div = document.createElement('div');

            //@ts-ignore
            div.innerHTML = html;
            document.body.appendChild(div);
        });
    }, []); // Проверка авторизации при монтировании компонента

    return (
        <div>
            {!isAuthorized ? (
                <h1>Unauthorized access to Swagger UI</h1>
            ) : (
                <h1>Redirecting to Swagger UI...</h1>
            )}
            
            <button onClick={()=>{

                //let ciphertext = 'SGVsbG8gSGVsbG8='
                let key1 = '12345678901234567890123456789012'
                let iv1 = '5D9r9ZVzEYYgha93/aUK2w=='
                let passPhrase = '1234567890123456'
                let salt = '12345678901234567890123456789012'
                let plainText = 'Hello'

                // var cipherParams = CryptoJS.lib.CipherParams.create({
                //     ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
                // });

                // var decrypted = CryptoJS.AES.decrypt(
                //     cipherParams,
                //     key,
                //     { iv: CryptoJS.enc.Hex.parse(iv) });

                // console.log(decrypted)  
                // var plaintext = decrypted.toString(CryptoJS.enc.Utf8);  
                // console.log(plaintext)  


                // var encrypted = CryptoJS.enc.Base64.parse(ciphertext);
                // var key = CryptoJS.enc.Base64.parse(key1);
                // var iv = CryptoJS.enc.Base64.parse(iv1);
                // console.log(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(
                //     //@ts-ignore
                //     { ciphertext: encrypted },
                //     key, 
                //     { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv,  })));

                var key = CryptoJS.PBKDF2(
                    passPhrase, 
                    CryptoJS.enc.Hex.parse(salt),
                    { keySize: 64, iterations: 4 });

                console.log(key)

                var encrypted = CryptoJS.AES.encrypt(
                    plainText,
                    key,
                    { iv: CryptoJS.enc.Hex.parse(iv1) });
                
                console.log(encrypted)

                var ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

                console.log(ciphertext)

                var cipherParams = CryptoJS.lib.CipherParams.create({
                    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
                  });
                  var decrypted = CryptoJS.AES.decrypt(
                      cipherParams,
                      key,
                      { iv: CryptoJS.enc.Hex.parse(iv1) });

                var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
                console.log(plaintext)
            }}>Шифрование</button>
        </div>
    );
};

export default Neuronet1;