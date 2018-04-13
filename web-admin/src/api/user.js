import { Api } from '../lib/api'
import config from '../config/api';
export default {
  list:Api.get('/users'),
  avatar:(id)=>config.host+`/users/avatar/${id}.ava`
}