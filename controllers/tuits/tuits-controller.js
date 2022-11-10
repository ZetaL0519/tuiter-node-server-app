import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
  const newTuit = req.body;
  newTuit._id = (new Date()).getTime()+'';
  newTuit.likes = 0;
  newTuit.liked = false;
  tuits.push(newTuit);
  res.json(newTuit);
}

const findTuits  = (req, res) => {
  res.json(tuits);
}

const updateTuit = (req, res) => {
  const tuitdIdToUpdate = parseInt(req.params.tid, 10);
  const updates = req.body;
  const tuitIndex = tuits.findIndex(
    (t) => t._id === tuitdIdToUpdate)
  tuits[tuitIndex] =
    {...tuits[tuitIndex], ...updates};
  res.sendStatus(200);
}

const deleteTuit = (req, res) => {
  // convert string to number
  const tuitdIdToDelete = parseInt(req.params.tid, 10);
  tuits = tuits.filter((t) =>
    t._id !== tuitdIdToDelete);
  //res.send(`Deleting tuit ${tuitdIdToDelete}`);
  res.sendStatus(200);
}


export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}