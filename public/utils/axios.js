/**  axios基础配置 */
import axios from 'axios';
// import message from './message';

export default class Axios {

    static axiosGet(url, params){
        return new Promise((resolve, reject) => {
            axios.get( url, {
                params: params
            }).then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            }, err => {
                // message.error({ content: 'Connection Failed' });
                reject(err);
            })
                .catch((error) => {
                    // message.error({ content: 'Connection Failed' });
                    reject(error)
                })
        })
    }

    static axiosPost(url, data, config = {}){
        return new Promise((resolve, reject) => {
            axios.post(url, data, config)
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.data);
                    }
                    if (response.status === 202) {
                        // message.error({ content: '202' });
                    }
                    if (response.status === 500) {
                        message.error({ content: '500' });
                    }
                }, err => {
                    // message.error({ content: 'Connection Failed' });
                    reject(err);
                })
                .catch((error) => {
                    // message.error({ content: 'Connection Failed' });
                    reject(error);
                })
        })
    }
}
