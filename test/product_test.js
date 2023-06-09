const server = require("../index");
const chaiHttp = require("chai-http");
const chai = require("chai");

chai.should();
chai.use(chaiHttp);

describe("addProductApi", () => {
  it("should update the quantity of an existing product", (done) => {
    chai
      .request(server)
      .post("/product/addproduct")
      .field({  productName: "candyy",
      productDescription: "made with love",
      productCompany: "Amul",
      productCategory: "sweet",
      productPrice: 1,
      productQuantity: 3,})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("Product quantity updated successfully");
        res.body.should.have.property("updatedProduct").to.be.an("object");
        done();
      });
  });

  it("should add a new product", (done) => {
    chai
      .request(server)
      .post("/product/addproduct")
      .set("Content-Type", "multipart/form-data")
      .attach("productImg", "image_1686136880157_tata logo.png")
      .field({productName: "New Product",
        productDescription: "NEW",
        productCompany: "New",
        productCategory: "New",
        productPrice: 1,
        productQuantity: 3,
        productImg:"/uploads/image_1686306159349_Amul.jpg"
        })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .to.equal("Product added successfully");
        res.body.should.have.property("newProduct").to.be.an("object");
        
      });done();
  });
});

//view list
describe("Test for product list Api", () => {
  it("it should return list of all product ;", (done) => {
    chai
      .request(server)
      .get("/product/listproduct")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("Here is the list of product");
        res.body.should.have.property("listOfProduct");
      });
    done();
  });
});

//search product by name
describe("Search Product by Name API", () => {
  it("should return a list of products with the specified name", (done) => {

    chai
      .request(server)
      .get("/product/searchproduct/Ghee")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message");
        res.body.should.have.property("productList");
     });done();
  });
  it("should return an error message if no product is found with the specified name", (done) => {
    chai
      .request(server)
      .get("/product/searchproduct/tele phone")
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have.property("message");
    });done();
  });
});

//update product
describe("test Update Product Api", () => {
  it("should update a product and return success message when a valid product ID is provided ", (done) => {
    chai
      .request(server)
      .patch("/product/updateproduct/6481ec5bb8c6b8efd6dabbac")
      .set("Content-Type", "multipart/form-data")
      .attach("productImg", "image_1686136880157_tata logo.png")
      .field({productName: "candies",
        productDescription: "made from real fruit",
        productCompany: "cello",
        productCategory: "sweet",
        productPrice: 1,
        productQuantity: 3,
        productImg:"/uploads/image_1686306159349_Amul.jpg"
        })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("Data updated successfully");
        res.body.should.have.property("toUpdateProduct");
      });
    done();
  });
});

//delete product
describe("test Delete Product Api", () => {
  it("should delete a product and return success message when a valid product ID is provided ", (done) => {
    chai
      .request(server)
      .delete("/product/removeproduct/6481ebcab8c6b8efd6dabba0")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("Data deleted successfully");
      });
    done();
  });
  it("should return error message if product ID is not found", (done) => {
    chai
      .request(server)
      .delete("/product/removeproduct/6481ebcab8c6b8efd6dabba0")
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have.property("message").eq("ID not found");

      });done();
  });
});
