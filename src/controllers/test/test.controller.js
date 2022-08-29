import TestModel from '../../models/test/test.model'
import Response from '../../models/Response'

const TestController = {

  /**
   * @description add new data
   * @param{data: String} = req.body
   * @response {error (boolean),message(string),response(object:any)}
   */
  newData: (req, res) => {
    const { data } = req.body

    try {
      if (!data) {
        throw new Error('Enter Data')
      }
      new TestModel().addData('user', { data }, (err, results) => {
        if (err) {
          let response = new Response(true, err.message, err)
          res.send(response);
        }
        else {
          const obj = {
            id: "id",
            data: results
          }
          res.status(200).json(new Response(false, 'add data new successfully', obj))
        }
      })
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  }
}


export default TestController;
