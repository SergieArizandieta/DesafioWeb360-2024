import {api} from '../../../../api/BaseApi'

export function getOrders(params) {
  return api.get('/order/read', {params})
  .then((response) => {
    if(response.status === 200){
      console.log("response",response.data)
      return response.data;
    }else{
      throw new Error(response.data.message);
    }
  })
  .catch((error) => {
    console.log("error",error)
    if(error?.response?.data?.message!= undefined){
      throw new Error(error.response.data.message);
    }else{
      throw new Error(error.message);
    }
  });
}

