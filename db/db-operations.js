const dataModel = require('./data-model');
const Cop = dataModel.Cop;
const Request = dataModel.Request;
function fetchNearestCops(coordinates, maxDistance) {
    return Cop.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coordinates
                },
                $maxDistance: maxDistance
            }
        }
    })
    .exec()
    .catch(error => {
        console.log(error);
    });
}
exports.fetchNearestCops = fetchNearestCops;
// function to get cop details to use in routes.js. findOne() finds the first available cop
function fetchCopDetails(userId) {
    return Cop.findOne({
        userId: userId
    }, {
        copId: 1,
        displayName: 1,
        phone: 1,
        location: 1
    })
    .exec()
    .catch(error => {
        console.log(error);
    });
}
exports.fetchCopDetails = fetchCopDetails;

function saveRequest(requestId, requestTime, location, civilianId, status){
    const request = new Request({
        "_id": requestId,
        requestTime: requestTime,
        location: location,
        civilianId: civilianId,
        status: status
    });

    return request.save()
        .catch(error => {
            console.log(error)
        });
}
exports.saveRequest = saveRequest;

function updateRequest(issueId, copId, status) {
    return Request.findOneAndUpdate({
        "_id": issueId
    }, {
        status: status,
        copId: copId
    }).catch(error => {
        console.log(error);
    });
}
exports.updateRequest = updateRequest;

