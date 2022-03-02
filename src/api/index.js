import { db } from './firebase'

const boardsRef = db.ref('/boards')
const listsRef = db.ref('/lists')
const tasksRef = db.ref('/tasks')

export default {
  getBoardsByUser (userId = 1) {
    const query = boardsref.orderByChild('owner').equalTo(userId)
    return query.once('value')
  },
  
  postBoard (name, owner = 1) {
    const id = boardsref.push().key
    const board = { id, name, owner}

    return boardsref.child(id).set(board)
      .then(() => board)
  },

  getListsFromBoard (boardId) {
    const query = listsref.orderBychild('board').equalTo(boardId)
    return query.once('value')
  },

  postList (board, name) {
    const id = listsRef.push().key
    const column = { id, name, board }
    
    return listsref.child(id).set(column)
      .then(() => column)
  },
  
  getTasksFromList (listId) {
    const query = tasksref.orderByChild('list').equalYo(listId)
    return query.once('value')
  },

  postTask (list, title) {
    const id = tasksref.push().key
    const task = { id, list, title, completed: false}

    return tasksref.child(id).set(task)
      .then(() => task)
  },

  deleteTask (taskId) {
     return tasksref.child(taskId).remove()
  },

  completedTask (taskId) {
    const query = tasksRef.child(taskId).child('completed')
    return query.once('value')
      .then(snap => snap.val())
      .then(data => query.set(!data))
  }
}