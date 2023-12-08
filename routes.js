const express = require('express');
const router = express.Router();
const dbOperations = require('./db/db-operations');
module.exports = router;
router.get('/cops', async (req, res) => {
    /*
        extract the latitude and longitude info from the request query parameters.
        Then, fetch the nearest cops using MongoDB's geospatial queries and return it back to the client.
    */
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);
    const nearestCops = await dbOperations.fetchNearestCops([longitude, latitude], 2000);

    res.json({
        cops: nearestCops
    });
});
// gets the html format from the html file to display to user
router.get('/civilian.html', (req, res) => {
    res.render('civilian.html', {
        userId: req.query.userId
    });
});
// gets html format from the html file in cops folder to display to cop
router.get('/cop.html', (req, res) => {
    res.render('cop.html', {
        userId: req.query.userId
    });
});
//calls function to get cop's profile info and return in JSON to client 
router.get('/cops/info', async (req, res) => {
    const userId = req.query.userId // extract userId from query params
    const copDetails = await dbOperations.fetchCopDetails(userId);

    res.json({
        copDetails: copDetails
    });
});


