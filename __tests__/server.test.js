'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

describe( 'API server', () => {
    it( 'should respond with 404 on an invalid route', async () => {
        const response = await request.get( '/foo' );
        expect( response.status ).toBe( 404 );
    } );
    it( 'Home page works', async () => {
        const res = await request.get( '/' );
        expect( res.status ).toEqual( 200 );
        expect( res.text ).toEqual( 'Hello World' );
    } );
    it( 'Square route works', async () => {
        const res = await request.get( '/square?num=5' );
        expect( res.status ).toEqual( 200 );
        expect( res.text ).toEqual( 'the square of 5 is 25' );
    } );
    it( 'Square route fails with invalid number', async () => {
        const res = await request.get( '/square?num=foo' );
        expect( res.status ).toEqual( 500 );
        expect( res.text ).toEqual( '{\"code\":500,\"message\":\"Server Error: Invalid Number\"}' );
    } );
} );