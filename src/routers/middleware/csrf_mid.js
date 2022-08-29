import csurf from 'csurf'
import Define from '../../utlis/Define'

const ignoreMethods = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "OPTIONS"
]
const csrfInit = csurf({
  ignoreMethods: ignoreMethods, cookie: Define.SESSION_COOKIE_OPTION
})
const csrfProtection = csurf({
  cookie: Define.SESSION_COOKIE_OPTION
})
const csurfToken = (req, res, next) => {
  const token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  next()
}
export default {csrfInit,csrfProtection,csurfToken}
