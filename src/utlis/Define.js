const Define = {
  PAGINATE_PAGE_SIZE: 10,
  DAYS:'days',
  TOKEN:'token',
  SESSION_COOKIE_OPTION:{
    httpOnly:true,
    secure:false, // only for brower
    sameSite:'lax',
    maxAge:1 * 24 * 60 * 60 * 1000 // 1 day in milis
  },
  LOGOUT_COOKIE_OPTION:{
    httpOnly:true,
    secure:false, // only for brower
    sameSite:'lax',
    expires:new Date(0)
  }
}
module.exports = Define;
