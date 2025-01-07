import {api} from '../../../api/BaseApi'

export function singOut_Service() {
  return api.post('/auth/logout')
  .then((response) => {
    if(response.status === 200){
      return response.data;
    }else{
      throw new Error(response.data.message);
    }
  })
  .catch((error) => {
    if(error?.response?.data?.message!= undefined){
      throw new Error(error.response.data.message);
    }else{
      throw new Error(error.message);
    }
  });
}

