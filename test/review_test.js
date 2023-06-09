const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("Add review API", () => {
  it("it should return success for adding review", (done) => {
    const data = {
      productReview: "nice  best quality",
      product_description: "100% cotton",
    };
    chai
      .request(server)
      .post(
        "/review/addreview/6481db7e90a0662b83fa3dd2/6481e943b8c6b8efd6dabb90"
      )
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("New review added successfully");
        done();
      });
  });
});

//list of all reviw
describe("List of all reviews", () => {
  it("it should return list of review", (done) => {
    chai
      .request(server)
      .get("/review/listreview")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message").eq("Here are all the Reviews");
        res.body.should.have.property("listAll");
      });
    done();
  });
});

//delete
describe("Remove Review API", () => {
  it("should delete a review and return success message", (done) => {
    chai
      .request(server)
      .delete("/review/removereview/6483086dcce543c2a2668dc9")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("Data deleted successfully");
        done();
     });
  });

  it("should return an error message when reviewID is not found", (done) => {
    chai
      .request(server)
      .delete("/review/removereview/647f5886198fe4017db42d46")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have.property("error").eq("ReviewID not found");
        done();
      });
  });
});

//update
describe("update review Api", () => {
  it("should update review and return success message", (done) => {
    const data = {
      productReview: "nice  best quality",
      product_description: "100% cotton",
    };
    chai
      .request(server)
      .patch("/review/updatereview/6482193d179b4a4601c1f347")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("Review updated successfully");
      });
    done();
  });
});
