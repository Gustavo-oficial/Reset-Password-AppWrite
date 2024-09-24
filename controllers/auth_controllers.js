import {Client,Account,ID,Functions} from "appwrite"
import dotenv from 'dotenv';

dotenv.config(); 

const client = new Client()
.setEndpoint(process.env.APPWRITE_ENDPOINT) 
.setProject(process.env.APPWRITE_PROJECT_ID); 

const account = new Account(client);

// complete verification for the client
export const updateVerification = async (userId, secret) => {
    try{
       const response=await account.updateVerification(userId, secret);
         console.log(response);
            return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

// update and reset the password
export const updateNewPassword = async (userId, secret, password,password_confirm) => {
    try {
        const response = await account.updateRecovery(userId, secret, password,password_confirm);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};