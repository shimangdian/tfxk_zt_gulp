import api from './api'
import Dec from './public'
import util from './util'
import smoke from './smoke'
import verify from './verify'
api.init()
window.Dec = Dec
window.lutil = util
window.smoke = smoke
window.verify = verify