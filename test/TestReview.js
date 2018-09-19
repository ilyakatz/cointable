const Cointable = artifacts.require("Cointable");
const truffleAssert = require('truffle-assertions');

//1 ETH = 10^18
//so this will be 1/1000 of an ETH
const ETH = 10 ** 18;


contract("Cointable: Reviews", async (accounts) => {
  const [account1, account2] = accounts;
  let establishmentId;
  let cointable;
  let sendValue = 1 * ETH;

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
    let txResult = await cointable.addReview(
      "Ginger and turmeric rocks!",
      establishmentId,
      {
        value: sendValue
      }
    );

    truffleAssert.eventEmitted(txResult, 'ReviewAdded', (ev) => {
      return ev.review === "Ginger and turmeric rocks!";
    });
  });

  it("allows sending review from different accounts", async () => {
    let txResult = await cointable.addReview(
      "This place doesn't have good wifi",
      establishmentId,
      {
        from: account2,
        value: sendValue
      });
    truffleAssert.eventEmitted(txResult, 'ReviewAdded', (ev) => {
      return ev.submitter === account2;
    });
  });

  it("require submitter to pay for review", async () => {
    let txResult = await cointable.addReview(
      "This place doesn't have good wifi",
      establishmentId,
      {
        from: account2,
        value: sendValue
      });
    truffleAssert.eventEmitted(txResult, 'ReviewAdded', (ev) => {
      return ev.submitter === account2;
    });
    const reviewBankTotal = await cointable.reviewBankTotal();
    assert.equal(reviewBankTotal, sendValue);
  });

  it("require minimum amount to send a review", async () => {
    sendValue = 0.9 * ETH;
    let err;
    try {
      await cointable.addReview.call(
        "This place doesn't have good wifi",
        establishmentId,
        {
          from: account2,
          value: sendValue
        });
    } catch (e) {
      err = e;
    }
    assert.ok(err instanceof Error)
    assert.equal(err.message, 'VM Exception while processing transaction: revert Minimum value to add review is 1');
  });

  it("does not allow reviews for invalid establishment")
});