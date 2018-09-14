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
});