const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");

chai.use(chaiHttp);
const expect = chai.expect;

describe("TODO App", () => {
  beforeEach(() => {
    // Clear the todos array before each test
    app.locals.todos = [];
  });

  it("should create a new TODO", (done) => {
    chai
      .request(app)
      .post("/todos")
      .send({ text: "Buy groceries" })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("text", "Buy groceries");
        done();
      });
  });

  it("should list all TODOs", (done) => {
    chai
      .request(app)
      .get("/todos")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a("array");
        expect(res.body).to.have.lengthOf(0); // Ensure the list is empty
        done();
      });
  });

  it("should update a TODO", (done) => {
    // Create a TODO
    chai
      .request(app)
      .post("/todos")
      .send({ text: "Walk the dog" })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        const todo = res.body;

        // Update the TODO
        //         chai
        //           .request(app)
        //           .put(`/todos/${todo.id}`)
        //           .send({ text: "Walk the cat" })
        //           .end((err, res) => {
        //             expect(res.status).to.equal(200);
        //             expect(res.body).to.have.property("text", "Walk the cat");
        //             done();
        //           });
        //       });
        //   });

        //   it("should delete a TODO", (done) => {
        //     // Create a TODO
        //     chai
        //       .request(app)
        //       .post("/todos")
        //       .send({ text: "Clean the house" })
        //       .end((err, res) => {
        //         expect(res.status).to.equal(201);
        //         const todo = res.body;

        // Delete the TODO
        chai
          .request(app)
          .delete(`/todos/${todo.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("text", "Clean the house");
            done();
          });
      });
  });

  it("should mark a TODO as done", (done) => {
    // Create a TODO
    chai
      .request(app)
      .post("/todos")
      .send({ text: "Read a book" })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        const todo = res.body;

        // Mark the TODO as done
        chai
          .request(app)
          .patch(`/todos/${todo.id}/done`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("done", true);
            done();
          });
      });
  });
});
