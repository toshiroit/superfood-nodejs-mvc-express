import Response from '../../models/Response'

const error_mid = (e, req, res, next) => {
  if (e.code !== 'EBADCSRFTOKEN') {
    return next(e)
  }
  res.status(403).json(new Response(true, e.message, e))
}

export default error_mid;
