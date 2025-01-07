import {api} from '../../../../api/BaseApi'

export function delOrder(data) {
  return api.put('/order/update', data)
  .then((response) => {
    if(response.status === 200){
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

