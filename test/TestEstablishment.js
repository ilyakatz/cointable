const Cointable = artifacts.require("Cointable");
const truffleAssert = require('truffle-assertions');

contract("Cointable", async (accounts) => {
  let cointable;
  const [firstAccount, secondAccount, thirdAccount] = accounts;

  beforeEach(async () => {
    cointable = await Cointable.new();
  });

  describe("Establishment", async () => {
    it("adds a new establishment", async () => {
      let firstId = await cointable.nextEstablishmentId.call().valueOf();

      await cointable.addEstablishment("Avacado Gallore");
      let name = (await cointable.getEstablishment(firstId))[1];
      assert.equal(name, "Avacado Gallore");
    });

    // https://blog.kalis.me/check-events-solidity-smart-contract-test-truffle/

    it("EstablishmentAdded", async () => {
      var event = cointable.EstablishmentAdded({}, { fromBlock: 0, toBlock: 'latest' });

      var event = cointable.EstablishmentAdded(async (error, result) => {
        if (!error) {
          let nextId = await cointable.nextEstablishmentId.call().valueOf();
          var id = result.args.id.valueOf();
          var name = result.args.name;
          assert.equal(name, "Avacado Gallore");
          assert.equal(id, nextId - 1);
        } else {
          assert.fail('Error happened');
        }
        event.stopWatching()
      });

    });

    it("sends event when adding an establishment", async () => {
      let txResult = await cointable.addEstablishment("Apple and Spice");

      truffleAssert.eventEmitted(txResult, 'EstablishmentAdded', (ev) => {
        return ev.name === "Apple and Spice";
      });
    });

    it("getEstablishment", async () => {
      let createdId;
      var event = cointable.EstablishmentAdded(async (error, result) => {
        assert.equal(error, null);
        createdId = result.args.id.valueOf();
        assert(event.stopWatching());
      });
      await cointable.addEstablishment("The Coffeeshop");

      const est = await cointable.getEstablishment(createdId);
      const name = est[1];
      const address = est[2];
      assert.equal(name, "The Coffeeshop");
      assert.equal(address, firstAccount);
    });
  });
});