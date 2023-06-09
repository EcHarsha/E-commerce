const server = require("../index")
const chaiHttp = require('chai-http') 
const chai = require('chai');


chai.should();
chai.use(chaiHttp);

describe("test add product in cart Api",()=>{
    it("it should return success if product is added to cart",(done)=>{
        chai
        .request(server)
        .get("/cart/addcart/64661c097335b940db8ff9f7/647dd6bd6abc63a657c1c09e")
        .send()
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eq(true)
            res.body.should.have.property('message').eq("New item added successfully")
        });
        done();
    })
})

//view cart
describe("test view cart Api" ,()=>{
    it("it should return item in cart", (done) =>{
        chai
        .request(server)
        .get("/cart/listcart")
        .send()
        .end((err,res)=>{
            res.body.should.be.a("object")
            res.body.should.have.property('success').eq(true)
            res.body.should.have.property('message').eq("ready to go")
        })
        done();
    })
})

//delete
describe('removeCartItem', () => {
    it('should remove an item from the cart', (done) => {
      // Make a request to the server to remove an item from the cart
      chai.request(server)
        .delete("/cart/removecart/648216f9b93d80aeef4419c3")
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').to.be.true;
          res.body.should.have.property('message').to.equal('Item deleted successfully');
          done();
        });
    });
  
    it('should return an error if the cart ID is not found', (done) => {
      // Make a request to the server with a non-existing cart ID
      chai.request(server)
        .delete("/cart/removecart/647dd0e17bceb1e19d55c5a5")
        .send()
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('success').to.be.false;
          res.body.should.have.property('error').to.equal('ID not found');
          
        });done();
    });

})
