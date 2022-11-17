import * as tuitsDao from '../tuits/tuits-dao.js'

const createTuit = async(req, res) => {
  const newTuit = req.body;
  newTuit.likes = 0;
  newTuit.liked = false;
  newTuit.dislikes = 0;
  newTuit.disliked = false;
  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);
}

const findTuits  = async (req, res) => {
  const tuits = await tuitsDao.findTuits()
  res.json(tuits);
}

const updateTuit = async (req, res) => {
  const tuitdIdToUpdate = req.params.tid;
  const updates = req.body;
//  const tuitIndex = tuits.findIndex(
//    (t) => t._id === tuitdIdToUpdate)
//  tuits[tuitIndex] =
//    {...tuits[tuitIndex], ...updates};
  const status = await tuitsDao
                       .updateTuit(tuitdIdToUpdate,
                                   updates);
  res.json(status);
}

const deleteTuit = async(req, res) => {
  // convert string to number
  const tuitdIdToDelete = req.params.tid;
//  tuits = tuits.filter((t) =>
//    t._id !== tuitdIdToDelete);
  const status = await tuitsDao
                       .deleteTuit(tuitdIdToDelete);
  //res.send(`Deleting tuit ${tuitdIdToDelete}`);
  res.json(status);
}


export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}