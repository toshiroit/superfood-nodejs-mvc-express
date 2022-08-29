class Response {

  /**
   * @param{error} //Error Message
   * @param{message} // message Response
   * @param{obj} //obj Response 
   */
  constructor(error, message, obj) {
    this.error = error;
    this.message = message;
    this.obj = obj;
  }
}

module.exports = Response;
