const Cointable = artifacts.require("Cointable");
const truffleAssert = require('truffle-assertions');

contract("Cointable: Reviews", async (accounts) => {
  let establishmentId;
  let cointable;

  beforeEach(async () => {
    cointable = await Cointable.new();
    let createdId;
    var event = cointable.EstablishmentAdded(async (error, result) => {
      assert.equal(error, null);
      establishmentId = result.args.id.valueOf();
      assert(event.stopWatching());
    });
    await cointable.addEstablishment("Gingerman");
  });

  it("sends event when adding a review ", async () => {
    let txResult = await cointable.addReview("Ginger and turmeric rocks!", establishmentId);

    truffleAssert.eventEmitted(txResult, 'ReviewAdded', (ev) => {
      return ev.review === "Ginger and turmeric rocks!";
    });
  });

  it("does not allow reviews for invalid establishment")
});