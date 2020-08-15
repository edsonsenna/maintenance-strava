describe('User Info First Test', () => {

    beforeEach(() => {
        window.localStorage.setItem('ms-exp-date', '1597517876');
        window.localStorage.setItem('ms-token', '9f068a29270a84d879615151c3b0f198e0bbb2be');
        window.localStorage.setItem('ms-ref-token', '82be573dc3ac5a44c6411dcd1ca756c7cbc77148');
        window
            .localStorage
            .setItem('ms-ath-info', '{"id":14255374,"username":"edesennajnior","resource_state":2,"firstname":"Edson","lastname":"De Senna Júnior","city":"Passos","state":"Minas Gerais","country":"Brasil","sex":"M","premium":false,"summit":false,"created_at":"2016-03-31T23:08:05Z","updated_at":"2019-02-17T20:26:12Z","badge_type_id":0,"profile_medium":"https://graph.facebook.com/990277004387442/picture?height=256&width=256","profile":"https://graph.facebook.com/990277004387442/picture?height=256&width=256","friend":null,"follower":null}');

        cy.visit('/');
    });

    it('should load user info form', () => {
        cy.visit('/my-info');

        cy.contains('Minhas Informações');
    });

    it('should click in user name and type a name', () => {
        cy.visit('/my-info');

        const userNameInput = cy.get('#userName');
        userNameInput.click();
        userNameInput.type('Edson de Senna');
        
        cy.contains('Minhas Informações');
    });

})