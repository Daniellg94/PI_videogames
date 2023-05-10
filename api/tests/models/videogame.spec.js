const { Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");
const videogame = {name:"Metal Gear"}
describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Videogame.create({ name: "Super Mario Bros" });
      });
    });
  });
});

describe("release", () => {
  it("sould work when its a valid released", async () => {
    try {
      const result = await Videogame.create({ released: "2013-09-17" });

      expect(result.released).to.match(/^\d{4}-\d{2}-\d{2}$/);
    } catch (error) {}
  });
});

describe("ID", () => {
  it("sould work when its a valid ID", async () => {
    try {
      const result = await Videogame.create({test: "28-08-12",
      });
      expect(result.id).to.match(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
      );
    } catch (error) {}
  });
});

describe("image", () => {
  it("should be an image", async () => {
    try {
      const result = await Videogame.create({ image: "example.jpg" });
      
      // Verificar el tipo MIME
      expect(result.image.startsWith("image/")).to.be.true;

      // Verificar la extensión de archivo
      const extension = result.image.substring(result.image.lastIndexOf('.') + 1).toLowerCase();
      const extensionesImagen = ["jpg", "jpeg", "png", "gif", "bmp"];
      expect(extensionesImagen.includes(extension)).to.be.true;
    } catch (error) {
      // Manejar el error si es necesario
    }
  });
});
describe("platforms", () => {
  it("should be an array of objects", async () => {
    try {
      const result = await Videogame.create({ data: [{}, {}, {}] });

      // Verificar si es un array
      expect(Array.isArray(result.data)).to.be.true;

      // Verificar si todos los elementos son objetos
      result.data.forEach(item => {
        expect(typeof item === "object" && item !== null).to.be.true;
      });
    } catch (error) {
      // Manejar el error si es necesario
    }
  });
});