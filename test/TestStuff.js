const Cointable = artifacts.require("Cointable");

contract("Cointable", async (accounts) => {
  let cointable;
  const [firstAccount, secondAccount, thirdAccount] = accounts;

  beforeEach(async () => {
    cointable = await Cointable.new();
  });

  it("adds a new establishment", async () => {
    let contract;
    let firstId = await cointable.nextEstablishmentId.call().valueOf();

    await cointable.addEstablishment("Avacado Gallore");
    let name = await cointable.getEstablishmentName(firstId)
    assert.equal(name, "Avacado Gallore");
  });

  // https://blog.kalis.me/check-events-solidity-smart-contract-test-truffle/

  it("listens to establishment add event", async () => {
    var event = cointable.EstablishmentAdded({}, { fromBlock: 0, toBlock: 'latest' });

    var event = cointable.EstablishmentAdded(async (error, result) => {
      if (!error) {
        let nextId = await cointable.nextEstablishmentId.call().valueOf();
        var id = result.args.id.valueOf();
        var name = result.args.name;
        assert.equal(name, "Avacado Gallore");
        assert.equal(id, nextId - 1);
      }
      event.stopWatching()
    });
    await cointable.addEstablishment("Avacado Gallore");
  });
});