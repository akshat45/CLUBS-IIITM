import chai from 'chai';

const expect = chai.expect;

describe('Schedule meeting', () => {
    var status="requesting";
    try{
    
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
            for (var i = 0; i < 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
    
            return text;
        }
    
        const meet = `meet.google.com/lookup/${makeid()}`;
    
        status="meeting link created";
}
catch{
    status="Can't create link";
}

it('Generation of meet link', () => {
    expect(status).to.equal("meeting link created");
});

});