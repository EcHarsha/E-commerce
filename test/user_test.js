const server = require("../index");
const chaiHttp = require("chai-http");
const chai = require("chai");

chai.should();
chai.use(chaiHttp);

//sign up
describe("User signUp", () => {
  it("should return success if user signup successfully", (done) => {
    let random = Math.floor(Math.random() * 1000);
    const data = {
      userName: "harsha",
      userEmail: `here${random}@gmail.com`,
      userMobile: "9893421726",
      userPassword: "aDnendnj67dF@",
      userState: "MP",
      userCity: "Indore",
      userCountry: "India",
    };
    chai
      .request(server)
      .post("/user/signup")
      .set("Content-Type", "multipart/form-data")
      .attach("profilePic", "image_1686136880157_tata logo.png")
      .field(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message").eq("Signup Successful");
      });
    done();
  });

  it("It should return duplicate user error message: ", (done) => {
    const data = {
      userName: "Ruchii Sharma",
      userEmail: "hereharsha999@gmail.com",
      userMobile: "1234567890",
      userPassword: "rYhnendnj67dF#",
      userState: "MP",
      userCity: "Indore",
      userCountry: "India",
    };
    chai
      .request(server)
      .post("/user/signup")
      .set("Content-Type", "multipart/form-data")
      .attach("profilePic", "image_1686136880157_tata logo.png")
      .field(data)
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have
          .property("error")
          .eq("User with this email is already registered");
        done();
      });
  });
});

//login
describe("login", () => {
  it("It should Return login user detail : ", (done) => {
    const data = {
      userEmail: "Ruchi99@gmail.com",
      userPassword: "rYhnendnj67dF#",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message").eq("Login Successfully");
        res.body.should.have.property("token");
      });
    done();
  });
  it("should return an error for email id not found", (done) => {
    const data = {
      userEmail: "Huchii9@gmail.com",
      userPassword: "rYhnendnj67dF#",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("success").eq(false);
        res.body.should.have.property("message").eq("UserEmail not found");
      });
    done();
  });
  it("should return an error for Invalid email or password", (done) => {
    const data = {
      userEmail: "Ruchi99@gmail.com",
      userPassword: "rAYhnendAA#",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("success").eq(false);
        res.body.should.have
          .property("message")
          .eq("Invalid email or password");
        done();
      });
  });
});

//forget
describe("forgot", () => {
  it("it should Return Mail send Successfully detail : ", (done) => {
    const data = {
      userEmail: "hereharsha999@gmail.com",
    };
    chai
      .request(server)
      .post("/user/forgotpassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message").eq("Mail sent successfully");
        res.body.should.have.property("token");
      });
    done();
  });
  it("should return an error for email id not found", (done) => {
    const data = {
      userEmail: "erearpshaa999@gmail.com",
    };
    chai
      .request(server)
      .post("/user/forgotpassword")
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have.property("message").eq("User not found");
      });
    done();
  });
});

//reset
describe("resetPassword", () => {
  it("it should Return password reset Successfully detail : ", (done) => {
    const data = {
      newPassword: "Abc@123",
      confirmPassword: "Abc@123",
    };
    chai
      .request(server)
      .post(
        "/user/resetpassword/6481e13821d36cfd373a139c/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDgxZTEzODIxZDM2Y2ZkMzczYTEzOWMiLCJ1c2VyRW1haWwiOiJoZXJlaGFyc2hhOTk5QGdtYWlsLmNvbSIsImlhdCI6MTY4NjIzMzQxMSwiZXhwIjoxNjg2MjY5NDExfQ.jCLidzzFj1R6ln6Q6cgjH626leQhqAtQqwu0_084Pxs"
      )
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("Password updated successfully");
      });
    done();
  });
  it("should return an error for newPassword and confirmPassword is not match", (done) => {
    const data = {
      newPassword: "Abc@123",
      confirmPassword: "Abc@124",
    };
    chai
      .request(server)
      .post(
        "/user/resetpassword/6481e13821d36cfd373a139c/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDgxZTEzODIxZDM2Y2ZkMzczYTEzOWMiLCJ1c2VyRW1haWwiOiJoZXJlaGFyc2hhOTk5QGdtYWlsLmNvbSIsImlhdCI6MTY4NjIzMzQxMSwiZXhwIjoxNjg2MjY5NDExfQ.jCLidzzFj1R6ln6Q6cgjH626leQhqAtQqwu0_084Pxs"
      )
      .send(data)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have
          .property("message")
          .eq("NewPassword and ConfirmPassword do not match");
      });
    done();
  });
});
