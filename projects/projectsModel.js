const db = require("../database/db-config.js");

module.exports = {
    findAll,
    findAllProjectStats,
    findBy,
    findByProjectStats,
    findByName,
    findByProjectStatus,
    add,
    addProjectStats,
    update,
    updateProjectStats,
    remove,
    removeProjectStats
};

function findAll() {
    return db("projects");
}
function findAllProjectStats() {
    return db("projectStatus");
}

function findBy(filter) {
    return db("projects")
    .where(filter).first();
}
function findByProjectStats(filter) {
    return db("projectStatus")
    .where(filter).first();
}

function findByName(projectName) {
    return db("projects")
    .where({projectName}).first();
}
function findByProjectStatus(currentStatus) {
    return db("projectStatus")
    .where({currentStatus}).first();
}

function add(projectName) {
    return db("projects")
    .insert(projectName, "projectName")
    .then(ids => findByName(ids[0]));
}
function addProjectStats(currentStatus) {
    return db("projectStatus")
    .insert(currentStatus, "currentStatus")
    .then(ids => findByProjectStatus(ids[0]));
}

function update(projectName, changes) {
    return db("projects")
        .where({ projectName })
        .update(changes, '*')
}
function updateProjectStats(currentStatus, changes) {
    return db("projectStatus")
    .where({ currentStatus })
    .update(changes, '*')
}

function remove(id) {
    return db("projects")
    .where({ id }).del();
}
function removeProjectStats(id) {
    return db("projectStatus")
    .where({ id }).del();
}

